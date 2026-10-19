import type Anthropic from '@anthropic-ai/sdk';
import { describe, expect, it } from 'vitest';
import { fullCatalog, run } from '../run.js';
import { explainFindings, type MessagesClient } from './explainer.js';

function fakeClient(reply: (params: Anthropic.MessageCreateParamsNonStreaming, n: number) => string) {
  const requests: Anthropic.MessageCreateParamsNonStreaming[] = [];
  const client: MessagesClient = {
    messages: {
      async create(params) {
        requests.push(params);
        const n = requests.length;
        return {
          id: `msg_${n}`,
          type: 'message',
          role: 'assistant',
          model: params.model,
          content: [{ type: 'text', text: reply(params, n), citations: null }],
          stop_reason: 'end_turn',
          stop_sequence: null,
          stop_details: null,
          usage: {
            input_tokens: 400,
            output_tokens: 120,
            cache_creation_input_tokens: n === 1 ? 6000 : 0,
            cache_read_input_tokens: n === 1 ? 0 : 6000,
            cache_creation: null,
            server_tool_use: null,
            service_tier: null,
            inference_geo: null,
            speed: null,
            iterations: null,
          },
        } as unknown as Anthropic.Message;
      },
    },
  };
  return { client, requests };
}

const THREE = `CREATE INDEX a ON orders (a);
ALTER TABLE orders ADD COLUMN sku text NOT NULL;
ALTER TABLE orders ALTER COLUMN amount SET NOT NULL;
`;

describe('explainer', () => {
  it('sends the skill text as cached context, one request per finding, and appends explanations without touching findings', async () => {
    const out = await run({ files: [{ path: 'migrations/1.sql', status: 'added', content: THREE }], configText: 'lock_timeout_set_by_runner: true\n' });
    const before = JSON.stringify(out.active);
    const { client, requests } = fakeClient((p) => `Plain words for ${(p.messages[0].content as string).slice(8, 13)}.`);
    const ex = await explainFindings(out.active, { config: out.config, catalog: fullCatalog(), client });
    expect(JSON.stringify(out.active)).toBe(before);
    expect(requests.length).toBe(3);
    for (const r of requests) {
      expect(r.model).toBe('claude-sonnet-5-5');
      expect(r.thinking).toEqual({ type: 'adaptive' });
      expect(r.output_config).toEqual({ effort: 'low' });
      const system = r.system as { type: string; text: string; cache_control?: { type: string } }[];
      expect(system[0].cache_control).toEqual({ type: 'ephemeral' });
      expect(system[0].text).toContain('# Online schema migrations in PostgreSQL');
      expect(system[0].text).toContain('do not dispute it, do not add findings');
    }
    expect(ex.explanations.size).toBe(3);
    expect(ex.usage.requests).toBe(3);
    expect(ex.usage.cacheReadTokens).toBe(12000);
    expect(ex.usage.cacheCreationTokens).toBe(6000);
    // 3 x 400 input at $2, 3 x 120 output at $10, 6000 cache write at $2.50, 12000 cache read at $0.10 per MTok
    expect(ex.usage.costUsd).toBeCloseTo((1200 * 2 + 360 * 10 + 6000 * 2.5 + 12000 * 0.1) / 1e6, 6);
    expect(ex.warnings).toEqual([]);
  });

  it('batches more than five findings into one request per skill and parses the numbered answers', async () => {
    const many = Array.from({ length: 7 }, (_, i) => `CREATE INDEX i${i} ON t${i} (a);`).join('\n') + '\n';
    const out = await run({ files: [{ path: 'migrations/1.sql', status: 'added', content: many }] });
    const { client, requests } = fakeClient((p) => {
      const count = ((p.messages[0].content as string).match(/^\d+\. Finding/gm) ?? []).length;
      return Array.from({ length: count }, (_, i) => `${i + 1}. Explanation ${i + 1}.`).join('\n');
    });
    const ex = await explainFindings(out.active, { config: out.config, catalog: fullCatalog(), client });
    expect(requests.length).toBe(1);
    expect(ex.explanations.size).toBe(7);
    expect(ex.explanations.get(out.active[6].fingerprint)).toBe('Explanation 7.');
  });

  it('stops at the cost budget and skips suppressed and engine findings', async () => {
    const out = await run({
      files: [{ path: 'migrations/1.sql', status: 'added', content: `-- lurie-guard: ignore PG001 reason="empty"\nCREATE INDEX a ON orders (a);\n-- lurie-guard: ignore PG002\nALTER TABLE orders ADD COLUMN sku text NOT NULL;\n` }],
      configText: 'llm:\n  max_cost_usd_per_run: 0.001\nlock_timeout_set_by_runner: true\n',
    });
    const { client, requests } = fakeClient(() => 'x');
    const ex = await explainFindings(out.result.findings, { config: out.config, catalog: fullCatalog(), client });
    // PG001 is suppressed, PGS01/PGS02 are engine findings: only PG006 qualifies; the first request already exceeds the budget.
    expect(requests.length).toBe(1);
    expect(ex.explanations.size).toBe(1);
    const again = await explainFindings([...out.result.findings, ...out.result.findings], { config: out.config, catalog: fullCatalog(), client });
    expect(again.usage.stoppedByBudget || again.usage.requests <= 2).toBe(true);
  });

  it('an API error is a warning, never a failed run', async () => {
    const out = await run({ files: [{ path: 'migrations/1.sql', status: 'added', content: 'CREATE INDEX a ON orders (a);\n' }] });
    const client: MessagesClient = {
      messages: {
        async create() {
          throw new Error('socket hang up');
        },
      },
    };
    const ex = await explainFindings(out.active, { config: out.config, catalog: fullCatalog(), client });
    expect(ex.explanations.size).toBe(0);
    expect(ex.warnings).toEqual(['explainer: socket hang up']);
  });
});
