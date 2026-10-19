// The rule engine: parses every migration file, builds the "new table" set
// across the PR, walks each file's statements in order with the per-file state,
// runs the enabled rules, applies suppressions and computes fingerprints.
// Deterministic: no network, no database, no clock in the findings.
import picomatch from 'picomatch';
import { evidenceUrl } from '../evidence.js';
import { relName } from '../parser/ast.js';
import { commentTokens, parseSegment } from '../parser/pg.js';
import type {
  AnalysisResult,
  FileReport,
  Finding,
  MigrationFile,
  ParseFailure,
  ResolvedConfig,
  Rule,
  RuleCatalogEntry,
  RuleContext,
  RuleResult,
  Statement,
} from '../types.js';
import { fingerprint } from './fingerprint.js';
import { collectCreated, currentTxn, indexKey, newFileState, newPrState, transition } from './state.js';
import { applySuppressions, parseSuppression, type ParsedSuppression } from './suppressions.js';

export interface AnalyzeInput {
  files: MigrationFile[];
  config: ResolvedConfig;
  rules: Rule[];
  catalog: RuleCatalogEntry[];
  /**
   * Each file is its own migration set (a history scan replays each migration as the PR it
   * was): tables created in an earlier file are existing. Default: the files are one PR.
   */
  perFile?: boolean;
}

interface ParsedFile {
  file: MigrationFile;
  statements: Statement[];
  comments: { line: number; text: string }[];
  failure?: ParseFailure;
}

