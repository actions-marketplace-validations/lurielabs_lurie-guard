// Accessors over PostgreSQL's parse tree (libpg_query JSON). Rules match on
// these node shapes and nothing else: no regular expressions over SQL text.
import type { Statement, Token } from '../types.js';

export interface RelName {
  name: string;
  schema?: string;
  /** Lowercased `schema.name` or `name`: the identity used for the "new table" set. */
  key: string;
  /** As written, for messages. */
  display: string;
}

export function relName(rangeVar: any): RelName | undefined {
  if (!rangeVar || typeof rangeVar.relname !== 'string') return undefined;
  const name: string = rangeVar.relname;
  const schema: string | undefined = rangeVar.schemaname;
  return {
    name,
    schema,
    key: (schema ? `${schema}.${name}` : name).toLowerCase(),
    display: schema ? `${schema}.${name}` : name,
  };
}

/** The list node items of a DropStmt object (`[{String: {sval}}, ...]`) as a RelName. */
export function qualifiedName(items: any[]): RelName | undefined {
  const parts = (items ?? []).map(strVal).filter((s): s is string => typeof s === 'string');
  if (parts.length === 0) return undefined;
  const name = parts[parts.length - 1];
  const schema = parts.length > 1 ? parts[parts.length - 2] : undefined;
  return {
    name,
    schema,
    key: (schema ? `${schema}.${name}` : name).toLowerCase(),
    display: schema ? `${schema}.${name}` : name,
  };
}

export function strVal(node: any): string | undefined {
  if (!node) return undefined;
  if (node.String && typeof node.String.sval === 'string') return node.String.sval;
  if (typeof node.sval === 'string') return node.sval;
  return undefined;
}

export interface TypeInfo {
  /** Lowercased base type name as the parser stores it: `int4`, `int8`, `varchar`, `bpchar`, `timestamp`, `timestamptz`, `json`, `serial`, `uuid`, ... */
  name: string;
  /** True when the parser qualified it as `pg_catalog.` (keyword types). */
  builtin: boolean;
  typmods: number[];
  isArray: boolean;
  /** Type as written, for messages (`varchar(20)`, `timestamp`). */
  display: string;
}

export function typeInfo(typeName: any): TypeInfo | undefined {
  if (!typeName || !Array.isArray(typeName.names)) return undefined;
  const names = typeName.names.map(strVal).filter((s: unknown): s is string => typeof s === 'string');
  if (names.length === 0) return undefined;
  const name = names[names.length - 1].toLowerCase();
  const builtin = names.length > 1 && names[0] === 'pg_catalog';
  const typmods: number[] = [];
  for (const m of typeName.typmods ?? []) {
    const v = m?.A_Const?.ival?.ival;
    if (typeof v === 'number') typmods.push(v);
    else if (m?.A_Const?.ival && Object.keys(m.A_Const.ival).length === 0) typmods.push(0);
  }
  const isArray = Array.isArray(typeName.arrayBounds) && typeName.arrayBounds.length > 0;
  const display = `${names.filter((n: string) => n !== 'pg_catalog').join('.')}${typmods.length ? `(${typmods.join(', ')})` : ''}${isArray ? '[]' : ''}`;
  return { name, builtin, typmods, isArray, display };
}

export function funcName(funcCall: any): string | undefined {
  const names = (funcCall?.funcname ?? []).map(strVal).filter((s: unknown): s is string => typeof s === 'string');
  return names.length ? names[names.length - 1].toLowerCase() : undefined;
}

/** `{ ColumnDef: {...} }` elements of a CREATE TABLE. */
export function columnDefs(createStmt: any): any[] {
  return (createStmt?.tableElts ?? []).map((e: any) => e?.ColumnDef).filter(Boolean);
}

/** Table-level `{ Constraint: {...} }` elements of a CREATE TABLE. */
export function tableConstraints(createStmt: any): any[] {
  return (createStmt?.tableElts ?? []).map((e: any) => e?.Constraint).filter(Boolean);
}

export function columnConstraints(columnDef: any): any[] {
  return (columnDef?.constraints ?? []).map((c: any) => c?.Constraint).filter(Boolean);
}

export function constraintKeys(constraint: any): string[] {
  return (constraint?.keys ?? []).map(strVal).filter((s: unknown): s is string => typeof s === 'string');
}

/** `AlterTableCmd` objects of an ALTER TABLE statement. */
export function alterCmds(alterTableStmt: any): any[] {
  return (alterTableStmt?.cmds ?? []).map((c: any) => c?.AlterTableCmd).filter(Boolean);
}

