import { alterCmds, constraintKeys, relName } from '../../../src/parser/ast.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG012',
  name: 'unique-or-pk-without-using-index',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'AlterTableStmt') return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const results: RuleResult[] = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== 'AT_AddConstraint') continue;
      const c = cmd.def?.Constraint;
      if (!c || (c.contype !== 'CONSTR_UNIQUE' && c.contype !== 'CONSTR_PRIMARY') || c.indexname) continue;
      const pk = c.contype === 'CONSTR_PRIMARY';
      const cols = constraintKeys(c);
      const form = pk ? 'ADD PRIMARY KEY' : 'ADD UNIQUE';
      const name: string = c.conname ?? `${rv.name}_${cols.join('_')}_${pk ? 'pkey' : 'key'}`;
      const idx = pk ? `${rv.name}_${cols.join('_')}_pkey_idx` : `${name}_idx`;
      results.push({
        message:
          `\`${form}\` builds the unique index itself while it holds \`ACCESS EXCLUSIVE\` on \`${table}\` (plus the build's \`SHARE\`): it scans the table and every read and write waits for the whole build. ` +
          `Build the index first with \`CREATE UNIQUE INDEX CONCURRENTLY ${idx} ON ${table} (${cols.join(', ')})\`, then \`ALTER TABLE ${table} ADD CONSTRAINT ${name} ${pk ? 'PRIMARY KEY' : 'UNIQUE'} USING INDEX ${idx}\`, a catalog change${pk ? ' (the key columns must already be NOT NULL: PG007)' : ''}. ` +
          `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name,
        fix: {
          kind: 'block',
          text:
            `CREATE UNIQUE INDEX CONCURRENTLY ${idx} ON ${table} (${cols.join(', ')});  -- outside a transaction\n` +
            `ALTER TABLE ${table} ADD CONSTRAINT ${name} ${pk ? 'PRIMARY KEY' : 'UNIQUE'} USING INDEX ${idx};`,
        },
      });
    }
    return results;
  },
};
