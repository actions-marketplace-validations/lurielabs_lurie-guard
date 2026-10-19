// Rails migrations: raw SQL from `execute` (strings and heredocs) and the DSL
// helpers of ADR 0008 mapped to their statements. Anything else the file does
// is listed as "not analyzed", never guessed.
import type { Node } from 'web-tree-sitter';
import type { NotAnalyzed, SqlSegment } from '../types.js';
import { hostParser } from './treesitter.js';

export interface HostExtraction {
  segments: SqlSegment[];
  notAnalyzed: NotAnalyzed[];
  comments: { line: number; text: string }[];
  /** The file opts out of the framework's transaction. */
  transactionOptOut: boolean;
}

type Value =
  | { t: 'symbol'; v: string }
  | { t: 'string'; v: string }
  | { t: 'int'; v: number }
  | { t: 'float'; v: number }
  | { t: 'bool'; v: boolean }
  | { t: 'nil' }
  | { t: 'array'; v: Value[] }
  | { t: 'hash'; v: Map<string, Value> }
  | { t: 'lambda'; v: string }
  | { t: 'unknown'; text: string };

const DSL = new Set([
  'execute',
  'add_index',
  'add_column',
  'add_foreign_key',
  'change_column_null',
  'change_column',
  'create_table',
  'drop_table',
  'remove_column',
  'rename_column',
  'rename_table',
  'disable_ddl_transaction!',
]);

/** Other Active Record schema statements, listed as not analyzed when they appear. */
const KNOWN_OTHER = new Set([
  'remove_index',
  'add_reference',
  'add_belongs_to',
  'remove_reference',
  'remove_belongs_to',
  'add_timestamps',
  'remove_timestamps',
  'change_column_default',
  'change_column_comment',
  'change_table',
  'create_join_table',
  'drop_join_table',
  'add_check_constraint',
  'remove_check_constraint',
  'remove_foreign_key',
  'validate_constraint',
  'validate_foreign_key',
  'validate_check_constraint',
  'add_exclusion_constraint',
  'add_unique_constraint',
  'create_enum',
  'enable_extension',
  'disable_extension',
  'reversible',
  'safety_assured',
]);

// Rails PostgreSQL adapter native types (activerecord postgresql_adapter.rb NATIVE_DATABASE_TYPES).
const RAILS_TYPES: Record<string, string> = {
  string: 'varchar',
  text: 'text',
  integer: 'integer',
  bigint: 'bigint',
  float: 'float',
  decimal: 'numeric',
  numeric: 'numeric',
  datetime: 'timestamp',
  timestamp: 'timestamp',
  timestamptz: 'timestamptz',
  time: 'time',
  date: 'date',
  binary: 'bytea',
  boolean: 'boolean',
  uuid: 'uuid',
  json: 'json',
  jsonb: 'jsonb',
  inet: 'inet',
  cidr: 'cidr',
  macaddr: 'macaddr',
  hstore: 'hstore',
  citext: 'citext',
  interval: 'interval',
  money: 'money',
  xml: 'xml',
  tsvector: 'tsvector',
  ltree: 'ltree',
  point: 'point',
  bit: 'bit',
  bit_varying: 'bit varying',
  oid: 'oid',
  daterange: 'daterange',
  tsrange: 'tsrange',
  tstzrange: 'tstzrange',
  int4range: 'int4range',
  int8range: 'int8range',
  numrange: 'numrange',
};

function ident(name: string): string {
  return /^[a-z_][a-z0-9_]*$/.test(name) ? name : `"${name.replace(/"/g, '""')}"`;
}

function literal(v: Value): string | undefined {
  switch (v.t) {
    case 'string':
      return `'${v.v.replace(/'/g, "''")}'`;
    case 'int':
    case 'float':
      return String(v.v);
    case 'bool':
      return v.v ? 'true' : 'false';
    case 'lambda':
      return v.v;
    case 'nil':
      return 'NULL';
    default:
      return undefined;
  }
}

function singularize(table: string): string {
  if (/ies$/.test(table)) return table.replace(/ies$/, 'y');
  if (/(ses|xes|zes|ches|shes)$/.test(table)) return table.replace(/es$/, '');
  if (/s$/.test(table) && !/ss$/.test(table)) return table.replace(/s$/, '');
  return table;
}

