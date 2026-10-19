// The vitest harness every rule.test.ts uses: registers one case per fixture
// entry and asserts the `-- expect:` markers (RULES.md, "Fixtures").
import { basename } from 'node:path';
import { describe, expect, it } from 'vitest';
import { rules } from './generated/rules-index.js';
import { loadCases, runCase, type FixtureCase } from './harness-core.js';
import type { AnalysisResult, Finding } from './types.js';

export { loadCase, loadCases, runCase } from './harness-core.js';

function actualLines(findings: Finding[], path: string, ruleId: string): number[] {
  return findings
    .filter((f) => f.path === path && f.ruleId === ruleId && !f.suppressed)
    .map((f) => f.line)
    .sort((a, b) => a - b);
}

function expectDetected(c: FixtureCase, result: AnalysisResult): void {
  const detected = result.files.map((f) => f.path);
  for (const f of c.files) if (!f.path.endsWith('.conf')) expect(detected, `${f.path} was not detected as a migration`).toContain(f.path);
}

/** Registers the vitest cases for one rule folder. */
export function testRule(ruleDir: string): void {
  const ruleId = /^([A-Z]+\d{3})-/.exec(basename(ruleDir))?.[1];
  if (!ruleId) throw new Error(`cannot read the rule id from ${ruleDir}`);
  const rule = rules.find((r) => r.id === ruleId);
  if (!rule) throw new Error(`${ruleId} is not in the rules index; run npm run gen:rules`);

  describe(ruleId, () => {
    const bad = loadCases(ruleDir, 'bad');
    const good = loadCases(ruleDir, 'good');
    it('has at least one bad and one good fixture', () => {
      expect(bad.length).toBeGreaterThan(0);
      expect(good.length).toBeGreaterThan(0);
    });
    for (const c of bad) {
      it(`bad/${c.name} produces exactly the expected findings`, async () => {
        const result = await runCase(c, ruleId);
        expectDetected(c, result);
        const ownMarkers = [...c.expected.keys()].filter((k) => k.endsWith(`:${ruleId}`));
        expect(ownMarkers.length, `bad fixture ${c.name} has no -- expect: ${ruleId} marker`).toBeGreaterThan(0);
        assertMarkers(c, result, ruleId);
      });
    }
    for (const c of good) {
      it(`good/${c.name} produces no ${ruleId} finding`, async () => {
        const result = await runCase(c, ruleId);
        expectDetected(c, result);
        expect(result.parseFailures, 'good fixture must parse').toEqual([]);
        const own = result.findings.filter((f) => f.ruleId === ruleId && !f.suppressed);
        expect(own.map((f) => `${f.path}:${f.line} ${f.message}`)).toEqual([]);
        assertMarkers(c, result, ruleId);
      });
    }
    it('is deterministic: two runs give identical output', async () => {
      for (const c of [...bad, ...good]) {
        const strip = (k: string, v: unknown): unknown => (k === 'engineMs' ? undefined : v);
        const a = JSON.stringify(await runCase(c, ruleId), strip);
        const b = JSON.stringify(await runCase(c, ruleId), strip);
        expect(a).toEqual(b);
      }
    });
  });
}

function assertMarkers(c: FixtureCase, result: AnalysisResult, ruleId: string): void {
  // Every marked rule is checked exactly; other rules are ignored unless the fixture says expect-none.
  const checked = new Set<string>();
  for (const [key, lines] of c.expected) {
    const [path, id] = key.split(':');
    checked.add(key);
    expect(actualLines(result.findings, path, id), `${id} lines in ${path}`).toEqual([...lines].sort((a, b) => a - b));
  }
  for (const f of c.files) {
    const key = `${f.path}:${ruleId}`;
    if (!checked.has(key)) expect(actualLines(result.findings, f.path, ruleId), `${ruleId} lines in ${f.path}`).toEqual([]);
  }
  if (c.expectNone) {
    const others = result.findings.filter((f) => !f.suppressed && !c.expected.has(`${f.path}:${f.ruleId}`));
    expect(others.map((f) => `${f.ruleId} ${f.path}:${f.line}`)).toEqual([]);
  }
}
