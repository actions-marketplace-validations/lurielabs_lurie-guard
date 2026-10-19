import { alterCmds, relName, typeInfo } from '../../../src/parser/ast.js';
import { ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG011',
  name: 'alter-column-type-rewrites',
  severity: 'warning',
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
      if (cmd.subtype !== 'AT_AlterColumnType' || typeof cmd.name !== 'string') continue;
      const col = ident(cmd.name);
      const def = cmd.def?.ColumnDef;
      const type = typeInfo(def?.typeName)?.display ?? 'the new type';
      const usingClause = def?.raw_default !== undefined;
      results.push({
        message:
          `\`ALTER COLUMN ${col} TYPE ${type}\` rewrites every row of \`${table}\` and rebuilds all its indexes under \`ACCESS EXCLUSIVE\` (\`pg_relation_filenode\` changes)${usingClause ? ', always, because it has a `USING` clause' : ', unless the current type is binary-coercible to the new one'}. ` +
          `Change the type with expand/contract: add a new column of type ${type}, dual-write, backfill in batches, switch reads, drop the old column in a later release. ` +
          `Not needed if \`${table}\` is new in this release or empty${usingClause ? '' : `, or if the current type is binary-coercible (varchar(n) to a larger or unbounded varchar or to text, numeric(p,s) to a larger p, timestamp(p) to a larger p): then suppress with a reason that names the current type`}.`,
        table,
        key: col,
        fix: {
          kind: 'block',
          text:
            `ALTER TABLE ${table} ADD COLUMN ${col}_new ${type};\n` +
            `-- dual-write ${col} and ${col}_new from the application; backfill in batches\n` +
            `-- switch reads to ${col}_new; then, in a later release:\n` +
            `ALTER TABLE ${table} DROP COLUMN ${col};\nALTER TABLE ${table} RENAME COLUMN ${col}_new TO ${col};`,
        },
      });
    }
    return results;
  },
};