/** The column named by `CHECK (col IS NOT NULL)`, or undefined. */
export function notNullCheckColumn(expr: any): string | undefined {
  const nt = expr?.NullTest;
  if (!nt || nt.nulltesttype !== 'IS_NOT_NULL') return undefined;
  const fields = nt.arg?.ColumnRef?.fields;
  if (!Array.isArray(fields) || fields.length === 0) return undefined;
  return strVal(fields[fields.length - 1]);
}

/** Whether a DefElem list (VACUUM/REINDEX options) names an option. */
export function hasOption(defElems: any[] | undefined, name: string): boolean {
  return (defElems ?? []).some((d: any) => d?.DefElem?.defname === name);
}

/** The statement's tokens that are keywords, in order. */
export function keywordTokens(stmt: Statement): Token[] {
  return stmt.tokens().filter((t) => t.keyword !== '');
}

/**
 * The statement text with `insert` placed right after the first keyword
 * sequence `after` (for example ["CREATE", "INDEX"] or ["CREATE", "UNIQUE", "INDEX"]).
 * Token positions come from PostgreSQL's scanner, so comments and strings cannot confuse it.
 */
export function insertAfterKeywords(stmt: Statement, after: string[], insert: string): string | undefined {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  for (let i = 0; i + after.length <= toks.length; i++) {
    let ok = true;
    for (let j = 0; j < after.length; j++) {
      if (toks[i + j].keyword !== after[j]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const last = toks[i + after.length - 1];
    const cut = byteToCharOffset(stmt.text, last.end - stmtStart);
    return `${stmt.text.slice(0, cut)} ${insert}${stmt.text.slice(cut)}`;
  }
  return undefined;
}

/** The statement text without the keyword sequence `remove` (and one surrounding space). */
export function removeKeywords(stmt: Statement, remove: string[]): string | undefined {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  for (let i = 0; i + remove.length <= toks.length; i++) {
    let ok = true;
    for (let j = 0; j < remove.length; j++) {
      if (toks[i + j].keyword !== remove[j]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const from = byteToCharOffset(stmt.text, toks[i].start - stmtStart);
    const to = byteToCharOffset(stmt.text, toks[i + remove.length - 1].end - stmtStart);
    const before = stmt.text.slice(0, from).replace(/\s+$/, ' ');
    const afterText = stmt.text.slice(to).replace(/^\s+/, '');
    return `${before}${afterText}`;
  }
  return undefined;
}

function byteToCharOffset(text: string, byteOffset: number): number {
  const buf = Buffer.from(text, 'utf8');
  return buf.subarray(0, Math.min(byteOffset, buf.length)).toString('utf8').length;
}

/**
 * The statement text with the tokens of a type name (`timestamp`, `timestamp(6)`,
 * `timestamp without time zone`, `varchar(20)`, `json`) replaced by `newType`.
 * `typeLocation` is the byte offset of the type's first token in the segment.
 */
export function replaceTypeTokens(stmt: Statement, typeLocation: number, newType: string): string | undefined {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  let i = toks.findIndex((t) => t.start === typeLocation);
  if (i < 0) return undefined;
  const first = toks[i];
  let last = first;
  i++;
  // Optional precision/length in parentheses.
  if (toks[i]?.text === '(') {
    while (i < toks.length && toks[i].text !== ')') i++;
    if (i >= toks.length) return undefined;
    last = toks[i];
    i++;
  }
  // Optional `with[out] time zone`.
  if (toks[i]?.keyword === 'WITH' || toks[i]?.keyword === 'WITHOUT') {
    if (toks[i + 1]?.keyword === 'TIME' && toks[i + 2]?.keyword === 'ZONE') {
      last = toks[i + 2];
      // consumed `with[out] time zone`
    }
  }
  // Array brackets stay as they are.
  const from = byteToCharOffset(stmt.text, first.start - stmtStart);
  const to = byteToCharOffset(stmt.text, last.end - stmtStart);
  return `${stmt.text.slice(0, from)}${newType}${stmt.text.slice(to)}`;
}

/** The statement text with the function-call tokens at `location` (`name(...)`) replaced. */
export function replaceCallTokens(stmt: Statement, location: number, newCall: string): string | undefined {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  let i = toks.findIndex((t) => t.start === location);
  if (i < 0) return undefined;
  const first = toks[i];
  i++;
  if (toks[i]?.text !== '(') return undefined;
  let depth = 0;
  for (; i < toks.length; i++) {
    if (toks[i].text === '(') depth++;
    if (toks[i].text === ')') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (i >= toks.length) return undefined;
  const from = byteToCharOffset(stmt.text, first.start - stmtStart);
  const to = byteToCharOffset(stmt.text, toks[i].end - stmtStart);
  return `${stmt.text.slice(0, from)}${newCall}${stmt.text.slice(to)}`;
}
