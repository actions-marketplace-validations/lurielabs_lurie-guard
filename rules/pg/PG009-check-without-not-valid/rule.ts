import { alterCmds, insertAfterKeywords, notNullCheckColumn, relName } from '../../../src/parser/ast.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG009',
  name: 'check-without-not-valid',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'AlterTableStmt') return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const cmds = alterCmds(s);
    const results: RuleResult[] = [];
    for (const cmd of cmds) {
      if (cmd.subtype !== 'AT_AddConstraint') continue;
      const c = cmd.def?.Constraint;
      if (!c || c.contype !== 'CONSTR_CHECK' || c.skip_validation) continue;
      const col = notNullCheckColumn(c.raw_expr);
      const name: string = c.conname ?? `${rv.name}_${col ?? 'check'}${col ? '_check' : ''}`;
      let suggestion: string | undefined;
      if (cmds.length === 1) {
        const withNotValid = `${stmt.text} NOT VALID`;
        suggestion = c.conname ? withNotValid : (insertAfterKeywords({ ...stmt, text: withNotValid }, ['ADD'], `CONSTRAINT ${name}`) ?? withNotValid);
      }
      results.push({
        message:
          `\`ADD CHECK\` scans every row of \`${table}\` to validate the constraint while it holds \`ACCESS EXCLUSIVE\`: reads and writes wait for the whole scan. ` +
          `Add it with \`NOT VALID\` (catalog only, milliseconds under the same lock), then \`ALTER TABLE ${table} VALIDATE CONSTRAINT ${name}\` in a separate transaction, which takes only \`SHARE UPDATE EXCLUSIVE\`. ` +
          `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name,
        fix: suggestion
          ? { kind: 'suggestion', text: suggestion }
          : { kind: 'block', text: `ALTER TABLE ${table} ADD CONSTRAINT ${name} CHECK (...) NOT VALID;\n-- separate transaction:\nALTER TABLE ${table} VALIDATE CONSTRAINT ${name};` },
      });
    }
    return results;
  },
};
