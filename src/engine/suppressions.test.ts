import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import { parseSuppression } from './suppressions.js';

const INDEX = 'CREATE INDEX orders_created_at_idx ON orders (created_at);';

describe('suppressions', () => {
  it('parses ids, all, and reasons in both quote styles', () => {
    expect(parseSuppression('p', 1, ' lurie-guard: ignore PG001 reason="orders is empty"')).toMatchObject({ ruleIds: ['PG001'], reason: 'orders is empty' });
    expect(parseSuppression('p', 1, " lurie-guard: ignore PG001, PG004 reason='x'")).toMatchObject({ ruleIds: ['PG001', 'PG004'], reason: 'x' });
    expect(parseSuppression('p', 1, ' lurie-guard: ignore all reason="window"')).toMatchObject({ ruleIds: 'all', reason: 'window' });
    expect(parseSuppression('p', 1, ' lurie-guard: ignore PG001')).toMatchObject({ ruleIds: ['PG001'], reason: undefined });
    expect(parseSuppression('p', 1, ' just a comment')).toBeUndefined();
  });

  it('with a reason: the finding is suppressed, listed in the summary, and the exit code ignores it', async () => {
    const out = await run({
      files: [{ path: 'migrations/1.sql', status: 'added', content: `-- lurie-guard: ignore PG001 reason="orders is created in V12 and still empty"\n${INDEX}\n` }],
      configText: 'fail_on: error\n',
    });
    const f = out.result.findings.find((x) => x.ruleId === 'PG001');
    expect(f?.suppressed).toEqual({ reason: 'orders is created in V12 and still empty', line: 1 });
    expect(out.active.map((x) => x.ruleId)).not.toContain('PG001');
    expect(out.exitCode).toBe(0);
    expect(out.summary).toContain('### Suppressed');
    expect(out.summary).toContain('orders is created in V12 and still empty');
    expect(out.result.suppressions).toEqual([{ path: 'migrations/1.sql', line: 1, ruleIds: ['PG001'], reason: 'orders is created in V12 and still empty', matched: 1 }]);
  });

  it('on the statement line as a trailing comment', async () => {
    const out = await run({ files: [{ path: 'migrations/1.sql', status: 'added', content: `${INDEX} -- lurie-guard: ignore PG001 reason="empty"\n` }] });
    expect(out.result.findings.find((x) => x.ruleId === 'PG001')?.suppressed?.line).toBe(1);
  });

  it('without a reason: PGS01 is reported and the finding stays', async () => {
    const out = await run({ files: [{ path: 'migrations/1.sql', status: 'added', content: `-- lurie-guard: ignore PG001\n${INDEX}\n` }], configText: 'fail_on: error\n' });
    expect(out.active.map((x) => x.ruleId).sort()).toEqual(['PG001', 'PGS01']);
    expect(out.exitCode).toBe(1);
    expect(out.active.find((x) => x.ruleId === 'PGS01')?.severity).toBe('warning');
  });

  it('unused: PGS02 info', async () => {
    const out = await run({ files: [{ path: 'migrations/1.sql', status: 'added', content: `-- lurie-guard: ignore PG002 reason="nothing here"\nCREATE INDEX CONCURRENTLY i ON orders (a);\n` }] });
    const pgs02 = out.active.find((x) => x.ruleId === 'PGS02');
    expect(pgs02?.severity).toBe('info');
    expect(pgs02?.line).toBe(1);
  });

  it('ignore all: suppresses every rule on the statement and reports PGS03', async () => {
    const out = await run({
      files: [{ path: 'migrations/1.sql', status: 'added', content: `-- lurie-guard: ignore all reason="maintenance window 2026-10-25"\nALTER TABLE orders ALTER COLUMN amount SET NOT NULL;\n` }],
    });
    expect(out.result.findings.filter((x) => x.suppressed).map((x) => x.ruleId).sort()).toEqual(['PG004', 'PG007']);
    expect(out.active.map((x) => x.ruleId)).toEqual(['PGS03']);
  });

  it('works with the host language comment syntax in Rails migrations', async () => {
    const rb = `class AddIndex < ActiveRecord::Migration[7.1]
  def change
    # lurie-guard: ignore PG001 reason="orders is new in this release"
    add_index :orders, :created_at
  end
end
`;
    const out = await run({ files: [{ path: 'db/migrate/20261019_add_index.rb', status: 'added', content: rb }] });
    const f = out.result.findings.find((x) => x.ruleId === 'PG001');
    expect(f?.line).toBe(4);
    expect(f?.suppressed?.reason).toBe('orders is new in this release');
  });
});
