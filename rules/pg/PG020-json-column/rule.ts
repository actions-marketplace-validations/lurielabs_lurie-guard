import { replaceTypeTokens, typeInfo } from '../../../src/parser/ast.js';
import { columnSites, ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG020',
  name: 'json-column',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'CreateStmt' && stmt.kind !== 'AlterTableStmt') return;
    const results: RuleResult[] = [];
    for (const site of columnSites(stmt, ctx)) {
      const type = typeInfo(site.typeName);
      if (!type || type.name !== 'json') continue;
      const col = ident(site.name);
      const fixed = replaceTypeTokens(stmt, site.typeLocation, `jsonb${type.isArray ? '' : ''}`);
      results.push({
        message:
          `\`${col} json\` on \`${site.table}\` stores the input text as is: it keeps duplicate keys, is reparsed on every read, cannot be indexed with GIN and has no \`=\` operator (SQLSTATE \`42883\` in the db-skills test). ` +
          `Declare it \`jsonb\`, which keeps the last duplicate key, supports indexing and comparison, and is what "most applications should prefer". ` +
          `Not needed for a payload kept byte for byte for audit (key order and duplicates preserved); suppress with that reason.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: 'suggestion', text: fixed } : undefined,
      });
    }
    return results;
  },
};
