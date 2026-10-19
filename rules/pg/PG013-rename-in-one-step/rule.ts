import { ident } from '../../../src/rules-support.js';
import type { Rule } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG013',
  name: 'rename-in-one-step',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'RenameStmt') return;
    const s = stmt.inner;
    if (s.renameType !== 'OBJECT_COLUMN' && s.renameType !== 'OBJECT_TABLE') return;
    if (s.renameType === 'OBJECT_COLUMN' && s.relationType && s.relationType !== 'OBJECT_TABLE') return;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const to = ident(s.newname);
    if (s.renameType === 'OBJECT_COLUMN') {
      const from = ident(s.subname);
      return {
        message:
          `\`RENAME COLUMN ${from} TO ${to}\` breaks every query of the running release that reads or writes \`${table}.${from}\` the moment it commits, and the old release keeps serving until the deploy finishes. ` +
          `Use expand/contract: add \`${to}\`, dual-write both columns, backfill, switch reads to \`${to}\`, then drop \`${from}\` in a later release. ` +
          `Not needed if \`${table}\` is new in this release, or if no running code reads \`${from}\`: suppress with the reason naming that release.`,
        table,
        key: from,
      };
    }
    return {
      message:
        `\`RENAME TO ${to}\` breaks every query of the running release that uses \`${table}\` the moment it commits. ` +
        `Use expand/contract: create \`${to}\` (or a view named \`${to}\` over \`${table}\`), switch the application, then drop the old name in a later release. ` +
        `Not needed if \`${table}\` is new in this release, or if no running code uses it: suppress with the reason naming that release.`,
      table,
    };
  },
};
