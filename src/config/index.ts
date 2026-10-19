// .lurie-guard.yml: every key has a default; unknown keys, unknown rule ids and
// invalid severities fail the run with the key named, so a typo never silently
// disables a rule (SPEC-MVP.md, "Configuration").
import YAML from 'yaml';
import type { Framework, ResolvedConfig, RuleCatalogEntry, Severity } from '../types.js';

export class ConfigError extends Error {
  constructor(message: string) {
    super(`.lurie-guard.yml: ${message}`);
    this.name = 'ConfigError';
  }
}

const FRAMEWORKS: Framework[] = [
  'sql',
  'flyway',
  'liquibase',
  'rails',
  'django',
  'alembic',
  'prisma',
  'golang-migrate',
  'dbmate',
  'sqitch',
];
const SEVERITIES: Severity[] = ['error', 'warning', 'info'];

const TOP_KEYS = new Set([
  'version',
  'postgres_version',
  'paths',
  'exclude',
  'framework',
  'transaction',
  'lock_timeout_set_by_runner',
  'fail_on',
  'rules',
  'outputs',
  'llm',
]);
const OUTPUT_KEYS = new Set(['review_comments', 'sarif', 'summary', 'max_comments']);
const LLM_KEYS = new Set(['model', 'explain', 'extra_checks', 'max_cost_usd_per_run']);
const RULE_KEYS = new Set(['severity', 'exclude']);

export const DEFAULT_LLM_MODEL = 'claude-sonnet-5-5';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function expectBoolean(v: unknown, key: string): boolean {
  if (typeof v !== 'boolean') throw new ConfigError(`\`${key}\` must be true or false, got ${JSON.stringify(v)}`);
  return v;
}

function expectStringList(v: unknown, key: string): string[] {
  if (!Array.isArray(v) || !v.every((s) => typeof s === 'string'))
    throw new ConfigError(`\`${key}\` must be a list of path globs`);
  return v;
}

function expectOneOf<T extends string>(v: unknown, key: string, allowed: readonly T[]): T {
  if (typeof v !== 'string' || !(allowed as readonly string[]).includes(v))
    throw new ConfigError(`\`${key}\` must be one of ${allowed.join(', ')}, got ${JSON.stringify(v)}`);
  return v as T;
}

/** The configuration with every default applied: the rules at their catalog severity, `info` rules off. */
export function defaultConfig(catalog: RuleCatalogEntry[]): ResolvedConfig {
  const rules: Record<string, Severity> = {};
  for (const r of catalog) {
    if (r.status !== 'active') continue;
    if (r.severity === 'info') continue;
    rules[r.id] = r.severity;
  }
  return {
    version: 1,
    postgresVersion: 15,
    exclude: [],
    framework: 'auto',
    transaction: 'auto',
    lockTimeoutSetByRunner: false,
    failOn: 'none',
    rules,
    ruleExcludes: {},
    outputs: { reviewComments: true, sarif: true, summary: true, maxComments: 25 },
    llm: { model: DEFAULT_LLM_MODEL, explain: true, extraChecks: false, maxCostUsdPerRun: 0.5 },
  };
}

