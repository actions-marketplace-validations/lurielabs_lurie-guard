import { replaceTypeTokens, typeInfo } from '../../../src/parser/ast.js';
import { columnSites, ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG019',
  name: 'timestamp-without-time-zone',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'CreateStmt' && stmt.kind !== 'AlterTableStmt') return;
    const results: RuleResult[] = [];
    for (const site of columnSites(stmt, ctx)) {
      const type = typeInfo(site.typeName);
      if (!type || type.name !== 'timestamp' || !type.builtin) continue;
      const col = ident(site.name);
      const precision = type.typmods.length ? `(${type.typmods[0]})` : '';
      const fixed = replaceTypeTokens(stmt, site.typeLocation, `timestamptz${precision}`);
      results.push({
        message:
          `\`${col} ${type.display}\` on \`${site.table}\` is a timestamp without time zone: PostgreSQL "silently ignore[s] any time zone indication" on input, so the same instant written from two sessions with different \`TimeZone\` settings is stored as two values (12 hours apart in the db-skills test). ` +
          `Declare it \`timestamptz${precision}\`: stored as UTC, same 8 bytes, converted on output to the session's zone. ` +
          `Not needed for a wall-clock value that is deliberately zone-free (a store's opening time, a recurring local alarm); suppress with that reason.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: 'suggestion', text: fixed } : undefined,
      });
    }
    return results;
  },
};
