// The performance budget (SPEC-MVP.md, "Performance budget"): 200 migration
// files of 20 statements each, all 21 rules, under 5 s in the engine and
// under 10 s end to end; parser boot under 2 s.
import { describe, expect, it } from 'vitest';
import type { InputFile } from '../src/detector/index.js';
import { loadParser } from '../src/parser/pg.js';
import { run } from '../src/run.js';

const STATEMENTS = [
  (i: number) => `CREATE TABLE t${i} (id serial PRIMARY KEY, email varchar(20), created_at timestamp, details json, u uuid DEFAULT gen_random_uuid());`,
  (i: number) => `CREATE INDEX t${i}_email_idx ON orders${i} (email);`,
  (i: number) => `ALTER TABLE orders${i} ADD COLUMN created_at timestamptz NOT NULL DEFAULT clock_timestamp();`,
  (i: number) => `ALTER TABLE orders${i} ADD COLUMN sku text NOT NULL;`,
  (i: number) => `ALTER TABLE orders${i} ALTER COLUMN amount SET NOT NULL;`,
  (i: number) => `ALTER TABLE orders${i} ADD CONSTRAINT fk${i} FOREIGN KEY (account_id) REFERENCES accounts (id);`,
  (i: number) => `ALTER TABLE orders${i} ADD CONSTRAINT ck${i} CHECK (amount >= 0);`,
  (i: number) => `ALTER TABLE orders${i} ALTER COLUMN account_id TYPE bigint;`,
  (i: number) => `ALTER TABLE accounts${i} ADD CONSTRAINT uq${i} UNIQUE (email);`,
  (i: number) => `ALTER TABLE orders${i} RENAME COLUMN a TO b;`,
  (i: number) => `ALTER TABLE orders${i} DROP COLUMN legacy;`,
  (i: number) => `DROP INDEX old_idx${i};`,
  (i: number) => `VACUUM FULL orders${i};`,
  (i: number) => `CREATE INDEX CONCURRENTLY IF NOT EXISTS ci${i} ON orders${i} (a);`,
  () => "SET lock_timeout = '2s';",
  (i: number) => `ALTER TABLE orders${i} ADD COLUMN note text;`,
  () => `BEGIN;`,
  (i: number) => `ALTER TABLE orders${i} ADD CONSTRAINT fk2${i} FOREIGN KEY (b) REFERENCES b (id) NOT VALID;`,
  (i: number) => `ALTER TABLE orders${i} VALIDATE CONSTRAINT fk2${i};`,
  () => `COMMIT;`,
];

export function corpus(files = 200, statements = 20): InputFile[] {
  const out: InputFile[] = [];
  for (let f = 0; f < files; f++) {
    const lines: string[] = [];
    for (let s = 0; s < statements; s++) lines.push(STATEMENTS[s % STATEMENTS.length](f * 100 + s));
    out.push({ path: `migrations/${String(f).padStart(4, '0')}_batch.sql`, status: 'added', content: lines.join('\n') + '\n' });
  }
  return out;
}

describe('performance budget', () => {
  it('parser boot is under 2 s', async () => {
    const t = performance.now();
    await loadParser();
    const ms = performance.now() - t;
    console.log(`parser boot: ${ms.toFixed(0)} ms`);
    expect(ms).toBeLessThan(2000);
  });

  it('200 files x 20 statements, all 21 rules: engine under 5 s, end to end under 10 s', async () => {
    const files = corpus();
    const t = performance.now();
    const out = await run({ files, configText: 'rules:\n  PG021: info\n' });
    const total = performance.now() - t;
    console.log(`corpus: ${files.length} files, ${out.result.files.reduce((n, f) => n + f.statements, 0)} statements, ${out.result.findings.length} findings; engine ${out.result.engineMs} ms, end to end ${total.toFixed(0)} ms, summary ${(Buffer.byteLength(out.summary) / 1024).toFixed(0)} KiB, SARIF ${(JSON.stringify(out.sarif).length / 1024).toFixed(0)} KiB`);
    expect(out.result.files.length).toBe(200);
    expect(out.result.parseFailures).toEqual([]);
    expect(out.result.engineMs).toBeLessThan(5000);
    expect(total).toBeLessThan(10000);
    const rss = process.memoryUsage().rss / 1024 / 1024;
    console.log(`rss after corpus: ${rss.toFixed(0)} MB`);
  });
});
