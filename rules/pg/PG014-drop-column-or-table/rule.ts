import { alterCmds, qualifiedName } from '../../../src/parser/ast.js';
import { ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG014',
  name: 'drop-column-or-table',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind === 'DropStmt') {
      const s = stmt.inner;
      if (s.removeType !== 'OBJECT_TABLE') return;
      const existing = (s.objects ?? [])
        .map((obj: { List?: { items?: unknown[] } }) => qualifiedName(obj?.List?.items ?? []))
        .filter((q: { key: string } | undefined) => q && !ctx.pr.newTables.has(q.key));
      if (existing.length === 0) return;
      const names = existing.map((q: { display: string }) => `\`${q.display}\``).join(', ');
      const first = existing[0];
      return {
        message:
          `\`DROP TABLE\` of ${names} is irreversible and fails every query of the running release that still uses the table the moment it commits. ` +
          `Drop it in the release after the last one that reads it, and keep a backup or a rename (\`ALTER TABLE ${first.display} RENAME TO ${first.name}_dropped\`) until that release is out. ` +
          `Not needed if the table is new in this release; otherwise suppress with the reason naming the release that stopped using it.`,
        table: first.display,
      };
    }
    if (stmt.kind !== 'AlterTableStmt') return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const results: RuleResult[] = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== 'AT_DropColumn' || typeof cmd.name !== 'string') continue;
      const col = ident(cmd.name);
      results.push({
        message:
          `\`DROP COLUMN ${col}\` fails every query of the running release that still reads or writes \`${table}.${col}\` the moment it commits, and the data is gone. ` +
          `Drop it in the release after the last one that reads it (expand/contract): stop reading, deploy, then drop. ` +
          `Not needed if \`${table}\` is new in this release; otherwise suppress with the reason naming the release that stopped reading \`${col}\`.`,
        table,
        key: col,
      });
    }
    return results;
  },
};
