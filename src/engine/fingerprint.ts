import { createHash } from 'node:crypto';

/** Whitespace-insensitive, case-insensitive form of a statement for fingerprints. */
export function normalizeStatement(text: string): string {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * The finding's identity across runs: rule id, normalized statement, table and
 * an optional key (a column). The line number is deliberately excluded so a
 * statement that moves keeps its fingerprint (ARCHITECTURE.md, "Rule engine").
 */
export function fingerprint(ruleId: string, statementText: string, table?: string, key?: string): string {
  const h = createHash('sha256');
  h.update(ruleId);
  h.update('\0');
  h.update(normalizeStatement(statementText));
  h.update('\0');
  h.update((table ?? '').toLowerCase());
  h.update('\0');
  h.update((key ?? '').toLowerCase());
  return h.digest('hex').slice(0, 32);
}

/**
 * SARIF partialFingerprints.primaryLocationLineHash: a hash of the primary
 * location's line content, so code scanning keeps one alert when the line
 * moves. GitHub documents the key, not the algorithm (it computes one from
 * the source when the key is absent), so this is a stable content hash.
 */
export function lineHash(lineText: string): string {
  return createHash('sha256').update(lineText.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 16) + ':1';
}
