// Helpers shared by the rule detectors: volatility of default expressions,
// the per-framework transaction opt-out hints, and small formatting helpers.
import { alterCmds, columnConstraints, columnDefs, constraintKeys, funcName, tableConstraints } from './parser/ast.js';
import type { Framework, RuleContext, Statement } from './types.js';

/**
 * Built-in functions marked immutable or stable in PostgreSQL that commonly
 * appear in column defaults. A default whose function is not in this list is
 * treated as volatile (SPEC-MVP.md, PG005): `clock_timestamp()`, `random()`,
 * `gen_random_uuid()`, `uuidv7()`, `nextval()` and any user-defined function.
 */
const STABLE_OR_IMMUTABLE = new Set([
  'now',
  'transaction_timestamp',
  'statement_timestamp',
  'current_timestamp',
  'localtimestamp',
  'current_date',
  'current_time',
  'localtime',
  'current_user',
  'session_user',
  'current_role',
  'user',
  'current_schema',
  'current_setting',
  'current_database',
  'inet_client_addr',
  'inet_server_addr',
  'pg_backend_pid',
  'version',
  'lower',
  'upper',
  'initcap',
  'length',
  'char_length',
  'character_length',
  'octet_length',
  'trim',
  'btrim',
  'ltrim',
  'rtrim',
  'md5',
  'sha256',
  'concat',
  'concat_ws',
  'substr',
  'substring',
  'left',
  'right',
  'repeat',
  'replace',
  'split_part',
  'format',
  'to_char',
  'to_date',
  'to_timestamp',
  'to_number',
  'date_trunc',
  'date_part',
  'extract',
  'make_date',
  'make_time',
  'make_timestamp',
  'make_timestamptz',
  'make_interval',
  'age',
  'abs',
  'ceil',
  'ceiling',
  'floor',
  'round',
  'trunc',
  'sign',
  'mod',
  'power',
  'sqrt',
  'greatest',
  'least',
  'coalesce',
  'nullif',
  'num_nulls',
  'num_nonnulls',
  'array_length',
  'array_to_string',
  'string_to_array',
  'array_fill',
  'to_json',
  'to_jsonb',
  'json_build_object',
  'jsonb_build_object',
  'json_build_array',
  'jsonb_build_array',
  'row_to_json',
  'encode',
  'decode',
  'quote_ident',
  'quote_literal',
  'quote_nullable',
  'timezone',
  'pg_typeof',
  'text',
  'int4',
  'int8',
  'numeric',
  'bool',
  'date',
  'interval',
  'uuid',
]);

/** The first volatile function call in an expression, or undefined when none. */
export function volatileFunction(expr: unknown): string | undefined {
  if (!expr || typeof expr !== 'object') return undefined;
  const node = expr as Record<string, unknown>;
  if ('FuncCall' in node) {
    const name = funcName(node.FuncCall);
    if (name && !STABLE_OR_IMMUTABLE.has(name)) return name;
  }
  if ('SubLink' in node) return 'subquery';
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        const found = volatileFunction(v);
        if (found) return found;
      }
    } else if (value && typeof value === 'object') {
      const found = volatileFunction(value);
      if (found) return found;
    }
  }
  return undefined;
}

/** How a file opts out of the framework's transaction (SPEC-MVP.md, "Migration detection"). */
export function transactionOptOutHint(framework: Framework): string {
  switch (framework) {
    case 'flyway':
      return 'Flyway: create `<file>.sql.conf` next to the migration with `executeInTransaction=false`';
    case 'liquibase':
      return 'Liquibase: add `runInTransaction:false` to the `--changeset` line';
    case 'rails':
      return 'Rails: call `disable_ddl_transaction!` in the migration class';
    case 'django':
      return 'Django: set `atomic = False` on the `Migration` class';
    case 'alembic':
      return 'Alembic: run it inside `with op.get_context().autocommit_block():`';
    case 'prisma':
      return 'Prisma Migrate has no opt-out: run the statement outside Prisma, or build the index before the table has traffic';
    case 'dbmate':
      return 'dbmate: use `-- migrate:up transaction:false`';
    case 'sqitch':
      return 'Sqitch runs deploy scripts in a transaction: move the statement to a script your deploy runs outside Sqitch';
    case 'golang-migrate':
      return 'golang-migrate runs statements one by one: remove the explicit BEGIN/COMMIT';
    case 'sql':
      return 'run the file outside a transaction (your runner wraps files: `transaction: always` in `.lurie-guard.yml`)';
  }
}

