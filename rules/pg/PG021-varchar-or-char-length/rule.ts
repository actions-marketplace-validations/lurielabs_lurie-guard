import { typeInfo } from '../../../src/parser/ast.js';
import { columnSites, ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG021',
  name: 'varchar-or-char-length',
  severity: 'info',
  defaultOn: false,
  check(stmt, ctx) {
    if (stmt.kind !== 'CreateStmt' && stmt.kind !== 'AlterTableStmt') return;
    const results: RuleResult[] = [];
    for (const site of columnSites(stmt, ctx)) {
      const type = typeInfo(site.typeName);
      if (!type) continue;
      const isVarcharN = type.name === 'varchar' && type.typmods.length > 0;
      const isChar = type.name === 'bpchar';
      if (!isVarcharN && !isChar) continue;
      const col = ident(site.name);
      const n = type.typmods[0];
      const constraint = `${site.table.replace(/^.*\./, '')}_${col}_len`;
      results.push({
        message:
          `\`${col} ${type.display}\` on \`${site.table}\` enforces only a maximum: it still accepts \`''\`, an explicit cast silently truncates to ${n ?? 'n'} characters, and shrinking the limit later rewrites the table${isChar ? '; `char(n)` also pads with spaces and is the slowest of the three string types' : ''}. ` +
          `Declare it \`text\` with a named check, \`CONSTRAINT ${constraint} CHECK (char_length(${col}) BETWEEN 1 AND ${n ?? 'n'})\`, which states the real rule and can be changed with \`NOT VALID\` then \`VALIDATE\` and no rewrite. ` +
          `Not needed when the limit is a real business rule the team keeps deliberately, or for fixed-length codes from a standard (then prefer \`text\` with a regular-expression check).`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: { kind: 'block', text: `${col} text,\nCONSTRAINT ${constraint} CHECK (char_length(${col}) BETWEEN 1 AND ${n ?? 'n'})` },
      });
    }
    return results;
  },
};