/** Parses the YAML text (undefined or empty means "no file") on top of the defaults. */
export function parseConfig(text: string | undefined, catalog: RuleCatalogEntry[]): ResolvedConfig {
  const config = defaultConfig(catalog);
  if (text === undefined || text.trim() === '') return config;
  let doc: unknown;
  try {
    doc = YAML.parse(text);
  } catch (err) {
    throw new ConfigError(`not valid YAML: ${(err as Error).message}`);
  }
  if (doc === null || doc === undefined) return config;
  if (!isRecord(doc)) throw new ConfigError('the file must be a YAML mapping');

  for (const key of Object.keys(doc)) {
    if (!TOP_KEYS.has(key)) throw new ConfigError(`unknown key \`${key}\``);
  }
  if ('version' in doc && doc.version !== 1) throw new ConfigError(`\`version\` must be 1, got ${JSON.stringify(doc.version)}`);
  if ('postgres_version' in doc) {
    const v = doc.postgres_version;
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 15)
      throw new ConfigError(`\`postgres_version\` must be an integer major of 15 or above, got ${JSON.stringify(v)}`);
    config.postgresVersion = v;
  }
  if ('paths' in doc) config.paths = expectStringList(doc.paths, 'paths');
  if ('exclude' in doc) config.exclude = expectStringList(doc.exclude, 'exclude');
  if ('framework' in doc) config.framework = expectOneOf(doc.framework, 'framework', ['auto', ...FRAMEWORKS] as const);
  if ('transaction' in doc) config.transaction = expectOneOf(doc.transaction, 'transaction', ['auto', 'always', 'never'] as const);
  if ('lock_timeout_set_by_runner' in doc)
    config.lockTimeoutSetByRunner = expectBoolean(doc.lock_timeout_set_by_runner, 'lock_timeout_set_by_runner');
  if ('fail_on' in doc) config.failOn = expectOneOf(doc.fail_on, 'fail_on', ['none', 'warning', 'error'] as const);

  if ('rules' in doc) {
    if (!isRecord(doc.rules)) throw new ConfigError('`rules` must be a mapping of rule id to severity');
    const known = new Map(catalog.map((r) => [r.id, r]));
    for (const [id, value] of Object.entries(doc.rules)) {
      const entry = known.get(id);
      if (!entry) throw new ConfigError(`unknown rule id \`${id}\` under \`rules\``);
      let severity: string;
      if (typeof value === 'string') severity = value;
      else if (isRecord(value)) {
        for (const k of Object.keys(value)) {
          if (!RULE_KEYS.has(k)) throw new ConfigError(`unknown key \`rules.${id}.${k}\``);
        }
        severity = typeof value.severity === 'string' ? value.severity : entry.severity;
        if ('exclude' in value) config.ruleExcludes[id] = expectStringList(value.exclude, `rules.${id}.exclude`);
      } else throw new ConfigError(`\`rules.${id}\` must be off, info, warning, error or a mapping`);
      if (severity === 'off') {
        delete config.rules[id];
        continue;
      }
      if (!SEVERITIES.includes(severity as Severity))
        throw new ConfigError(`\`rules.${id}\` must be off, info, warning or error, got ${JSON.stringify(severity)}`);
      config.rules[id] = severity as Severity;
    }
  }

  if ('outputs' in doc) {
    if (!isRecord(doc.outputs)) throw new ConfigError('`outputs` must be a mapping');
    for (const k of Object.keys(doc.outputs)) if (!OUTPUT_KEYS.has(k)) throw new ConfigError(`unknown key \`outputs.${k}\``);
    const o = doc.outputs;
    if ('review_comments' in o) config.outputs.reviewComments = expectBoolean(o.review_comments, 'outputs.review_comments');
    if ('sarif' in o) config.outputs.sarif = expectBoolean(o.sarif, 'outputs.sarif');
    if ('summary' in o) config.outputs.summary = expectBoolean(o.summary, 'outputs.summary');
    if ('max_comments' in o) {
      if (typeof o.max_comments !== 'number' || o.max_comments < 0)
        throw new ConfigError('`outputs.max_comments` must be a number of comments');
      config.outputs.maxComments = Math.floor(o.max_comments);
    }
  }

  if ('llm' in doc) {
    if (!isRecord(doc.llm)) throw new ConfigError('`llm` must be a mapping');
    for (const k of Object.keys(doc.llm)) if (!LLM_KEYS.has(k)) throw new ConfigError(`unknown key \`llm.${k}\``);
    const l = doc.llm;
    if ('model' in l) {
      if (typeof l.model !== 'string' || l.model === '') throw new ConfigError('`llm.model` must be a model id');
      config.llm.model = l.model;
    }
    if ('explain' in l) config.llm.explain = expectBoolean(l.explain, 'llm.explain');
    if ('extra_checks' in l) config.llm.extraChecks = expectBoolean(l.extra_checks, 'llm.extra_checks');
    if ('max_cost_usd_per_run' in l) {
      if (typeof l.max_cost_usd_per_run !== 'number' || l.max_cost_usd_per_run < 0)
        throw new ConfigError('`llm.max_cost_usd_per_run` must be a number of dollars');
      config.llm.maxCostUsdPerRun = l.max_cost_usd_per_run;
    }
  }
  return config;
}
