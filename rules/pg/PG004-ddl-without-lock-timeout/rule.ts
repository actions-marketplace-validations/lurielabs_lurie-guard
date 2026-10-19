import { alterCmds, qualifiedName } from '../../../src/parser/ast.js';
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
