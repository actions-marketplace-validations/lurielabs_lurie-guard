import { insertAfterKeywords, qualifiedName } from '../../../src/parser/ast.js';
import type { Rule } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG002',
  name: 'drop-index-not-concurrently',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'DropStmt') return;
    const s = stmt.inner;
    if (s.removeType !== 'OBJECT_INDEX' || s.concurrent) return;
    const names = (s.objects ?? []).map((o: { List?: { items?: unknown[] } }) => qualifiedName(o?.List?.items ?? [])).filter(Boolean);
    const existing = names.filter((n: { name: string }) => !ctx.isNewIndex(n.name));
    if (existing.length === 0) return;
    const list = existing.map((n: { display: string }) => `\`${n.display}\``).join(', ');
    const single = existing.length === 1 && names.length === 1;
    const fixed = single ? insertAfterKeywords(stmt, ['DROP', 'INDEX'], 'CONCURRENTLY') : undefined;
    const fixText = fixed ?? existing.map((n: { display: string }) => `DROP INDEX CONCURRENTLY ${n.display};`).join('\n');
    return {
      message:
        `\`DROP INDEX\` takes an \`ACCESS EXCLUSIVE\` lock on the table of ${list} until the transaction commits: it waits for every running query on the table, and every query that arrives after it waits for the drop. ` +
        `Drop it with \`DROP INDEX CONCURRENTLY\` (one index per statement), outside a transaction (PG003 checks that). ` +
        `Not needed if the index was created in this release.`,
      table: existing[0].display,
      fix: fixed ? { kind: 'suggestion', text: fixed } : { kind: 'block', text: fixText },
    };
  },
};
