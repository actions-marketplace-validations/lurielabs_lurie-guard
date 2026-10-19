import { alterCmds, columnConstraints, typeInfo } from '../../../src/parser/ast.js';
import { ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

const SERIAL_TYPES = new Set(['serial', 'serial2', 'serial4', 'serial8', 'smallserial', 'bigserial']);

export const rule: Rule = {
  id: 'PG006',
  name: 'add-column-not-null-without-default',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'AlterTableStmt') return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const results: RuleResult[] = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== 'AT_AddColumn') continue;
      const col = cmd.def?.ColumnDef;
      if (!col) continue;
      const constraints = columnConstraints(col);
      const notNull = constraints.some((c) => c.contype === 'CONSTR_NOTNULL') || col.is_not_null === true;
      if (!notNull) continue;
      const hasValue = constraints.some(
        (c) => c.contype === 'CONSTR_DEFAULT' || c.contype === 'CONSTR_IDENTITY' || c.contype === 'CONSTR_GENERATED' || c.contype === 'CONSTR_PRIMARY',
      );
      if (hasValue) continue;
      const type = typeInfo(col.typeName);
      if (type && SERIAL_TYPES.has(type.name)) continue;
      const name = ident(col.colname);
      results.push({
        message:
          `\`ADD COLUMN ${name} ... NOT NULL\` without a default fails on any table that has rows: nothing fills the existing rows of \`${table}\`, so PostgreSQL rejects the statement with SQLSTATE \`23502\` and the migration aborts. ` +
          `Add it with a constant default (\`NOT NULL DEFAULT <constant>\`: metadata-only, no rewrite), or add it nullable, backfill in batches, then \`SET NOT NULL\` through a validated \`CHECK\` (PG007). ` +
          `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name,
        line: stmt.lineAt(col.location ?? 0),
        fix: {
          kind: 'block',
          text: `ALTER TABLE ${table} ADD COLUMN ${name} ${type?.display ?? 'type'} NOT NULL DEFAULT <constant>;\n-- or: add it nullable, backfill in batches, then the validated-CHECK path (PG007)`,
        },
      });
    }
    return results;
  },
};
