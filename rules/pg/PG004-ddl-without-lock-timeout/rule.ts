import { alterCmds, hasOption, qualifiedName, relName } from '../../../src/parser/ast.js';
import type { Rule, Statement, RuleContext } from '../../../src/types.js';

/** The statement's form and table when it takes a heavy lock on an existing table. */
function heavyLock(stmt: Statement, ctx: RuleContext): { form: string; table: string } | undefined {
  const s = stmt.inner;
  switch (stmt.kind) {
    case 'AlterTableStmt': {
      if (s.objtype && s.objtype !== 'OBJECT_TABLE') return undefined;
      const cmds = alterCmds(s);
      if (cmds.length === 0 || cmds.every((c) => c.subtype === 'AT_ValidateConstraint')) return undefined;
      if (ctx.isNewTable(s.relation)) return undefined;
      return { form: 'ALTER TABLE', table: ctx.tableName(s.relation) };
    }
    case 'DropStmt': {
      if (s.removeType === 'OBJECT_TABLE') {
        const names = (s.objects ?? []).map((o: { List?: { items?: unknown[] } }) => qualifiedName(o?.List?.items ?? []));
        const existing = names.filter((n: { key: string } | undefined) => n && !ctx.pr.newTables.has(n.key));
        if (existing.length === 0) return undefined;
        return { form: 'DROP TABLE', table: existing[0].display };
      }
      if (s.removeType === 'OBJECT_INDEX' && !s.concurrent) {
        const names = (s.objects ?? []).map((o: { List?: { items?: unknown[] } }) => qualifiedName(o?.List?.items ?? []));
        const existing = names.filter((n: { name: string } | undefined) => n && !ctx.isNewIndex(n.name));
        if (existing.length === 0) return undefined;
        return { form: 'DROP INDEX', table: `the table of ${existing[0].display}` };
      }
      return undefined;
    }
    case 'TruncateStmt': {
      const rels = (s.relations ?? []).map((r: { RangeVar?: unknown }) => r?.RangeVar).filter(Boolean);
      const existing = rels.filter((r: unknown) => !ctx.isNewTable(r));
      if (existing.length === 0) return undefined;
      return { form: 'TRUNCATE', table: ctx.tableName(existing[0]) };
    }
    case 'ClusterStmt': {
      if (!s.relation || ctx.isNewTable(s.relation)) return undefined;
      return { form: 'CLUSTER', table: ctx.tableName(s.relation) };
    }
    case 'RenameStmt': {
      // ALTER TABLE ... RENAME COLUMN / RENAME TO: ACCESS EXCLUSIVE like every ALTER TABLE form.
      const table = s.renameType === 'OBJECT_TABLE' || (s.renameType === 'OBJECT_COLUMN' && (!s.relationType || s.relationType === 'OBJECT_TABLE'));
      if (!table || !s.relation || ctx.isNewTable(s.relation)) return undefined;
      return { form: s.renameType === 'OBJECT_TABLE' ? 'ALTER TABLE ... RENAME TO' : 'ALTER TABLE ... RENAME COLUMN', table: ctx.tableName(s.relation) };
    }
    case 'VacuumStmt': {
      if (!s.is_vacuumcmd || !hasOption(s.options, 'full')) return undefined;
      const rels = (s.rels ?? []).map((r: { VacuumRelation?: { relation?: unknown } }) => r?.VacuumRelation?.relation).filter(Boolean);
      const existing = rels.filter((r: unknown) => !ctx.isNewTable(r));
      if (rels.length > 0 && existing.length === 0) return undefined;
      return { form: 'VACUUM FULL', table: rels.length ? ctx.tableName(existing[0]) : 'every table' };
    }
    case 'ReindexStmt': {
      if (hasOption(s.params, 'concurrently')) return undefined;
      const rv = relName(s.relation);
      if (!rv) return undefined;
      if (s.kind === 'REINDEX_OBJECT_INDEX' && ctx.isNewIndex(rv.name)) return undefined;
      if (s.kind === 'REINDEX_OBJECT_TABLE' && ctx.isNewTable(s.relation)) return undefined;
      return { form: 'REINDEX', table: s.kind === 'REINDEX_OBJECT_INDEX' ? `the table of ${rv.display}` : rv.display };
    }
    case 'RefreshMatViewStmt': {
      if (s.concurrent || !s.relation || ctx.isNewTable(s.relation)) return undefined;
      return { form: 'REFRESH MATERIALIZED VIEW', table: ctx.tableName(s.relation) };
    }
    case 'LockStmt': {
      // LOCK TABLE defaults to ACCESS EXCLUSIVE; modes 6 (SHARE ROW EXCLUSIVE) and above are the heavy ones.
      if (typeof s.mode === 'number' && s.mode < 6) return undefined;
      const rels = (s.relations ?? []).map((r: { RangeVar?: unknown }) => r?.RangeVar).filter(Boolean);
      const existing = rels.filter((r: unknown) => !ctx.isNewTable(r));
      if (existing.length === 0) return undefined;
      return { form: 'LOCK TABLE', table: ctx.tableName(existing[0]) };
    }
    default:
      return undefined;
  }
}

export const rule: Rule = {
  id: 'PG004',
  name: 'ddl-without-lock-timeout',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (ctx.config.lockTimeoutSetByRunner || ctx.state.lockTimeoutSet) return;
    const hit = heavyLock(stmt, ctx);
    if (!hit) return;
    const table = hit.table.startsWith('the table of') ? hit.table : `\`${hit.table}\``;
    return {
      message:
        `\`${hit.form}\` waits for a heavy lock (\`ACCESS EXCLUSIVE\` or \`SHARE ROW EXCLUSIVE\`) on ${table} with \`lock_timeout\` at its default of 0 (wait forever): it queues behind any long transaction, and every query that arrives after it queues behind the DDL. ` +
        `Run \`SET lock_timeout = '2s'\` (or \`SET LOCAL\` inside the transaction) before the first DDL and retry on SQLSTATE \`55P03\`. ` +
        `Not needed when your migration runner sets \`lock_timeout\` for every session: say so with \`lock_timeout_set_by_runner: true\` in \`.lurie-guard.yml\`.`,
      table: hit.table,
      fix: { kind: 'block', text: `SET lock_timeout = '2s';  -- a few seconds; retry the step on 55P03\n${stmt.text};` },
    };
  },
};