/** Why the statement is inside a transaction, for PG003 and PG010 messages. */
export function transactionReason(stmt: Statement, ctx: RuleContext): { explicit: boolean; hint: string } {
  if (ctx.state.explicitTransaction) return { explicit: true, hint: 'move it outside the `BEGIN` ... `COMMIT` block' };
  return { explicit: false, hint: transactionOptOutHint(ctx.file.framework) };
}

/** Column name for messages: as written, with backticks escaped out. */
export function ident(name: string | undefined): string {
  return (name ?? '?').replace(/`/g, '');
}

export interface ColumnSite {
  /** The table, as written. */
  table: string;
  /** The table's RangeVar node, for the "new table" check. */
  relation: unknown;
  name: string;
  typeName: unknown;
  /** Column constraints (`{contype, ...}` objects). */
  constraints: Record<string, unknown>[];
  isPrimaryKey: boolean;
  /** Byte location of the column definition, for the finding's line. */
  location: number;
  /** Byte location of the type name, for suggested changes. */
  typeLocation: number;
  origin: 'create' | 'add' | 'alter-type';
}

/** The column definitions a statement introduces or retypes. */
export function columnSites(stmt: Statement, ctx: RuleContext): ColumnSite[] {
  const s = stmt.inner;
  const out: ColumnSite[] = [];
  if (stmt.kind === 'CreateStmt') {
    const table = ctx.tableName(s.relation);
    const pkCols = new Set<string>();
    for (const c of tableConstraints(s)) if (c.contype === 'CONSTR_PRIMARY') for (const k of constraintKeys(c)) pkCols.add(k.toLowerCase());
    for (const col of columnDefs(s)) {
      const constraints = columnConstraints(col);
      out.push({
        table,
        relation: s.relation,
        name: col.colname ?? '?',
        typeName: col.typeName,
        constraints,
        isPrimaryKey: constraints.some((c) => c.contype === 'CONSTR_PRIMARY') || pkCols.has(String(col.colname).toLowerCase()),
        location: col.location ?? 0,
        typeLocation: col.typeName?.location ?? col.location ?? 0,
        origin: 'create',
      });
    }
  } else if (stmt.kind === 'AlterTableStmt') {
    const table = ctx.tableName(s.relation);
    for (const cmd of alterCmds(s)) {
      const col = cmd.def?.ColumnDef;
      if (!col) continue;
      if (cmd.subtype === 'AT_AddColumn') {
        const constraints = columnConstraints(col);
        out.push({
          table,
          relation: s.relation,
          name: col.colname ?? '?',
          typeName: col.typeName,
          constraints,
          isPrimaryKey: constraints.some((c) => c.contype === 'CONSTR_PRIMARY'),
          location: col.location ?? 0,
          typeLocation: col.typeName?.location ?? col.location ?? 0,
          origin: 'add',
        });
      } else if (cmd.subtype === 'AT_AlterColumnType' && typeof cmd.name === 'string') {
        out.push({
          table,
          relation: s.relation,
          name: cmd.name,
          typeName: col.typeName,
          constraints: [],
          isPrimaryKey: false,
          location: col.typeName?.location ?? 0,
          typeLocation: col.typeName?.location ?? 0,
          origin: 'alter-type',
        });
      }
    }
  }
  return out;
}

/** The default expression of a column site, if any. */
export function defaultExpr(site: ColumnSite): unknown {
  return site.constraints.find((c) => c.contype === 'CONSTR_DEFAULT')?.raw_expr;
}
