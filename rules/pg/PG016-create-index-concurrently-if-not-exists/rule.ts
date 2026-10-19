import { removeKeywords } from '../../../src/parser/ast.js';
import type { Rule } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG016',
  name: 'create-index-concurrently-if-not-exists',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'IndexStmt') return;
    const s = stmt.inner;
    if (!s.concurrent || !s.if_not_exists) return;
    const table = ctx.tableName(s.relation);
    const name: string = s.idxname ?? 'the index';
    const without = removeKeywords(stmt, ['IF', 'NOT', 'EXISTS']);
    const fixed = without ? `DROP INDEX CONCURRENTLY IF EXISTS ${name};\n${without}` : undefined;
    return {
      message:
        `\`CREATE INDEX CONCURRENTLY IF NOT EXISTS\` skips the build when a previous concurrent build of \`${name}\` failed and left it \`INVALID\`: the index exists by name, so nothing is rebuilt, writes keep maintaining it and queries on \`${table}\` never use it. ` +
        `Recover a failed build with \`DROP INDEX CONCURRENTLY IF EXISTS ${name}\` and then \`CREATE INDEX CONCURRENTLY\` again (or \`REINDEX INDEX CONCURRENTLY\`), without \`IF NOT EXISTS\`. ` +
        `Not needed if the migration runner never retries a failed step; then \`IF NOT EXISTS\` only hides the invalid index.`,
      table,
      key: name,
      fix: fixed ? { kind: 'suggestion', text: fixed } : undefined,
    };
  },
};
