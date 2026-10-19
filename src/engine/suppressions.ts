// Inline suppressions: `-- lurie-guard: ignore PG001 reason="..."` on the
// statement's line or the line above (SPEC-MVP.md, "Suppression").
import type { Finding, SuppressionRecord } from '../types.js';
import { fingerprint } from './fingerprint.js';

export interface ParsedSuppression {
  path: string;
  line: number;
  ruleIds: string[] | 'all';
  reason?: string;
  /** The comment text, for the PGS fingerprints. */
  text: string;
}

const PATTERN = /lurie-guard:\s*ignore\s+([A-Za-z]+\d{3}(?:\s*,\s*[A-Za-z]+\d{3})*|all)(?:\s+reason\s*=\s*(?:"([^"]*)"|'([^']*)'))?/;

export function parseSuppression(path: string, line: number, commentText: string): ParsedSuppression | undefined {
  const m = PATTERN.exec(commentText);
  if (!m) return undefined;
  const ids = m[1].trim();
  const reason = m[2] ?? m[3];
  return {
    path,
    line,
    ruleIds: ids.toLowerCase() === 'all' ? 'all' : ids.split(/\s*,\s*/).map((s) => s.toUpperCase()),
    reason: reason !== undefined && reason.trim() !== '' ? reason.trim() : undefined,
    text: commentText.trim(),
  };
}

export interface SuppressionOutcome {
  findings: Finding[];
  records: SuppressionRecord[];
}

/**
 * Marks suppressed findings and adds the bookkeeping findings: PGS01 for a
 * suppression without a reason (which suppresses nothing), PGS02 for one that
 * matched nothing, PGS03 for `ignore all`.
 */
export function applySuppressions(findings: Finding[], suppressions: ParsedSuppression[]): SuppressionOutcome {
  const matched = new Map<ParsedSuppression, number>();
  for (const s of suppressions) matched.set(s, 0);

  for (const f of findings) {
    if (f.ruleId.startsWith('PGS')) continue;
    for (const s of suppressions) {
      if (s.path !== f.path) continue;
      if (s.line !== f.line && s.line !== f.line - 1) continue;
      if (s.ruleIds !== 'all' && !s.ruleIds.includes(f.ruleId)) continue;
      if (s.reason === undefined) continue;
      f.suppressed = { reason: s.reason, line: s.line };
      matched.set(s, (matched.get(s) ?? 0) + 1);
      break;
    }
  }

  const extra: Finding[] = [];
  const records: SuppressionRecord[] = [];
  for (const s of suppressions) {
    const count = matched.get(s) ?? 0;
    records.push({ path: s.path, line: s.line, ruleIds: s.ruleIds, reason: s.reason, matched: count });
    if (s.reason === undefined) {
      extra.push({
        ruleId: 'PGS01',
        severity: 'warning',
        path: s.path,
        line: s.line,
        endLine: s.line,
        message: `This suppression has no reason, so it suppresses nothing. Write \`lurie-guard: ignore ${s.ruleIds === 'all' ? 'all' : s.ruleIds.join(',')} reason="why this statement is safe here"\`. (PGS01)`,
        fingerprint: fingerprint('PGS01', s.text),
      });
      continue;
    }
    if (count === 0) {
      extra.push({
        ruleId: 'PGS02',
        severity: 'info',
        path: s.path,
        line: s.line,
        endLine: s.line,
        message: `This suppression matches no finding on its line or the line below; remove it so it cannot hide a future finding. (PGS02)`,
        fingerprint: fingerprint('PGS02', s.text),
      });
    }
    if (s.ruleIds === 'all') {
      extra.push({
        ruleId: 'PGS03',
        severity: 'warning',
        path: s.path,
        line: s.line,
        endLine: s.line,
        message: `\`ignore all\` suppresses every rule on this statement (reason: ${s.reason}). Prefer naming the rule ids so a new rule still reports here. (PGS03)`,
        fingerprint: fingerprint('PGS03', s.text),
      });
    }
  }
  return { findings: [...findings, ...extra], records };
}
