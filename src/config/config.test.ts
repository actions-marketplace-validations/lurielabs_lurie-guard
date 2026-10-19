import { describe, expect, it } from 'vitest';
import { builtinCatalog } from '../engine/builtin.js';
import { catalog } from '../generated/rules-index.js';
import { ConfigError, defaultConfig, parseConfig } from './index.js';

const all = [...catalog, ...builtinCatalog()];

describe('config', () => {
  it('defaults: report-only, 20 rules on, PG021 off', () => {
    const c = defaultConfig(all);
    expect(c.failOn).toBe('none');
    expect(c.postgresVersion).toBe(15);
    expect(Object.keys(c.rules).filter((id) => id.startsWith('PG0')).length).toBe(20);
    expect(c.rules.PG021).toBeUndefined();
    expect(c.rules.PG001).toBe('error');
    expect(c.rules.PG004).toBe('warning');
    expect(c.outputs.maxComments).toBe(25);
    expect(c.llm.model).toBe('claude-sonnet-5-5');
  });

  it('no file and an empty file mean the defaults', () => {
    expect(parseConfig(undefined, all)).toEqual(defaultConfig(all));
    expect(parseConfig('', all)).toEqual(defaultConfig(all));
    expect(parseConfig('# only a comment\n', all)).toEqual(defaultConfig(all));
  });

  it('applies the documented keys', () => {
    const c = parseConfig(
      `version: 1
postgres_version: 18
paths:
  - db/migrate/**/*.sql
exclude:
  - db/migrate/seed/**
framework: flyway
transaction: never
lock_timeout_set_by_runner: true
fail_on: error
rules:
  PG013: off
  PG021: info
  PG004:
    severity: error
    exclude:
      - db/migrate/legacy/**
outputs:
  review_comments: false
  max_comments: 5
llm:
  model: claude-haiku-5-5
  explain: false
  max_cost_usd_per_run: 0.1
`,
      all,
    );
    expect(c.postgresVersion).toBe(18);
    expect(c.paths).toEqual(['db/migrate/**/*.sql']);
    expect(c.framework).toBe('flyway');
    expect(c.transaction).toBe('never');
    expect(c.lockTimeoutSetByRunner).toBe(true);
    expect(c.failOn).toBe('error');
    expect(c.rules.PG013).toBeUndefined();
    expect(c.rules.PG021).toBe('info');
    expect(c.rules.PG004).toBe('error');
    expect(c.ruleExcludes.PG004).toEqual(['db/migrate/legacy/**']);
    expect(c.outputs.reviewComments).toBe(false);
    expect(c.outputs.maxComments).toBe(5);
    expect(c.llm.model).toBe('claude-haiku-5-5');
    expect(c.llm.explain).toBe(false);
    expect(c.llm.maxCostUsdPerRun).toBe(0.1);
  });

  it('names an unknown key', () => {
    expect(() => parseConfig('fail_onn: error\n', all)).toThrow(/unknown key `fail_onn`/);
    expect(() => parseConfig('outputs:\n  sarifs: true\n', all)).toThrow(/unknown key `outputs.sarifs`/);
    expect(() => parseConfig('llm:\n  modell: x\n', all)).toThrow(/unknown key `llm.modell`/);
    expect(() => parseConfig('rules:\n  PG001:\n    severty: error\n', all)).toThrow(/unknown key `rules.PG001.severty`/);
  });

  it('names an unknown rule id and an invalid severity', () => {
    expect(() => parseConfig('rules:\n  PG999: off\n', all)).toThrow(/unknown rule id `PG999`/);
    expect(() => parseConfig('rules:\n  PG001: fatal\n', all)).toThrow(/`rules.PG001` must be off, info, warning or error/);
    expect(() => parseConfig('fail_on: errors\n', all)).toThrow(/`fail_on` must be one of none, warning, error/);
    expect(() => parseConfig('postgres_version: 14\n', all)).toThrow(/postgres_version/);
    expect(() => parseConfig('version: 2\n', all)).toThrow(/`version` must be 1/);
  });

  it('rejects invalid YAML and non-mappings with ConfigError', () => {
    expect(() => parseConfig('rules: [\n', all)).toThrow(ConfigError);
    expect(() => parseConfig('- a\n- b\n', all)).toThrow(/must be a YAML mapping/);
  });
});
