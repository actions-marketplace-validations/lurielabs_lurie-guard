import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import type { Ajv as AjvClass } from 'ajv';
import { describe, expect, it } from 'vitest';
import type { InputFile } from '../detector/index.js';
import { fullCatalog, run } from '../run.js';
import { emitAnnotations } from './annotations.js';
import { commentableLines, parseFingerprints, planReview } from './review.js';
import { buildSarif } from './sarif.js';

const here = dirname(fileURLToPath(import.meta.url));
// ajv and ajv-formats are CommonJS; createRequire gives their module.exports directly.
const require = createRequire(import.meta.url);
const Ajv = require('ajv') as typeof AjvClass;
const addFormats = require('ajv-formats') as (ajv: AjvClass) => void;
const schema = JSON.parse(readFileSync(join(here, '..', '..', 'test', 'schemas', 'sarif-schema-2.1.0.json'), 'utf8'));

const SAMPLE: InputFile[] = [
  {
    path: 'migrations/0001_orders.sql',
    status: 'added',
    content: `-- lurie-guard: ignore PG004 reason="the runner sets lock_timeout through ALTER ROLE"
ALTER TABLE orders ADD COLUMN sku text NOT NULL;
CREATE INDEX orders_created_at_idx ON orders (created_at);
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id);
CREATE TABLE customers (
  id serial PRIMARY KEY,
  email varchar(20),
  created_at timestamp
);
`,
  },
  {
    path: 'db/migrate/20261019120000_add_index.rb',
    status: 'added',
    content: `class AddIndex < ActiveRecord::Migration[7.1]
  def change
    add_index :accounts, :email, algorithm: :concurrently
  end
end
`,
  },
];

async function sample() {
  const out = await run({ files: SAMPLE, configText: 'rules:\n  PG021: info\n' });
  return out;
}

