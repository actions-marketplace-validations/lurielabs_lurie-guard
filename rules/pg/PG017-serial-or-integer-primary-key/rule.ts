import { replaceTypeTokens, typeInfo } from '../../../src/parser/ast.js';
import { columnSites, ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

const SERIAL = new Set(['serial', 'serial4', 'serial2', 'smallserial']);
const SMALL_INT = new Set(['int4', 'int2']);

export const rule: Rule = {
  id: 'PG017',
  name: 'serial-or-integer-primary-key',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'CreateStmt' && stmt.kind !== 'AlterTableStmt') return;
    const results: RuleResult[] = [];
    for (const site of columnSites(stmt, ctx)) {
      if (!site.isPrimaryKey || site.origin === 'alter-type') continue;
      const type = typeInfo(site.typeName);
      if (!type || type.isArray) continue;
      const serial = SERIAL.has(type.name);
      if (!serial && !SMALL_INT.has(type.name)) continue;
      const col = ident(site.name);
      const replacement = serial ? 'bigint GENERATED ALWAYS AS IDENTITY' : 'bigint';
      const fixed = replaceTypeTokens(stmt, site.typeLocation, replacement);
      results.push({
        message:
          `\`${col} ${type.display} PRIMARY KEY\` on \`${site.table}\` is a 4-byte key${serial ? ' with a separate sequence' : ''}: it stops at 2147483647 (inserts then fail with SQLSTATE \`2200H\`), and moving to \`bigint\` later rewrites the whole table. ` +
          `Declare it \`${col} ${replacement}\`: 4 more bytes per row, never runs out${serial ? ', and the SQL-standard identity refuses hand-written ids' : ''}. ` +
          `Not needed for a small lookup table that cannot reach 2 billion rows; suppress with that reason.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: 'suggestion', text: fixed } : undefined,
      });
    }
    return results;
  },
};
