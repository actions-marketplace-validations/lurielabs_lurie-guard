import { insertAfterKeywords } from '../../../src/parser/ast.js';
import type { Rule } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG001',
  name: 'create-index-not-concurrently',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'IndexStmt') return;
    const s = stmt.inner;
    if (s.concurrent) return;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const unique = s.unique === true;
    const form = unique ? 'CREATE UNIQUE INDEX' : 'CREATE INDEX';
    const fixed = insertAfterKeywords(stmt, unique ? ['CREATE', 'UNIQUE', 'INDEX'] : ['CREATE', 'INDEX'], 'CONCURRENTLY');
    const example = fixed && fixed.length <= 120 && !fixed.includes('\n') ? `\`${fixed}\`` : `\`${form} CONCURRENTLY\``;
    return {
      message:
        `\`${form}\` holds a \`SHARE\` lock on \`${table}\` for the whole build; every insert, update and delete on \`${table}\` waits. ` +
        `Build it with ${example}, outside a transaction (PG003 checks that). ` +
        `Not needed if \`${table}\` is new in this release or empty.`,
      table,
      fix: fixed ? { kind: 'suggestion', text: fixed } : undefined,
    };
  },
};
