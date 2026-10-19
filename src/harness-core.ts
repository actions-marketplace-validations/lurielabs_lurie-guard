// Fixture loading and running, shared by the vitest harness (harness.ts) and
// the CLI's --fixtures mode (the determinism diff in scripts/test-rules.sh).
// Each entry under fixtures/bad and fixtures/good is one pull request: a single
// .sql file (placed at migrations/<name>) or a directory whose files keep their
// paths. `-- expect: PG001` marks a line that must produce that finding; a
// directory may carry a .lurie-guard.yml.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { parseConfig } from './config/index.js';
import { detectMigrations, type InputFile } from './detector/index.js';
import { builtinCatalog } from './engine/builtin.js';
import { analyze } from './engine/index.js';
import { catalog, rules } from './generated/rules-index.js';
import type { AnalysisResult, ResolvedConfig } from './types.js';

export interface FixtureCase {
  name: string;
  kind: 'bad' | 'good';
  files: InputFile[];
  configText?: string;
  expectNone: boolean;
  /** `path:RULEID` -> sorted lines that must produce it */
  expected: Map<string, number[]>;
}

const EXPECT = /(?:--|#)\s*expect:\s*([A-Za-z]+\d{3}(?:\s*,\s*[A-Za-z]+\d{3})*)/;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir).sort()) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

export function loadCase(entryPath: string, kind: 'bad' | 'good'): FixtureCase {
  const name = basename(entryPath);
  const files: InputFile[] = [];
  let configText: string | undefined;
  if (statSync(entryPath).isDirectory()) {
    for (const p of walk(entryPath)) {
      const rel = relative(entryPath, p).replace(/\\/g, '/');
      const content = readFileSync(p, 'utf8');
      if (rel === '.lurie-guard.yml') {
        configText = content;
        continue;
      }
      // A bare .sql file is a plain migration; files under a directory keep their path (framework fixtures).
      const path = !rel.includes('/') && rel.endsWith('.sql') ? `migrations/${rel}` : rel.replace(/^modified\//, '');
      files.push({ path, status: rel.startsWith('modified/') ? 'modified' : 'added', content });
    }
  } else {
    const content = readFileSync(entryPath, 'utf8');
    const path = name.endsWith('.sql') ? `migrations/${name}` : name;
    files.push({ path, status: 'added', content });
  }
  const expected = new Map<string, number[]>();
  let expectNone = false;
  for (const f of files) {
    f.content.split('\n').forEach((text, i) => {
      if (/(?:--|#)\s*expect-none\b/.test(text)) expectNone = true;
      const m = EXPECT.exec(text);
      if (!m) return;
      for (const id of m[1].split(/\s*,\s*/)) {
        const key = `${f.path}:${id.toUpperCase()}`;
        const list = expected.get(key) ?? [];
        list.push(i + 1);
        expected.set(key, list);
      }
    });
  }
  return { name, kind, files, configText, expectNone, expected };
}

export function loadCases(ruleDir: string, kind: 'bad' | 'good'): FixtureCase[] {
  const dir = join(ruleDir, 'fixtures', kind);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .sort()
    .map((e) => loadCase(join(dir, e), kind));
}

/** The config for a case: the file's config (or defaults) with the rule under test enabled. */
export function configFor(ruleId: string | undefined, configText?: string): ResolvedConfig {
  const config = parseConfig(configText, [...catalog, ...builtinCatalog()]);
  if (ruleId) {
    const entry = catalog.find((c) => c.id === ruleId);
    if (entry && config.rules[ruleId] === undefined && !new RegExp(`\\b${ruleId}\\s*:\\s*off`).test(configText ?? ''))
      config.rules[ruleId] = entry.severity;
  }
  return config;
}

export type CaseResult = AnalysisResult & { config: ResolvedConfig };

export async function runCase(c: FixtureCase, ruleId?: string): Promise<CaseResult> {
  const config = configFor(ruleId, c.configText);
  const byPath = new Map(c.files.map((f) => [f.path, f.content]));
  const migrations = await detectMigrations(c.files, { config, readSibling: (p) => byPath.get(p) });
  const result = await analyze({ files: migrations, config, rules, catalog: [...catalog, ...builtinCatalog()] });
  return { ...result, config };
}
