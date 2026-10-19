// Findings the engine produces itself (not from rule folders): suppression
// bookkeeping and parse failures. They have ids so SARIF and the summary can
// name them, and catalog entries so the SARIF rule list is complete.
import type { RuleCatalogEntry, Severity } from '../types.js';

export interface BuiltinRule {
  id: string;
  name: string;
  severity: Severity;
  title: string;
  help: string;
}

export const BUILTIN_RULES: BuiltinRule[] = [
  {
    id: 'PGS01',
    name: 'suppression-without-reason',
    severity: 'warning',
    title: 'Suppression without a reason',
    help: 'A `lurie-guard: ignore` comment needs `reason="..."`. Without it the suppression is reported and does not suppress anything, so a reviewer always sees why a finding was accepted.',
  },
  {
    id: 'PGS02',
    name: 'unused-suppression',
    severity: 'info',
    title: 'Suppression that matches no finding',
    help: 'A `lurie-guard: ignore` comment that matches no finding on its line or the line below. Remove it, so stale suppressions do not hide a future finding.',
  },
  {
    id: 'PGS03',
    name: 'ignore-all',
    severity: 'warning',
    title: 'Suppression of every rule on a statement',
    help: '`lurie-guard: ignore all` suppresses every finding on the statement. It is accepted and reported so it stays visible in review; prefer naming the rule ids.',
  },
  {
    id: 'PGS04',
    name: 'could-not-parse',
    severity: 'info',
    title: 'File could not be parsed',
    help: "PostgreSQL's parser rejected the file at the given position, so no rule ran on it. The run continues and the exit code is not affected. Check the statement at that position; a file the parser rejects would also fail in production.",
  },
];

export function builtinCatalog(): RuleCatalogEntry[] {
  return BUILTIN_RULES.map((b) => ({
    id: b.id,
    name: b.name,
    severity: b.severity,
    pack: 'pg',
    folder: '',
    since: '0.1.0',
    status: 'active',
    skill: '',
    evidence: [],
    verified: '',
    title: b.title,
    help: b.help,
    messageTemplate: '',
  }));
}
