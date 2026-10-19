import { funcName, replaceCallTokens, typeInfo } from '../../../src/parser/ast.js';
import { columnSites, defaultExpr, ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

const RANDOM_UUID = new Set(['gen_random_uuid', 'uuid_generate_v4', 'uuidv4']);

export const rule: Rule = {
  id: 'PG018',
  name: 'random-uuid-primary-key',
  severity: 'warning',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'CreateStmt' && stmt.kind !== 'AlterTableStmt') return;
    const results: RuleResult[] = [];
    for (const site of columnSites(stmt, ctx)) {
      if (!site.isPrimaryKey) continue;
      const type = typeInfo(site.typeName);
      if (!type || type.name !== 'uuid') continue;
      const def = defaultExpr(site) as { FuncCall?: { location?: number } } | undefined;
      const fn = funcName(def?.FuncCall);
      if (!fn || !RANDOM_UUID.has(fn)) continue;
      const col = ident(site.name);
      const pg18 = ctx.config.postgresVersion >= 18;
      const fixed = pg18 && def?.FuncCall?.location !== undefined ? replaceCallTokens(stmt, def.FuncCall.location, 'uuidv7()') : undefined;
      results.push({
        message:
          `\`${col} uuid PRIMARY KEY DEFAULT ${fn}()\` on \`${site.table}\` inserts random keys all over the index: leaf pages split half full (about 65% density in the db-skills test) and the primary key index is over 30% larger than the same keys inserted in order, with every insert touching a random page. ` +
          (pg18
            ? `Default it to \`uuidv7()\` (PostgreSQL 18+), which is time-ordered and fills pages like a \`bigint\` identity. `
            : `Generate UUIDv7 in the application (PostgreSQL below 18 has no \`uuidv7()\`), or use \`bigint GENERATED ALWAYS AS IDENTITY\` when the id never leaves your system. `) +
          `Not needed if the id must not reveal creation order; then keep the random key and accept the index cost, or expose a random token in a separate column.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: 'suggestion', text: fixed } : { kind: 'block', text: `${col} uuid PRIMARY KEY DEFAULT uuidv7()  -- PostgreSQL 18+; below 18, generate UUIDv7 in the application` },
      });
    }
    return results;
  },
};