function sortedFiles(files: MigrationFile[]): MigrationFile[] {
  return [...files].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

export async function analyze(input: AnalyzeInput): Promise<AnalysisResult> {
  const started = performance.now();
  const { config } = input;
  const catalogById = new Map(input.catalog.map((c) => [c.id, c]));
  const enabled = input.rules.filter((r) => config.rules[r.id] !== undefined);
  const excludeMatchers = new Map<string, (p: string) => boolean>();
  for (const [id, globs] of Object.entries(config.ruleExcludes)) excludeMatchers.set(id, picomatch(globs, { dot: true }));

  // 1. Parse every segment of every file.
  const parsed: ParsedFile[] = [];
  for (const file of sortedFiles(input.files)) {
    const statements: Statement[] = [];
    const comments: { line: number; text: string }[] = [...(file.comments ?? [])];
    let failure: ParseFailure | undefined;
    for (const segment of file.segments) {
      const out = await parseSegment(segment, file.path, statements.length);
      if (out.failure) {
        failure = out.failure;
        break;
      }
      statements.push(...out.statements);
      comments.push(...commentTokens(out.tokens, segment, segment.sql));
    }
    parsed.push({ file, statements: failure ? [] : statements, comments, failure });
  }

  // 2. What the migration set creates (per file when a history scan replays each migration on its own).
  const shared = newPrState();
  if (!input.perFile) for (const p of parsed) collectCreated(p.file, p.statements, shared);

  // 3. Rules, file by file, statement by statement.
  const findings: Finding[] = [];
  const suppressions: ParsedSuppression[] = [];
  const reports: FileReport[] = [];
  const parseFailures: ParseFailure[] = [];

  for (const p of parsed) {
    const { file } = p;
    for (const c of p.comments) {
      const s = parseSuppression(file.path, c.line, c.text);
      if (s) suppressions.push(s);
    }
    if (p.failure) {
      parseFailures.push(p.failure);
      findings.push({
        ruleId: 'PGS04',
        severity: 'info',
        path: file.path,
        line: p.failure.line,
        endLine: p.failure.line,
        message: `Could not parse this file: ${p.failure.message} at line ${p.failure.line}, column ${p.failure.column}. No rule ran on it. (PGS04)`,
        fingerprint: fingerprint('PGS04', p.failure.message, file.path),
      });
      reports.push({
        path: file.path,
        framework: file.framework,
        wrapped: file.wrapped,
        wrapReason: file.wrapReason,
        status: 'parse-error',
        statements: 0,
        notAnalyzed: file.notAnalyzed,
      });
      continue;
    }

    const pr = input.perFile ? newPrState() : shared;
    if (input.perFile) collectCreated(file, p.statements, pr);
    const state = newFileState();
    const ctx: RuleContext = {
      file,
      state,
      pr,
      config,
      isNewTable: (rangeVar) => {
        const rv = relName(rangeVar);
        return rv !== undefined && pr.newTables.has(rv.key);
      },
      isNewIndex: (name) => pr.newIndexes.has(indexKey(name)) || [...pr.newIndexes].some((k) => k.endsWith(`.${name.toLowerCase()}`)),
      tableName: (rangeVar) => relName(rangeVar)?.display ?? '?',
      inTransaction: () => false,
      currentTxn: () => 's0',
    };

    for (const stmt of p.statements) {
      const txn = currentTxn(file, state, stmt);
      ctx.inTransaction = () => txn !== `s${stmt.index}`;
      ctx.currentTxn = () => txn;
      for (const rule of enabled) {
        const excluded = excludeMatchers.get(rule.id);
        if (excluded && excluded(file.path)) continue;
        const raw = rule.check(stmt, ctx);
        if (!raw) continue;
        const results: RuleResult[] = Array.isArray(raw) ? raw : [raw];
        for (const r of results) findings.push(toFinding(rule, r, stmt, file, config, catalogById.get(rule.id)));
      }
      transition(file, state, pr, stmt, txn);
    }

    reports.push({
      path: file.path,
      framework: file.framework,
      wrapped: file.wrapped,
      wrapReason: file.wrapReason,
      status: 'analyzed',
      statements: p.statements.length,
      notAnalyzed: file.notAnalyzed,
    });
  }

  // 4. Suppressions, then a stable order.
  const outcome = applySuppressions(findings, suppressions);
  const all = outcome.findings.sort(
    (a, b) =>
      a.path.localeCompare(b.path) || a.line - b.line || a.ruleId.localeCompare(b.ruleId) || a.fingerprint.localeCompare(b.fingerprint),
  );
  return {
    findings: all,
    suppressions: outcome.records,
    files: reports,
    parseFailures,
    engineMs: Math.round(performance.now() - started),
  };
}

function toFinding(
  rule: Rule,
  r: RuleResult,
  stmt: Statement,
  file: MigrationFile,
  config: ResolvedConfig,
  entry: RuleCatalogEntry | undefined,
): Finding {
  const synthesized = stmt.segment.synthesized !== undefined;
  const line = synthesized ? stmt.segment.line : (r.line ?? stmt.line);
  const endLine = synthesized ? stmt.segment.line : (r.endLine ?? (r.line !== undefined ? r.line : stmt.endLine));
  const evidence = entry?.evidence.find((e) => !/^https?:\/\//.test(e)) ?? entry?.evidence[0];
  const suffix = evidence ? `(${rule.id}, [evidence](${evidenceUrl(evidence)}))` : `(${rule.id})`;
  let fix = r.fix;
  if (fix && fix.kind === 'suggestion' && (synthesized || !stmt.wholeLines)) fix = { kind: 'block', text: fix.text };
  if (fix && fix.kind === 'suggestion') {
    // The suggestion replaces the statement's whole lines: keep the indentation,
    // the terminating semicolon and any trailing comment of the original lines.
    const lines = file.content.split('\n');
    const first = lines[stmt.line - 1] ?? '';
    const last = lines[stmt.endLine - 1] ?? '';
    const indent = /^\s*/.exec(first)?.[0] ?? '';
    const lastStmtLine = stmt.text.split('\n').pop() ?? '';
    const at = last.indexOf(lastStmtLine.trimEnd());
    const suffix = at >= 0 ? last.slice(at + lastStmtLine.trimEnd().length).replace(/\r$/, '') : ';';
    fix = { kind: 'suggestion', text: `${indent}${fix.text}${suffix}`, startLine: stmt.line, endLine: stmt.endLine };
  }
  return {
    ruleId: rule.id,
    severity: config.rules[rule.id] ?? rule.severity,
    path: file.path,
    line,
    endLine,
    message: `${r.message.trim()} ${suffix}`,
    table: r.table,
    fix,
    fingerprint: fingerprint(rule.id, stmt.text, r.table, r.key),
    statement: stmt.text,
  };
}