function parseValue(n: Node): Value {
  switch (n.type) {
    case 'simple_symbol':
      return { t: 'symbol', v: n.text.replace(/^:/, '').replace(/^"(.*)"$/, '$1') };
    case 'string': {
      const parts = n.namedChildren;
      if (parts.some((c) => c && c.type !== 'string_content')) return { t: 'unknown', text: n.text };
      return { t: 'string', v: parts.map((c) => c?.text ?? '').join('') };
    }
    case 'integer':
      return { t: 'int', v: Number(n.text.replace(/_/g, '')) };
    case 'float':
      return { t: 'float', v: Number(n.text.replace(/_/g, '')) };
    case 'true':
      return { t: 'bool', v: true };
    case 'false':
      return { t: 'bool', v: false };
    case 'nil':
      return { t: 'nil' };
    case 'array':
      return { t: 'array', v: n.namedChildren.filter((c): c is Node => c !== null).map(parseValue) };
    case 'hash': {
      const m = new Map<string, Value>();
      for (const c of n.namedChildren) {
        if (!c || c.type !== 'pair') return { t: 'unknown', text: n.text };
        const kv = parsePair(c);
        if (!kv) return { t: 'unknown', text: n.text };
        m.set(kv[0], kv[1]);
      }
      return { t: 'hash', v: m };
    }
    case 'lambda': {
      // -> { "now()" }: the body (a block, then a block_body) holds one string literal with the SQL expression.
      let body: Node | null = n.childForFieldName('body');
      while (body && body.type !== 'string') {
        const inner = body.namedChildren.filter((c): c is Node => c !== null);
        body = inner.length === 1 ? inner[0] : null;
      }
      if (body) {
        const s = parseValue(body);
        if (s.t === 'string') return { t: 'lambda', v: s.v };
      }
      return { t: 'unknown', text: n.text };
    }
    case 'parenthesized_statements': {
      const inner = n.namedChildren.filter((c): c is Node => c !== null);
      return inner.length === 1 ? parseValue(inner[0]) : { t: 'unknown', text: n.text };
    }
    default:
      return { t: 'unknown', text: n.text };
  }
}

function parsePair(pair: Node): [string, Value] | undefined {
  const key = pair.childForFieldName('key');
  const value = pair.childForFieldName('value');
  if (!key || !value) return undefined;
  if (key.type !== 'hash_key_symbol' && key.type !== 'simple_symbol') return undefined;
  return [key.text.replace(/^:/, '').replace(/:$/, ''), parseValue(value)];
}

interface Args {
  positional: Value[];
  options: Map<string, Value>;
  heredoc?: Node;
}

function parseArgs(list: Node | null, call: Node): Args | undefined {
  const args: Args = { positional: [], options: new Map() };
  if (!list) return args;
  for (const c of list.namedChildren) {
    if (!c) continue;
    if (c.type === 'pair') {
      const kv = parsePair(c);
      if (!kv) return undefined;
      args.options.set(kv[0], kv[1]);
    } else if (c.type === 'hash' && c === list.namedChildren[list.namedChildren.length - 1]) {
      const h = parseValue(c);
      if (h.t !== 'hash') return undefined;
      for (const [k, v] of h.v) args.options.set(k, v);
    } else if (c.type === 'heredoc_beginning') {
      // The body is a later sibling of the call in its statement list.
      let sib: Node | null = call.nextNamedSibling;
      while (sib && sib.type !== 'heredoc_body') sib = sib.nextNamedSibling;
      if (!sib) return undefined;
      args.heredoc = sib;
    } else {
      args.positional.push(parseValue(c));
    }
  }
  return args;
}

function sym(v: Value | undefined): string | undefined {
  if (!v) return undefined;
  if (v.t === 'symbol' || v.t === 'string') return v.v;
  return undefined;
}

function columnList(v: Value | undefined): string[] | undefined {
  if (!v) return undefined;
  if (v.t === 'symbol' || v.t === 'string') return [v.v];
  if (v.t === 'array') {
    const out: string[] = [];
    for (const e of v.v) {
      const s = sym(e);
      if (s === undefined) return undefined;
      out.push(s);
    }
    return out;
  }
  return undefined;
}