describe('SARIF', () => {
  it('validates against the SARIF 2.1.0 schema and carries the catalog, fingerprints, suppressions and fixes', async () => {
    const out = await sample();
    // unicodeRegExp off: the schema's `language` pattern has a lone `]`, which the u flag rejects.
    const ajv = new Ajv({ strict: false, allErrors: true, unicodeRegExp: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const ok = validate(out.sarif);
    expect(validate.errors ?? []).toEqual([]);
    expect(ok).toBe(true);
    const run0 = (out.sarif as { runs: Record<string, unknown>[] }).runs[0] as {
      tool: { driver: { rules: { id: string; help: { markdown: string }; defaultConfiguration: { level: string } }[]; semanticVersion: string } };
      automationDetails: { id: string };
      results: Record<string, unknown>[];
    };
    expect(run0.automationDetails.id).toBe('lurie-guard/pg/');
    expect(run0.tool.driver.rules.map((r) => r.id)).toEqual(fullCatalog().map((c) => c.id).sort());
    expect(run0.tool.driver.rules.find((r) => r.id === 'PG001')?.help.markdown).toContain('## What it detects');
    expect(run0.tool.driver.rules.find((r) => r.id === 'PG021')?.defaultConfiguration.level).toBe('note');
    const suppressed = run0.results.find((r) => r.ruleId === 'PG004') as { suppressions: { kind: string; justification: string }[] };
    expect(suppressed.suppressions).toEqual([{ kind: 'inSource', justification: 'the runner sets lock_timeout through ALTER ROLE' }]);
    const pg001 = run0.results.find((r) => r.ruleId === 'PG001' && (r as { locations: { physicalLocation: { artifactLocation: { uri: string } } }[] }).locations[0].physicalLocation.artifactLocation.uri === 'migrations/0001_orders.sql') as {
      partialFingerprints: Record<string, string>;
      fixes: unknown[];
      level: string;
    };
    expect(pg001.level).toBe('error');
    expect(pg001.partialFingerprints.primaryLocationLineHash).toMatch(/^[0-9a-f]{16}:1$/);
    expect(pg001.fixes).toHaveLength(1);
  });

  it('a finding that moves by three lines keeps its fingerprint and its line hash', async () => {
    const a = await run({ files: [SAMPLE[0]] });
    const moved = { ...SAMPLE[0], content: `-- a\n-- b\n-- c\n${SAMPLE[0].content}` };
    const b = await run({ files: [moved] });
    const pick = (o: typeof a) => (o.sarif as { runs: { results: { ruleId: string; partialFingerprints: Record<string, string>; locations: { physicalLocation: { region: { startLine: number } } }[] }[] }[] }).runs[0].results.find((r) => r.ruleId === 'PG001')!;
    expect(pick(a).locations[0].physicalLocation.region.startLine).toBe(3);
    expect(pick(b).locations[0].physicalLocation.region.startLine).toBe(6);
    expect(pick(a).partialFingerprints).toEqual(pick(b).partialFingerprints);
  });

  it('is byte-identical across runs', async () => {
    const a = JSON.stringify((await sample()).sarif);
    const b = JSON.stringify((await sample()).sarif);
    expect(a).toBe(b);
  });

  it('matches the snapshot', async () => {
    const out = await sample();
    expect(buildSarif(out.result, fullCatalog(), { version: '0.1.0', contents: new Map(SAMPLE.map((f) => [f.path, f.content])) })).toMatchSnapshot();
  });
});

describe('review', () => {
  it('parses commentable RIGHT-side lines from a patch', () => {
    const patch = `@@ -1,3 +1,5 @@\n context\n-removed\n+added one\n+added two\n context2\n@@ -10,2 +12,3 @@\n ctx\n+late\n ctx\n\\ No newline at end of file`;
    expect([...commentableLines(patch)].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 12, 13, 14]);
    expect(commentableLines(undefined).size).toBe(0);
  });

  it('plans one review with suggestions, hides fingerprints, respects max_comments and the diff', async () => {
    const out = await sample();
    const diff = new Map(SAMPLE.map((f) => [f.path, new Set(f.content.split('\n').map((_, i) => i + 1))]));
    const plan = planReview(out.result, { diff, previous: new Set(), config: out.config, reportOnly: true });
    expect(plan.review).toBeDefined();
    expect(plan.review?.body).toContain('Report-only');
    expect(plan.review?.body).toMatch(/<!-- lurie-guard:fingerprints [0-9a-f,]+ -->/);
    expect(plan.review?.body).toContain('Suppressed with a reason');
    const pg001 = plan.review?.comments.find((c) => c.body.startsWith('**PG001**') && c.path === 'migrations/0001_orders.sql');
    expect(pg001?.body).toContain('```suggestion\nCREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);\n```');
    expect(pg001?.line).toBe(3);
    const fk = plan.review?.comments.find((c) => c.body.startsWith('**PG008**'));
    expect(fk?.start_line).toBe(4);
    expect(fk?.line).toBe(5);
    expect(fk?.body).toContain('REFERENCES accounts (id) NOT VALID;');
    expect(plan.review).toMatchSnapshot();

    const limited = planReview(out.result, { diff, previous: new Set(), config: { ...out.config, outputs: { ...out.config.outputs, maxComments: 2 } }, reportOnly: true });
    expect(limited.review?.comments.length).toBe(2);
    expect(limited.overflow.length).toBe(out.active.length - 2);
    expect(limited.review?.body).toContain('beyond `outputs.max_comments` (2)');

    const outside = planReview(out.result, { diff: new Map(), previous: new Set(), config: out.config, reportOnly: true });
    expect(outside.review?.comments).toEqual([]);
    expect(outside.outsideDiff.length).toBe(out.active.length);
  });

  it('is idempotent: posted findings are not re-posted, resolved ones are listed, a clean run says so', async () => {
    const out = await sample();
    const diff = new Map(SAMPLE.map((f) => [f.path, new Set(f.content.split('\n').map((_, i) => i + 1))]));
    const first = planReview(out.result, { diff, previous: new Set(), config: out.config, reportOnly: false });
    const previous = parseFingerprints([first.review!.body]);
    expect(previous.size).toBe(out.active.length);
    const second = planReview(out.result, { diff, previous, config: out.config, reportOnly: false });
    expect(second.review).toBeUndefined();
    expect(second.resolved).toEqual([]);
    const fewer = await run({ files: [SAMPLE[1]] });
    const third = planReview(fewer.result, { diff, previous, config: out.config, reportOnly: false });
    expect(third.review?.comments).toEqual([]);
    expect(third.resolved.length).toBe(out.active.length - fewer.active.length);
    expect(third.review?.body).toContain('resolved');
    const clean = await run({ files: [{ path: 'migrations/0002.sql', status: 'added', content: 'SELECT 1;\n' }] });
    const fourth = planReview(clean.result, { diff, previous, config: out.config, reportOnly: false });
    expect(fourth.allClear).toBe(true);
    expect(fourth.review?.body).toMatch(/^All lurie-guard findings resolved\./);
  });
});

describe('summary and annotations', () => {
  it('summary lists counts, findings, suppressions, files and not-analyzed calls', async () => {
    const out = await sample();
    expect(out.summary).toMatch(/\*\*\d+ findings\*\*: \d+ errors?, \d+ warnings?, \d+ info\. 1 suppressed\./);
    expect(out.summary).toContain('| `migrations/0001_orders.sql` | 3 | PG001 | error |');
    expect(out.summary).toContain('| `db/migrate/20261019120000_add_index.rb` | rails | wrapped |');
    expect(out.summary.replace(/Run time: .*$/m, 'Run time: (elided)')).toMatchSnapshot();
  });

  it('emits at most 10 error and 10 warning annotations', async () => {
    const out = await run({
      files: [{ path: 'migrations/many.sql', status: 'added', content: Array.from({ length: 15 }, (_, i) => `CREATE INDEX i${i} ON t${i} (a);\nALTER TABLE t${i} RENAME COLUMN a TO b;`).join('\n') + '\n' }],
    });
    const seen = { error: 0, warning: 0 };
    const counts = emitAnnotations(out.result.findings, {
      error: (m, p) => {
        seen.error++;
        expect(p.file).toBe('migrations/many.sql');
        expect(m).toContain('evidence: https://github.com/rafapeixer/db-skills/blob/');
      },
      warning: () => seen.warning++,
    });
    expect(counts).toEqual({ errors: 10, warnings: 10 });
    expect(seen).toEqual({ error: 10, warning: 10 });
  });
});
