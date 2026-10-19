import { hasOption, relName } from '../../../src/parser/ast.js';
import type { Rule } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG015',
  name: 'vacuum-full-or-cluster',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    const s = stmt.inner;
    switch (stmt.kind) {
      case 'VacuumStmt': {
        if (!s.is_vacuumcmd || !hasOption(s.options, 'full')) return;
        const rels = (s.rels ?? []).map((r: { VacuumRelation?: { relation?: unknown } }) => r?.VacuumRelation?.relation).filter(Boolean);
        const existing = rels.filter((r: unknown) => !ctx.isNewTable(r));
        if (rels.length > 0 && existing.length === 0) return;
        const table = rels.length === 0 ? 'every table in the database' : `\`${ctx.tableName(existing[0])}\``;
        return {
          message:
            `\`VACUUM FULL\` rewrites ${table} into a new file under \`ACCESS EXCLUSIVE\`: it queues behind every running query, every query that arrives after it waits for the whole rewrite, and the copy needs the table's size again in free disk. ` +
            `Plain \`VACUUM\` reclaims space online; for bloated indexes use \`REINDEX INDEX CONCURRENTLY\`; to shrink a table online use pg_repack or a copy-and-swap in a maintenance window. ` +
            `Not needed in an agreed maintenance window with traffic stopped: suppress with the reason naming it.`,
          table: rels.length ? ctx.tableName(existing[0]) : undefined,
          fix: { kind: 'block', text: rels.length ? `VACUUM (ANALYZE) ${ctx.tableName(existing[0])};` : 'VACUUM (ANALYZE);' },
        };
      }
      case 'ClusterStmt': {
        if (!s.relation || ctx.isNewTable(s.relation)) return;
        const table = ctx.tableName(s.relation);
        return {
          message:
            `\`CLUSTER\` rewrites \`${table}\` and rebuilds its indexes under \`ACCESS EXCLUSIVE\` (plus \`SHARE\` for the rebuild) until the transaction commits: reads and writes wait for the whole rewrite, and it needs the table's size again in free disk. ` +
            `Reclaim space with plain \`VACUUM\` and rebuild indexes with \`REINDEX INDEX CONCURRENTLY\`; if physical order matters, use pg_repack or a maintenance window. ` +
            `Not needed in an agreed maintenance window with traffic stopped: suppress with the reason naming it.`,
          table,
        };
      }
      case 'ReindexStmt': {
        if (hasOption(s.params, 'concurrently')) return;
        const rv = relName(s.relation);
        if (!rv) return;
        const kind: string = s.kind;
        if (kind === 'REINDEX_OBJECT_INDEX' && ctx.isNewIndex(rv.name)) return;
        if (kind === 'REINDEX_OBJECT_TABLE' && ctx.isNewTable(s.relation)) return;
        const what = kind === 'REINDEX_OBJECT_INDEX' ? `index \`${rv.display}\`` : kind === 'REINDEX_OBJECT_TABLE' ? `every index of \`${rv.display}\`` : `\`${rv.display}\``;
        const lockText =
          kind === 'REINDEX_OBJECT_INDEX'
            ? `holds \`SHARE\` on the table (every write waits) and \`ACCESS EXCLUSIVE\` on the index (every read that uses it waits)`
            : `holds \`SHARE\` on the table (every write waits) and \`ACCESS EXCLUSIVE\` on each index while it is rebuilt`;
        const fixed = stmt.text.replace(/^(REINDEX\s+(?:\(.*?\)\s+)?(?:INDEX|TABLE|SCHEMA|DATABASE|SYSTEM)\s+)/i, '$1CONCURRENTLY ');
        return {
          message:
            `\`REINDEX\` without \`CONCURRENTLY\` rebuilds ${what} while it ${lockText}, for the whole rebuild. ` +
            `Use \`REINDEX ${kind === 'REINDEX_OBJECT_TABLE' ? 'TABLE' : 'INDEX'} CONCURRENTLY ${rv.display}\`, outside a transaction (PG003 checks that). ` +
            `Not needed if the index was created in this release.`,
          table: rv.display,
          fix: { kind: fixed !== stmt.text ? 'suggestion' : 'block', text: fixed },
        };
      }
      case 'RefreshMatViewStmt': {
        if (s.concurrent || ctx.isNewTable(s.relation)) return;
        const view = ctx.tableName(s.relation);
        return {
          message:
            `\`REFRESH MATERIALIZED VIEW\` without \`CONCURRENTLY\` takes \`ACCESS EXCLUSIVE\` on \`${view}\` for the whole refresh: every read of the view waits. ` +
            `Use \`REFRESH MATERIALIZED VIEW CONCURRENTLY ${view}\`, which needs a unique index on the view and lets reads continue. ` +
            `Not needed if \`${view}\` is new in this release or nothing reads it yet.`,
          table: view,
          fix: { kind: 'suggestion', text: stmt.text.replace(/^(REFRESH\s+MATERIALIZED\s+VIEW\s+)/i, '$1CONCURRENTLY ') },
        };
      }
      default:
        return;
    }
  },
};
