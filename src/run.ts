// The run, without GitHub: files in, findings and every report out. The action
// (main.ts) and the CLI (cli.ts) both call this; the end-to-end test calls the
// built bundle.
import { ConfigError, parseConfig } from './config/index.js';
import { detectMigrations, type InputFile } from './detector/index.js';
import { builtinCatalog } from './engine/builtin.js';
import { analyze } from './engine/index.js';
import { catalog, rules } from './generated/rules-index.js';
import { buildSarif } from './reporters/sarif.js';
import { buildSummary, type SummaryOptions } from './reporters/summary.js';
import type { AnalysisResult, Finding, ResolvedConfig, RuleCatalogEntry } from './types.js';

export const VERSION = process.env.LURIE_GUARD_VERSION ?? '0.0.0-dev';

export interface RunInput {
  files: InputFile[];
  /** The base-branch `.lurie-guard.yml`; undefined when absent. */
  configText?: string;
  /** Overrides applied after the config (the CLI's --fail-on, --all-rules). */
  configOverride?: (config: ResolvedConfig) => void;
  readSibling?: (path: string) => string | undefined;
  notices?: string[];
  /** Each file as its own migration set (history scans). */
  perFile?: boolean;
}

export interface RunOutput {
  config: ResolvedConfig;
  result: AnalysisResult;
  sarif: Record<string, unknown>;
  summary: string;
  /** Files of the PR the detector did not classify as migrations. */
  skipped: string[];
  active: Finding[];
  counts: { findings: number; errors: number; warnings: number; infos: number };
  reportOnly: boolean;
  /** 0 or 1 by `fail_on` and the findings after suppression. */
  exitCode: number;
  runMs: number;
}

export function fullCatalog(): RuleCatalogEntry[] {
  return [...catalog, ...builtinCatalog()];
}

/** Parses the config or throws ConfigError with the key named. */
export function loadConfig(text: string | undefined): ResolvedConfig {
  return parseConfig(text, fullCatalog());
}

export { ConfigError };

export function exitCodeFor(config: ResolvedConfig, active: Finding[]): number {
  if (config.failOn === 'none') return 0;
  const threshold = config.failOn === 'error' ? ['error'] : ['error', 'warning'];
  return active.some((f) => threshold.includes(f.severity)) ? 1 : 0;
}

export async function run(input: RunInput, extra: Partial<Pick<SummaryOptions, 'llm' | 'explanations'>> = {}): Promise<RunOutput> {
  const started = performance.now();
  const config = loadConfig(input.configText);
  input.configOverride?.(config);
  const all = fullCatalog();
  const byPath = new Map(input.files.map((f) => [f.path, f.content]));
  const migrations = await detectMigrations(input.files, {
    config,
    readSibling: input.readSibling ?? ((p) => byPath.get(p)),
  });
  const detected = new Set(migrations.map((m) => m.path));
  const skipped = input.files.map((f) => f.path).filter((p) => !detected.has(p) && !p.endsWith('.conf'));
  const result = await analyze({ files: migrations, config, rules, catalog: all, perFile: input.perFile });
  const active = result.findings.filter((f) => !f.suppressed);
  const counts = {
    findings: active.length,
    errors: active.filter((f) => f.severity === 'error').length,
    warnings: active.filter((f) => f.severity === 'warning').length,
    infos: active.filter((f) => f.severity === 'info').length,
  };
  const reportOnly = config.failOn === 'none';
  const sarif = buildSarif(result, all, { version: VERSION, contents: byPath });
  const runMs = Math.round(performance.now() - started);
  const summary = buildSummary(result, {
    config,
    reportOnly,
    skipped,
    runMs,
    notices: input.notices ?? [],
    llm: extra.llm,
    explanations: extra.explanations,
  });
  return { config, result, sarif, summary, skipped, active, counts, reportOnly, exitCode: exitCodeFor(config, active), runMs };
}