function railsType(type: string, options: Map<string, Value>): string | undefined {
  const base = RAILS_TYPES[type];
  if (!base) return undefined;
  const limit = options.get('limit');
  const precision = options.get('precision');
  const scale = options.get('scale');
  let sql: string;
  switch (type) {
    case 'string':
      sql = limit?.t === 'int' ? `varchar(${limit.v})` : 'varchar';
      break;
    case 'integer':
      if (limit?.t === 'int') sql = limit.v <= 2 ? 'smallint' : limit.v <= 4 ? 'integer' : 'bigint';
      else sql = 'integer';
      break;
    case 'datetime':
      sql = precision?.t === 'int' ? `timestamp(${precision.v})` : precision?.t === 'nil' ? 'timestamp' : 'timestamp(6)';
      break;
    case 'timestamp':
    case 'timestamptz':
    case 'time':
      sql = precision?.t === 'int' ? `${base}(${precision.v})` : base;
      break;
    case 'decimal':
    case 'numeric':
      if (precision?.t === 'int') sql = scale?.t === 'int' ? `numeric(${precision.v}, ${scale.v})` : `numeric(${precision.v})`;
      else sql = 'numeric';
      break;
    default:
      sql = base;
  }
  const array = options.get('array');
  if (array?.t === 'bool' && array.v) sql += '[]';
  return sql;
}

const COLUMN_OPTIONS = new Set(['null', 'default', 'limit', 'precision', 'scale', 'array', 'comment', 'if_not_exists', 'collation']);
const INDEX_OPTIONS = new Set(['unique', 'algorithm', 'name', 'if_not_exists', 'using', 'where', 'include', 'comment', 'order', 'opclass', 'nulls_not_distinct']);
const FK_OPTIONS = new Set(['column', 'primary_key', 'name', 'validate', 'on_delete', 'on_update', 'deferrable', 'if_not_exists', 'to_table']);

