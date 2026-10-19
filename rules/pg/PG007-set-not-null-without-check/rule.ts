import { alterCmds, relName } from '../../../src/parser/ast.js';
import { ident } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG007',
  name: 'set-not-null-without-check',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'AlterTableStmt') return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const pg18 = ctx.config.postgresVersion >= 18;
    const results: RuleResult[] = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== 'AT_SetNotNull' || typeof cmd.name !== 'string') continue;
      const col = cmd.name;
      const key = `${rv.key}.${col.toLowerCase()}`;
      if (ctx.pr.validatedNotNullChecks.has(key)) continue;
      if (pg18 && ctx.pr.validatedNotNullConstraints.has(key)) continue;
      const name = ident(col);
      const constraint = `${rv.name}_${col}_not_null`;
      const fix = pg18
        ? `ALTER TABLE ${table} ADD CONSTRAINT ${constraint} NOT NULL ${name} NOT VALID;  -- catalog only\n` +
          `ALTER TABLE ${table} VALIDATE CONSTRAINT ${constraint};  -- separate transaction, SHARE UPDATE EXCLUSIVE: writes continue`
        : `ALTER TABLE ${table} ADD CONSTRAINT ${constraint} CHECK (${name} IS NOT NULL) NOT VALID;  -- catalog only, commit at once\n` +
          `ALTER TABLE ${table} VALIDATE CONSTRAINT ${constraint};  -- separate transaction, SHARE UPDATE EXCLUSIVE: writes continue\n` +
          `ALTER TABLE ${table} ALTER COLUMN ${name} SET NOT NULL;  -- skips the scan: the valid CHECK proves no NULL\n` +
          `ALTER TABLE ${table} DROP CONSTRAINT ${constraint};`;
      results.push({
        message:
          `\`SET NOT NULL\` scans every row of \`${table}\` to check \`${name}\` while it holds \`ACCESS EXCLUSIVE\`: reads and writes wait for the whole scan. ` +
          (pg18
            ? `On PostgreSQL 18 add the constraint \`NOT VALID\` (\`ADD CONSTRAINT ${constraint} NOT NULL ${name} NOT VALID\`) and \`VALIDATE CONSTRAINT\` it in a separate transaction, which lets writes continue. `
            : `Add \`CHECK (${name} IS NOT NULL) NOT VALID\` first, \`VALIDATE CONSTRAINT\` it in a separate transaction (writes continue), then \`SET NOT NULL\` skips the scan. `) +
          `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name,
        fix: { kind: 'block', text: fix },
      });
    }
    return results;
  },
};
