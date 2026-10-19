import { describe, expect, it } from 'vitest';
import type { InputFile } from '../detector/index.js';
import { exitCodeFor, run } from '../run.js';

const INDEX = 'CREATE INDEX orders_created_at_idx ON orders (created_at);\n';

function sql(path: string, content: string, status: 'added' | 'modified' = 'added'): InputFile {
  return { path, status, content };
}

describe('engine', () => {
  it('reports PG001 on an existing table and not on a table created in another added file', async () => {
    const a = await run({ files: [sql('migrations/002_index.sql', INDEX)] });
    expect(a.active.map((f) => f.ruleId)).toContain('PG001');
    const b = await run({
      files: [sql('migrations/001_create.sql', 'CREATE TABLE orders (id bigint PRIMARY KEY, created_at timestamptz);\n'), sql('migrations/002_index.sql', INDEX)],
    });
    expect(b.active.filter((f) => f.ruleId === 'PG001')).toEqual([]);
  });

  it('a modified file does not make its tables new', async () => {
    const out = await run({
      files: [
        sql('migrations/001_create.sql', 'CREATE TABLE orders (id bigint PRIMARY KEY, created_at timestamptz);\n', 'modified'),
        sql('migrations/002_index.sql', INDEX),
      ],
    });
    expect(out.active.filter((f) => f.ruleId === 'PG001').length).toBe(1);
  });

  it('a file that does not parse gives one PGS04 info finding and does not affect the exit code', async () => {
    const out = await run({
      files: [sql('migrations/001_broken.sql', 'CREATE TABLE t (id int);\nALTER TABL orders ADD COLUMN x int;\n'), sql('migrations/002_index.sql', INDEX)],
      configText: 'fail_on: error\n',
    });
    const parse = out.result.findings.filter((f) => f.ruleId === 'PGS04');
    expect(parse.length).toBe(1);
    expect(parse[0].severity).toBe('info');
    expect(parse[0].line).toBe(2);
    expect(parse[0].message).toMatch(/line 2, column \d+/);
    expect(out.result.files.find((f) => f.path === 'migrations/001_broken.sql')?.status).toBe('parse-error');
    // The other file still produced its error finding, which is what fails the run; the parse failure alone would not.
    const onlyBroken = await run({ files: [sql('migrations/001_broken.sql', 'ALTER TABL orders ADD COLUMN x int;\n')], configText: 'fail_on: error\n' });
    expect(onlyBroken.exitCode).toBe(0);
    expect(out.exitCode).toBe(1);
  });

  it('exit code follows fail_on (ADR 0007): none by default, error and warning when set', async () => {
    const files = [sql('migrations/002_index.sql', INDEX)];
    const none = await run({ files });
    expect(none.counts.errors).toBeGreaterThan(0);
    expect(none.reportOnly).toBe(true);
    expect(none.exitCode).toBe(0);
    expect(none.summary).toContain('Report-only');
    const error = await run({ files, configText: 'fail_on: error\n' });
    expect(error.exitCode).toBe(1);
    expect(error.reportOnly).toBe(false);
    const warnOnly = await run({ files: [sql('migrations/003_rename.sql', 'ALTER TABLE orders RENAME COLUMN a TO b;\n')], configText: 'fail_on: error\n' });
    expect(warnOnly.counts.warnings).toBeGreaterThan(0);
    expect(warnOnly.exitCode).toBe(0);
    const warnFails = await run({ files: [sql('migrations/003_rename.sql', 'ALTER TABLE orders RENAME COLUMN a TO b;\n')], configText: 'fail_on: warning\n' });
    expect(warnFails.exitCode).toBe(1);
  });

  it('exitCodeFor treats suppressed findings as gone', () => {
    const config = { failOn: 'error' } as Parameters<typeof exitCodeFor>[0];
    expect(exitCodeFor(config, [])).toBe(0);
  });

  it('per-rule excludes and rule severity overrides apply', async () => {
    const out = await run({
      files: [sql('db/migrations/legacy/001.sql', INDEX), sql('db/migrations/new/002.sql', INDEX)],
      configText: 'rules:\n  PG001:\n    severity: warning\n    exclude:\n      - db/migrations/legacy/**\n',
    });
    const pg001 = out.active.filter((f) => f.ruleId === 'PG001');
    expect(pg001.map((f) => f.path)).toEqual(['db/migrations/new/002.sql']);
    expect(pg001[0].severity).toBe('warning');
  });

  it('fingerprints do not depend on the line number', async () => {
    const a = await run({ files: [sql('migrations/x.sql', INDEX)] });
    const b = await run({ files: [sql('migrations/x.sql', `-- moved\n-- three\n-- lines\n${INDEX}`)] });
    const fa = a.active.find((f) => f.ruleId === 'PG001');
    const fb = b.active.find((f) => f.ruleId === 'PG001');
    expect(fa?.line).toBe(1);
    expect(fb?.line).toBe(4);
    expect(fa?.fingerprint).toBe(fb?.fingerprint);
  });

  it('a transaction wrapper decided by the config makes CONCURRENTLY fail (PG003) and lock_timeout state resets per file', async () => {
    const out = await run({
      files: [
        sql('migrations/001.sql', "SET lock_timeout = '1s';\nALTER TABLE orders ADD COLUMN a int;\n"),
        sql('migrations/002.sql', 'ALTER TABLE orders ADD COLUMN b int;\nCREATE INDEX CONCURRENTLY i ON orders (b);\n'),
      ],
      configText: 'transaction: always\n',
    });
    expect(out.active.filter((f) => f.ruleId === 'PG004').map((f) => f.path)).toEqual(['migrations/002.sql']);
    expect(out.active.filter((f) => f.ruleId === 'PG003').map((f) => f.path)).toEqual(['migrations/002.sql']);
  });
});