/** Maps one DSL call to SQL, or returns a reason it could not. */
function mapCall(method: string, args: Args): { sql?: string; reason?: string } {
  const p = args.positional;
  const o = args.options;
  const unknownOption = (allowed: Set<string>): string | undefined => {
    for (const k of o.keys()) if (!allowed.has(k)) return `option \`${k}:\` is not mapped`;
    return undefined;
  };
  switch (method) {
    case 'add_index': {
      const table = sym(p[0]);
      const cols = columnList(p[1]);
      if (!table || !cols) return { reason: 'table or columns are not literals' };
      const bad = unknownOption(INDEX_OPTIONS);
      if (bad) return { reason: bad };
      const unique = o.get('unique');
      const algorithm = o.get('algorithm');
      const name = o.get('name');
      const ine = o.get('if_not_exists');
      const using = o.get('using');
      const where = o.get('where');
      const include = columnList(o.get('include'));
      if (algorithm && !(algorithm.t === 'symbol' && algorithm.v === 'concurrently') && !(algorithm.t === 'symbol' && algorithm.v === 'default'))
        return { reason: `algorithm: ${literalText(algorithm)} is not mapped` };
      if (where && where.t !== 'string') return { reason: 'where: is not a string' };
      const indexName = name && (name.t === 'string' || name.t === 'symbol') ? name.v : `index_${table}_on_${cols.join('_and_')}`;
      return {
        sql:
          `CREATE ${unique?.t === 'bool' && unique.v ? 'UNIQUE ' : ''}INDEX ` +
          `${algorithm?.t === 'symbol' && algorithm.v === 'concurrently' ? 'CONCURRENTLY ' : ''}` +
          `${ine?.t === 'bool' && ine.v ? 'IF NOT EXISTS ' : ''}` +
          `${ident(indexName)} ON ${ident(table)}` +
          `${using && sym(using) ? ` USING ${sym(using)}` : ''}` +
          ` (${cols.map(ident).join(', ')})` +
          `${include ? ` INCLUDE (${include.map(ident).join(', ')})` : ''}` +
          `${where && where.t === 'string' ? ` WHERE ${where.v}` : ''}`,
      };
    }
    case 'add_column': {
      const table = sym(p[0]);
      const col = sym(p[1]);
      const type = sym(p[2]);
      if (!table || !col || !type) return { reason: 'table, column or type are not literals' };
      const bad = unknownOption(COLUMN_OPTIONS);
      if (bad) return { reason: bad };
      const sqlType = railsType(type, o);
      if (!sqlType) return { reason: `type :${type} is not mapped` };
      const nul = o.get('null');
      const def = o.get('default');
      const ine = o.get('if_not_exists');
      let sql = `ALTER TABLE ${ident(table)} ADD COLUMN ${ine?.t === 'bool' && ine.v ? 'IF NOT EXISTS ' : ''}${ident(col)} ${sqlType}`;
      if (def !== undefined && def.t !== 'nil') {
        const lit = literal(def);
        if (lit === undefined) return { reason: 'default: is not a literal or a lambda with an SQL string' };
        sql += ` DEFAULT ${lit}`;
      }
      if (nul?.t === 'bool' && !nul.v) sql += ' NOT NULL';
      return { sql };
    }
    case 'add_foreign_key': {
      const from = sym(p[0]);
      const to = sym(p[1]);
      if (!from || !to) return { reason: 'tables are not literals' };
      const bad = unknownOption(FK_OPTIONS);
      if (bad) return { reason: bad };
      const column = sym(o.get('column')) ?? `${singularize(to)}_id`;
      const pk = sym(o.get('primary_key')) ?? 'id';
      const name = sym(o.get('name')) ?? `fk_rails_${from}_${column}`;
      const validate = o.get('validate');
      const onDelete = sym(o.get('on_delete'));
      const onUpdate = sym(o.get('on_update'));
      const actions: Record<string, string> = { cascade: 'CASCADE', nullify: 'SET NULL', restrict: 'RESTRICT' };
      let sql = `ALTER TABLE ${ident(from)} ADD CONSTRAINT ${ident(name)} FOREIGN KEY (${ident(column)}) REFERENCES ${ident(to)} (${ident(pk)})`;
      if (onDelete) {
        if (!actions[onDelete]) return { reason: `on_delete: :${onDelete} is not mapped` };
        sql += ` ON DELETE ${actions[onDelete]}`;
      }
      if (onUpdate) {
        if (!actions[onUpdate]) return { reason: `on_update: :${onUpdate} is not mapped` };
        sql += ` ON UPDATE ${actions[onUpdate]}`;
      }
      const deferrable = o.get('deferrable');
      if (deferrable?.t === 'bool' && deferrable.v) sql += ' DEFERRABLE';
      else if (deferrable?.t === 'symbol') sql += ` DEFERRABLE INITIALLY ${deferrable.v.toUpperCase()}`;
      if (validate?.t === 'bool' && !validate.v) sql += ' NOT VALID';
      return { sql };
    }
    case 'change_column_null': {
      const table = sym(p[0]);
      const col = sym(p[1]);
      const nul = p[2];
      if (!table || !col || !nul || nul.t !== 'bool') return { reason: 'arguments are not literals' };
      return { sql: `ALTER TABLE ${ident(table)} ALTER COLUMN ${ident(col)} ${nul.v ? 'DROP NOT NULL' : 'SET NOT NULL'}` };
    }
    case 'change_column': {
      const table = sym(p[0]);
      const col = sym(p[1]);
      const type = sym(p[2]);
      if (!table || !col || !type) return { reason: 'table, column or type are not literals' };
      const bad = unknownOption(COLUMN_OPTIONS);
      if (bad) return { reason: bad };
      const sqlType = railsType(type, o);
      if (!sqlType) return { reason: `type :${type} is not mapped` };
      const cmds = [`ALTER COLUMN ${ident(col)} TYPE ${sqlType}`];
      const def = o.get('default');
      if (def !== undefined) {
        const lit = def.t === 'nil' ? undefined : literal(def);
        cmds.push(lit === undefined ? `ALTER COLUMN ${ident(col)} DROP DEFAULT` : `ALTER COLUMN ${ident(col)} SET DEFAULT ${lit}`);
      }
      const nul = o.get('null');
      if (nul?.t === 'bool') cmds.push(`ALTER COLUMN ${ident(col)} ${nul.v ? 'DROP NOT NULL' : 'SET NOT NULL'}`);
      return { sql: `ALTER TABLE ${ident(table)} ${cmds.join(', ')}` };
    }
    case 'create_table': {
      const table = sym(p[0]);
      if (!table) return { reason: 'table is not a literal' };
      // Registers the new table for the "existing table" exemption; the columns are not analyzed (ADR 0008).
      return { sql: `CREATE TABLE ${ident(table)} ()` };
    }
    case 'drop_table': {
      const table = sym(p[0]);
      if (!table) return { reason: 'table is not a literal' };
      return { sql: `DROP TABLE ${ident(table)}` };
    }
    case 'remove_column': {
      const table = sym(p[0]);
      const col = sym(p[1]);
      if (!table || !col) return { reason: 'table or column are not literals' };
      return { sql: `ALTER TABLE ${ident(table)} DROP COLUMN ${ident(col)}` };
    }
    case 'rename_column': {
      const table = sym(p[0]);
      const from = sym(p[1]);
      const to = sym(p[2]);
      if (!table || !from || !to) return { reason: 'arguments are not literals' };
      return { sql: `ALTER TABLE ${ident(table)} RENAME COLUMN ${ident(from)} TO ${ident(to)}` };
    }
    case 'rename_table': {
      const from = sym(p[0]);
      const to = sym(p[1]);
      if (!from || !to) return { reason: 'arguments are not literals' };
      return { sql: `ALTER TABLE ${ident(from)} RENAME TO ${ident(to)}` };
    }
    default:
      return { reason: 'not mapped' };
  }
}

