// The job summary (SPEC-MVP.md, "Job summary"): counts by severity, the
// findings table, the suppressions with reasons, the files analyzed and
// skipped, the framework detected, the run time, and the LLM cost when it ran.
import type { AnalysisResult, ResolvedConfig } from '../types.js';

export interface SummaryOptions {
  config: ResolvedConfig;
  reportOnly: boolean;
  /** Files of the PR the detector did not classify as migrations. */
  skipped: string[];
  /** Wall-clock milliseconds of the whole run. */
  runMs: number;
  notices: string[];
  llm?: { model: string; inputTokens: number; cacheReadTokens: number; outputTokens: number; costUsd: number; explained: number };
  explanations?: Map<string, string>;
}

const LIMIT = 1024 * 1024;

function cell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function shortMessage(message: string): string {
  // The first sentence (what happens) is enough for the table; the comment has the rest.
  const withoutLink = message.replace(/\s*\((PG[SX]?\d+)(?:, \[evidence\]\([^)]*\))?\)\s*$/, '');
  const first = withoutLink.split(/(?<=[.!?])\s+(?=[A-Z`])/)[0] ?? withoutLink;
  return first.length > 220 ? `${first.slice(0, 217)}...` : first;
}

export function buildSummary(result: AnalysisResult, opts: SummaryOptions): string {
  const active = result.findings.filter((f) => !f.suppressed);
  const suppressed = result.findings.filter((f) => f.suppressed);
  const errors = active.filter((f) => f.severity === 'error').length;
  const warnings = active.filter((f) => f.severity === 'warning').length;
  const infos = active.length - errors - warnings;
  const lines: string[] = [];

  lines.push('## lurie-guard');
  lines.push('');
  lines.push(`**${active.length} finding${active.length === 1 ? '' : 's'}**: ${errors} error${errors === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}, ${infos} info. ${suppressed.length} suppressed.`);
  if (opts.reportOnly) {
    lines.push('');
    lines.push('Report-only: the check passes whatever it finds (`fail_on: none`, the default through v0.x). To block merges on errors, add `fail_on: error` to `.lurie-guard.yml` on the base branch.');
  } else {
    lines.push('');
    lines.push(`\`fail_on: ${opts.config.failOn}\`: the check fails when a finding at or above that severity remains.`);
  }
  for (const n of opts.notices) {
    lines.push('');
    lines.push(`> ${n}`);
  }

  if (active.length) {
    lines.push('', '### Findings', '', '| File | Line | Rule | Severity | What happens |', '|---|---|---|---|---|');
    for (const f of active) {
      lines.push(`| \`${cell(f.path)}\` | ${f.line} | ${f.ruleId} | ${f.severity} | ${cell(shortMessage(f.message))} |`);
    }
    if (opts.explanations && opts.explanations.size) {
      lines.push('', '### Explanations', '');
      for (const f of active) {
        const e = opts.explanations.get(f.fingerprint);
        if (!e) continue;
        lines.push(`- \`${cell(f.path)}:${f.line}\` ${f.ruleId}: ${cell(e)}`);
      }
    }
  }

  if (suppressed.length) {
    lines.push('', '### Suppressed', '', '| File | Line | Rule | Reason |', '|---|---|---|---|');
    for (const f of suppressed) lines.push(`| \`${cell(f.path)}\` | ${f.line} | ${f.ruleId} | ${cell(f.suppressed?.reason ?? '')} |`);
  }

  lines.push('', '### Files', '', '| File | Framework | Transaction | Statements | Status |', '|---|---|---|---|---|');
  for (const r of result.files) {
    const txn = r.wrapped ? 'wrapped' : 'not wrapped';
    const status = r.status === 'parse-error' ? 'could not parse' : 'analyzed';
    lines.push(`| \`${cell(r.path)}\` | ${r.framework} | ${txn} | ${r.statements} | ${status} |`);
  }
  for (const s of opts.skipped) lines.push(`| \`${cell(s)}\` | - | - | - | not a migration |`);
  const notAnalyzed = result.files.flatMap((r) => r.notAnalyzed.map((n) => ({ path: r.path, ...n })));
  if (notAnalyzed.length) {
    lines.push('', '### Not analyzed', '', 'Host-language calls the detector does not map in this release; nothing is guessed about them.', '');
    for (const n of notAnalyzed) lines.push(`- \`${cell(n.path)}:${n.line}\` ${cell(n.reason)}`);
  }

  if (opts.llm) {
    const l = opts.llm;
    lines.push('', '### Explainer', '', `${l.explained} finding${l.explained === 1 ? '' : 's'} explained with \`${l.model}\`: ${l.inputTokens} input tokens (${l.cacheReadTokens} read from cache), ${l.outputTokens} output tokens, about $${l.costUsd.toFixed(4)}.`);
  }

  lines.push('', `Run time: ${(opts.runMs / 1000).toFixed(1)} s (engine ${(result.engineMs / 1000).toFixed(1)} s).`);
  let text = lines.join('\n');
  if (Buffer.byteLength(text, 'utf8') > LIMIT) text = `${text.slice(0, LIMIT - 200)}\n\n(summary truncated at 1 MiB)`;
  return text;
}
