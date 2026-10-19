import { alterCmds, insertAfterKeywords, relName, strVal } from '../../../src/parser/ast.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG008',
  name: 'foreign-key-without-not-valid',
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
      if (!c || c.contype !== 'CONSTR_FOREIGN' || c.skip_validation) continue;
      const cols = (c.fk_attrs ?? []).map(strVal).filter(Boolean) as string[];
      const referenced = relName(c.pktable)?.display ?? 'the referenced table';
      const name: string = c.conname ?? `${rv.name}_${cols.join('_') || 'fk'}_fkey`;
      let suggestion: string | undefined;
      if (cmds.length === 1) {
        const withNotValid = `${stmt.text} NOT VALID`;
        suggestion = c.conname ? withNotValid : (insertAfterKeywords({ ...stmt, text: withNotValid }, ['ADD'], `CONSTRAINT ${name}`) ?? withNotValid);
      }
      results.push({
        message:
          `\`ADD FOREIGN KEY\` validates every row of \`${table}\` while it holds \`SHARE ROW EXCLUSIVE\` on \`${table}\` and on \`${referenced}\`: writes on both tables wait for the whole scan. ` +
          `Add it with \`NOT VALID\` (catalog only), then \`ALTER TABLE ${table} VALIDATE CONSTRAINT ${name}\` in a separate transaction, which takes only \`SHARE UPDATE EXCLUSIVE\` and lets writes continue. ` +
          `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name,
        fix: suggestion
          ? { kind: 'suggestion', text: suggestion }
          : { kind: 'block', text: `ALTER TABLE ${table} ADD CONSTRAINT ${name} FOREIGN KEY (${cols.join(', ')}) REFERENCES ${referenced} (...) NOT VALID;\n-- separate transaction:\nALTER TABLE ${table} VALIDATE CONSTRAINT ${name};` },
      });
    }
    return results;
  },
};
