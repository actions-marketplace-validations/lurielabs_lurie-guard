import { hasOption } from '../../../src/parser/ast.js';
import { transactionReason } from '../../../src/rules-support.js';
import type { Rule } from '../../../src/types.js';

function concurrentForm(stmt: { kind: string; inner: Record<string, unknown> }): string | undefined {
  const s = stmt.inner;
  if (stmt.kind === 'IndexStmt' && s.concurrent) return s.unique ? 'CREATE UNIQUE INDEX CONCURRENTLY' : 'CREATE INDEX CONCURRENTLY';
  if (stmt.kind === 'DropStmt' && s.removeType === 'OBJECT_INDEX' && s.concurrent) return 'DROP INDEX CONCURRENTLY';
  if (stmt.kind === 'ReindexStmt' && hasOption(s.params as unknown[], 'concurrently')) return 'REINDEX ... CONCURRENTLY';
  if (stmt.kind === 'RefreshMatViewStmt' && s.concurrent) return 'REFRESH MATERIALIZED VIEW CONCURRENTLY';
  return undefined;
}

export const rule: Rule = {
  id: 'PG003',
  name: 'concurrently-inside-transaction',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    const form = concurrentForm(stmt);
    if (!form) return;
    if (!ctx.inTransaction()) return;
    const { explicit, hint } = transactionReason(stmt, ctx);
    const where = explicit
      ? 'inside an explicit `BEGIN` block'
      : `in a file ${ctx.file.framework === 'sql' ? 'the runner' : ctx.file.framework} wraps in a transaction`;
    return {
      message:
        `\`${form}\` cannot run inside a transaction block: PostgreSQL rejects it with SQLSTATE \`25001\` and the migration fails. This statement runs ${where}. ` +
        `Fix: ${hint}. ` +
        `No exception: the statement never works inside a transaction.`,
    };
  },
};
