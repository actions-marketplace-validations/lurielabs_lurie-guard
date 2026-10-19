// SQL parsing with PostgreSQL's own parser (libpg_query as WebAssembly).
// Statements come back positioned in the host file, so a finding can point at
// the exact line even when the SQL was extracted from a Rails or Django file.
import { loadModule, parse, scan, SqlError } from 'libpg-query';
import type { ParseFailure, SqlSegment, Statement, Token } from '../types.js';

let loaded: Promise<void> | undefined;

/** Loads the WebAssembly parser once. Called by the engine before the first file. */
export function loadParser(): Promise<void> {
  if (!loaded) loaded = loadModule();
  return loaded;
}

export interface ParsedSegment {
  statements: Statement[];
  tokens: Token[];
  failure?: ParseFailure;
}

function lineStartsOf(buf: Buffer): number[] {
  const starts = [0];
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0x0a) starts.push(i + 1);
  return starts;
}

function lineIndexOf(starts: number[], byteOffset: number): number {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= byteOffset) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

export async function parseSegment(
  segment: SqlSegment,
  path: string,
  firstIndex: number,
): Promise<ParsedSegment> {
  await loadParser();
  const sql = segment.sql;
  if (sql.trim() === '') return { statements: [], tokens: [] };
  const buf = Buffer.from(sql, 'utf8');
  const starts = lineStartsOf(buf);
  const lineAt = (byteOffset: number): number =>
    segment.line + lineIndexOf(starts, Math.max(0, Math.min(byteOffset, buf.length)));

  let tokens: Token[] = [];
  let tree;
  try {
    const scanned = await scan(sql);
    tokens = scanned.tokens.map((t) => ({
      start: t.start,
      end: t.end,
      kind: t.tokenName,
      keyword: t.keywordName === 'NO_KEYWORD' ? '' : t.text.toUpperCase(),
      text: t.text,
    }));
    tree = await parse(sql);
  } catch (err) {
    if (err instanceof SqlError) {
      // cursorPosition is a 0-based character offset into the segment.
      const pos = err.sqlDetails?.cursorPosition ?? 0;
      const before = sql.slice(0, pos);
      const lineIdx = before.split('\n').length - 1;
      const column = pos - (before.lastIndexOf('\n') + 1) + 1;
      return {
        statements: [],
        tokens,
        failure: { path, line: segment.line + lineIdx, column, message: err.message },
      };
    }
    throw err;
  }

  const statements: Statement[] = [];
  let index = firstIndex;
  for (const raw of tree.stmts ?? []) {
    if (!raw.stmt) continue;
    const location = raw.stmt_location ?? 0;
    const length = raw.stmt_len ?? buf.length - location;
    const end = location + length;
    const first = tokens.find((t) => t.start >= location && t.kind !== 'SQL_COMMENT' && t.kind !== 'C_COMMENT');
    if (!first || first.start >= end) continue;
    const start = first.start;
    // The statement ends at its last token that is not a comment (a final statement
    // without `;` would otherwise swallow a trailing comment).
    let lastEnd = end;
    for (const t of tokens) {
      if (t.start < start || t.end > end) continue;
      if (t.kind === 'SQL_COMMENT' || t.kind === 'C_COMMENT') continue;
      lastEnd = t.end;
    }
    const text = buf.subarray(start, Math.min(end, lastEnd)).toString('utf8').trimEnd();
    const endByte = start + Buffer.byteLength(text, 'utf8');
    const node = raw.stmt as Record<string, unknown>;
    const kind = Object.keys(node)[0];
    const stmtTokens = tokens.filter((t) => t.start >= start && t.end <= endByte);
    const line = lineAt(start);
    const endLine = lineAt(Math.max(start, endByte - 1));
    const lineStart = starts[lineIndexOf(starts, start)];
    const leading = buf.subarray(lineStart, start).toString('utf8');
    const lineEnd = endByte < buf.length ? Math.min(buf.length, starts[lineIndexOf(starts, endByte - 1) + 1] ?? buf.length) : buf.length;
    const trailing = buf.subarray(endByte, lineEnd).toString('utf8').replace(/^\s*;?\s*$/, '');
    statements.push({
      node,
      kind,
      inner: node[kind],
      text,
      line,
      endLine,
      wholeLines: leading.trim() === '' && (trailing === '' || /^\s*--/.test(trailing)),
      segment,
      index: index++,
      lineAt,
      tokens: () => stmtTokens,
    });
  }
  return { statements, tokens };
}

/** Comment tokens of a segment, with their host line (for suppressions). */
export function commentTokens(tokens: Token[], segment: SqlSegment, sql: string): { line: number; text: string }[] {
  const buf = Buffer.from(sql, 'utf8');
  const starts = lineStartsOf(buf);
  const out: { line: number; text: string }[] = [];
  for (const t of tokens) {
    if (t.kind !== 'SQL_COMMENT' && t.kind !== 'C_COMMENT') continue;
    const body = t.kind === 'SQL_COMMENT' ? t.text.replace(/^--/, '') : t.text.replace(/^\/\*/, '').replace(/\*\/$/, '');
    out.push({ line: segment.line + lineIndexOf(starts, t.start), text: body });
  }
  return out;
}