function literalText(v: Value): string {
  return v.t === 'unknown' ? v.text : v.t === 'symbol' ? `:${v.v}` : v.t === 'string' ? `"${v.v}"` : JSON.stringify('v' in v ? v.v : null);
}

export async function extractRuby(content: string): Promise<HostExtraction> {
  const parser = await hostParser('ruby');
  const tree = parser.parse(content);
  const out: HostExtraction = { segments: [], notAnalyzed: [], comments: [], transactionOptOut: false };
  if (!tree) return out;
  const visit = (n: Node): void => {
    if (n.type === 'comment') {
      out.comments.push({ line: n.startPosition.row + 1, text: n.text.replace(/^#/, '') });
      return;
    }
    if (n.type === 'call' || n.type === 'identifier') {
      const method = n.type === 'call' ? n.childForFieldName('method') : n;
      const receiver = n.type === 'call' ? n.childForFieldName('receiver') : null;
      const name = method?.type === 'identifier' ? method.text : undefined;
      if (name && !receiver) {
        if (name === 'disable_ddl_transaction!') {
          out.transactionOptOut = true;
          return;
        }
        if (DSL.has(name)) {
          handleCall(n, name, out);
          // create_table: the block's `t.column` calls are not analyzed, but a nested
          // execute/add_index inside it would be; everything else stops here.
          const block = n.type === 'call' ? n.childForFieldName('block') : null;
          if (name === 'create_table' && block) visit(block);
          return;
        } else if (KNOWN_OTHER.has(name) && n.type === 'call') {
          out.notAnalyzed.push({ line: n.startPosition.row + 1, reason: `\`${name}\` is not mapped in this release (ADR 0008)` });
          return;
        }
      }
    }
    for (const c of n.namedChildren) if (c) visit(c);
  };
  visit(tree.rootNode);
  out.segments.sort((a, b) => a.line - b.line);
  return out;
}

function handleCall(n: Node, name: string, out: HostExtraction): void {
  const line = n.startPosition.row + 1;
  const argList = n.type === 'call' ? n.childForFieldName('arguments') : null;
  const args = parseArgs(argList, n);
  if (!args) {
    out.notAnalyzed.push({ line, reason: `\`${name}\`: arguments are not literals` });
    return;
  }
  if (name === 'execute') {
    if (args.heredoc) {
      const body = args.heredoc.namedChildren.find((c) => c?.type === 'heredoc_content');
      if (!body) {
        out.notAnalyzed.push({ line, reason: '`execute`: heredoc with interpolation' });
        return;
      }
      if (args.heredoc.namedChildren.some((c) => c && c.type === 'interpolation')) {
        out.notAnalyzed.push({ line, reason: '`execute`: heredoc with interpolation' });
        return;
      }
      // The content starts with the newline that ends the `<<~SQL` line; the SQL begins on the next line.
      const leadingNewline = body.text.startsWith('\n') ? 1 : 0;
      out.segments.push({ sql: body.text.slice(leadingNewline), line: body.startPosition.row + 1 + leadingNewline });
      return;
    }
    const first = args.positional[0];
    if (first?.t === 'string') {
      const strNode = argList?.namedChildren.find((c) => c?.type === 'string');
      const contentNode = strNode?.namedChildren.find((c) => c?.type === 'string_content');
      out.segments.push({ sql: first.v, line: (contentNode ?? strNode ?? n).startPosition.row + 1 });
      return;
    }
    out.notAnalyzed.push({ line, reason: '`execute`: argument is not a plain string or heredoc' });
    return;
  }
  const mapped = mapCall(name, args);
  if (mapped.sql) out.segments.push({ sql: mapped.sql, line, synthesized: { call: name } });
  else out.notAnalyzed.push({ line, reason: `\`${name}\`: ${mapped.reason}` });
}
