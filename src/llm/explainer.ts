// The optional LLM explainer (ARCHITECTURE.md, "LLM explainer"; ADR 0002 and
// 0003). Runs only with the client's own Anthropic key, from inside the
// runner, with the rule's skill text as cached context. It appends a plain-
// words explanation to deterministic findings; it never adds, removes or
// re-ranks them.
import Anthropic from '@anthropic-ai/sdk';
import { SKILLS_REF, skillText } from '../generated/skills.js';
import type { Finding, ResolvedConfig, RuleCatalogEntry } from '../types.js';

export interface ExplainerUsage {
  model: string;
  requests: number;
  inputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  outputTokens: number;
  costUsd: number;
  explained: number;
  stoppedByBudget: boolean;
}

export interface ExplainerResult {
  explanations: Map<string, string>;
  usage: ExplainerUsage;
  warnings: string[];
}

/** USD per million tokens, from the official model page (ARCHITECTURE.md table). */
const PRICING: Record<string, { input: number; output: number; cacheWrite: number; cacheRead: number }> = {
  'claude-opus-5-5': { input: 4, output: 20, cacheWrite: 5, cacheRead: 0.2 },
  'claude-sonnet-5-5': { input: 2, output: 10, cacheWrite: 2.5, cacheRead: 0.1 },
  'claude-haiku-5-5': { input: 0.1, output: 0.5, cacheWrite: 0.125, cacheRead: 0.01 },
};

/** The subset of the SDK client the explainer uses; tests pass a fake. */
export interface MessagesClient {
  messages: { create(params: Anthropic.MessageCreateParamsNonStreaming): Promise<Anthropic.Message> };
}

export interface ExplainerOptions {
  config: ResolvedConfig;
  catalog: RuleCatalogEntry[];
  client?: MessagesClient;
  apiKey?: string;
  /** Findings above this count go in one request for the whole PR. */
  batchThreshold?: number;
}

function systemPrompt(skillPath: string): string {
  const text = skillText[skillPath] ?? '';
  return (
    `You explain findings of lurie-guard, a deterministic reviewer of PostgreSQL migrations, to the developer who wrote the migration. ` +
    `The finding is final: do not dispute it, do not add findings, do not change its severity. ` +
    `Answer in two sentences in plain words, in the developer's terms, saying what happens in production and what to do; when the fix needs several steps, add them as a short ordered list. ` +
    `No preamble, no headings. Base every claim on the skill text below (db-skills at ${SKILLS_REF}).\n\n` +
    `<skill>\n${text}\n</skill>`
  );
}

function findingPrompt(f: Finding, index?: number): string {
  const head = index !== undefined ? `${index}. ` : '';
  return `${head}Finding ${f.ruleId} at ${f.path}:${f.line}:\n${f.message}\n\nStatement:\n${f.statement ?? '(not available)'}`;
}

function costOf(model: string, u: ExplainerUsage): number {
  const p = PRICING[model] ?? PRICING['claude-sonnet-5-5'];
  return (u.inputTokens * p.input + u.outputTokens * p.output + u.cacheCreationTokens * p.cacheWrite + u.cacheReadTokens * p.cacheRead) / 1_000_000;
}

function textOf(message: Anthropic.Message): string {
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

export async function explainFindings(findings: Finding[], opts: ExplainerOptions): Promise<ExplainerResult> {
  const model = opts.config.llm.model;
  const usage: ExplainerUsage = {
    model,
    requests: 0,
    inputTokens: 0,
    cacheCreationTokens: 0,
    cacheReadTokens: 0,
    outputTokens: 0,
    costUsd: 0,
    explained: 0,
    stoppedByBudget: false,
  };
  const explanations = new Map<string, string>();
  const warnings: string[] = [];
  const client: MessagesClient = opts.client ?? new Anthropic({ apiKey: opts.apiKey });
  const bySkill = new Map(opts.catalog.map((c) => [c.id, c.skill]));
  const targets = findings.filter((f) => !f.suppressed && !f.ruleId.startsWith('PGS') && bySkill.get(f.ruleId));
  if (targets.length === 0) return { explanations, usage, warnings };
  const threshold = opts.batchThreshold ?? 5;

  const record = (m: Anthropic.Message): void => {
    usage.requests++;
    usage.inputTokens += m.usage.input_tokens;
    usage.outputTokens += m.usage.output_tokens;
    usage.cacheCreationTokens += m.usage.cache_creation_input_tokens ?? 0;
    usage.cacheReadTokens += m.usage.cache_read_input_tokens ?? 0;
    usage.costUsd = costOf(model, usage);
  };

  const request = async (skillPath: string, user: string, maxTokens: number): Promise<string | undefined> => {
    if (usage.costUsd >= opts.config.llm.maxCostUsdPerRun) {
      usage.stoppedByBudget = true;
      return undefined;
    }
    try {
      const message = await client.messages.create({
        model,
        max_tokens: maxTokens,
        system: [{ type: 'text', text: systemPrompt(skillPath), cache_control: { type: 'ephemeral' } }],
        messages: [{ role: 'user', content: user }],
        thinking: { type: 'adaptive' },
        output_config: { effort: 'low' },
      });
      record(message);
      if (message.stop_reason === 'refusal') {
        warnings.push(`explainer: the model declined to explain a finding (${message.stop_details?.category ?? 'no category'})`);
        return undefined;
      }
      return textOf(message);
    } catch (err) {
      if (err instanceof Anthropic.AuthenticationError) warnings.push('explainer: the Anthropic API key was rejected (401); explanations skipped');
      else if (err instanceof Anthropic.RateLimitError) warnings.push('explainer: rate limited by the Anthropic API (429); explanations skipped');
      else if (err instanceof Anthropic.APIError) warnings.push(`explainer: Anthropic API error ${err.status}: ${err.message}`);
      else warnings.push(`explainer: ${(err as Error).message}`);
      return undefined;
    }
  };

  if (targets.length <= threshold) {
    for (const f of targets) {
      const text = await request(bySkill.get(f.ruleId) ?? '', findingPrompt(f), 1024);
      if (text) {
        explanations.set(f.fingerprint, text);
        usage.explained++;
      }
      if (warnings.length) break;
    }
  } else {
    // One request per skill for the whole PR, answers numbered like the findings.
    const groups = new Map<string, Finding[]>();
    for (const f of targets) {
      const skill = bySkill.get(f.ruleId) ?? '';
      groups.set(skill, [...(groups.get(skill) ?? []), f]);
    }
    for (const [skill, list] of groups) {
      const user =
        `Explain each of the ${list.length} findings below. Answer with one line per finding, in order, starting with its number and a period, nothing else.\n\n` +
        list.map((f, i) => findingPrompt(f, i + 1)).join('\n\n');
      const text = await request(skill, user, 4096);
      if (!text) continue;
      const lines = text.split('\n').filter((l) => /^\s*\d+\./.test(l));
      for (const line of lines) {
        const m = /^\s*(\d+)\.\s*(.*)$/.exec(line);
        if (!m) continue;
        const f = list[Number(m[1]) - 1];
        if (f && m[2].trim()) {
          explanations.set(f.fingerprint, m[2].trim());
          usage.explained++;
        }
      }
    }
  }
  return { explanations, usage, warnings };
}
