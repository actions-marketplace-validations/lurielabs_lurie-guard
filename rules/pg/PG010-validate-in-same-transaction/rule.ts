import { alterCmds, relName } from '../../../src/parser/ast.js';
import { transactionReason } from '../../../src/rules-support.js';
import type { Rule, RuleResult } from '../../../src/types.js';

export const rule: Rule = {
  id: 'PG010',
  name: 'validate-in-same-transaction',
  severity: 'error',
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== 'AlterTableStmt') return;
    const s = stmt.inner;
    const rv = relName(s.relation);
    if (!rv || ctx.pr.newTables.has(rv.key)) return;
    const table = rv.display;
    const results: RuleResult[] = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== 'AT_ValidateConstraint' || typeof cmd.name !== 'string') continue;
      const nv = ctx.state.notValid.get(cmd.name.toLowerCase());
      if (!nv || nv.validated || nv.txn !== ctx.currentTxn()) continue;
      const lock = nv.kind === 'foreign' ? '`SHARE ROW EXCLUSIVE` on both tables' : '`ACCESS EXCLUSIVE`';
      const { explicit, hint } = transactionReason(stmt, ctx);
      const where = explicit ? 'the same `BEGIN` block' : `the same file, which ${ctx.file.framework === 'sql' ? 'the runner' : ctx.file.framework} runs as one transaction`;
      results.push({
        message:
          `\`VALIDATE CONSTRAINT ${nv.name}\` runs in the same transaction as the \`ADD ... NOT VALID\` that created it (${where}), so the full scan of \`${table}\` runs while the ${lock} lock from the \`ADD\` is still held: \`NOT VALID\` bought nothing. ` +
          `Commit after the \`ADD\` and validate in its own transaction: ${explicit ? hint : `move the VALIDATE to the next migration, or ${hint}`}. ` +
          `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: nv.name,
      });
    }
    return results;
  },
};
