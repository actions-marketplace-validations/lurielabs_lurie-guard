// The pull request review: one review per run with inline comments, suggested
// changes where the fix is a one-statement replacement, and idempotence through
// a hidden fingerprint list in the review body (SPEC-MVP.md, "Review comments").
import type { AnalysisResult, Finding, ResolvedConfig } from '../types.js';

export const FINGERPRINTS_MARKER = 'lurie-guard:fingerprints';
export const COMMENT_MARKER = 'lurie-guard:fp:';

export interface ReviewComment {
  path: string;
  line: number;
  side: 'RIGHT';
  start_line?: number;
  start_side?: 'RIGHT';
  body: string;
}

export interface ReviewPayload {
  body: string;
  comments: ReviewComment[];
}

export interface ReviewPlan {
  /** Undefined when there is nothing to post (no new findings, nothing resolved). */
  review?: ReviewPayload;
  /** Fingerprints of findings that were posted before and no longer exist. */
  resolved: string[];
  /** New findings whose line is outside the diff: summary only. */
  outsideDiff: Finding[];
  /** New findings beyond max_comments: summary only. */
  overflow: Finding[];
  allClear: boolean;
}

export interface ReviewOptions {
  /** Commentable RIGHT-side lines per path, from the PR diff. */
  diff: Map<string, Set<number>>;
  /** Fingerprints posted by earlier runs on this PR. */
  previous: Set<string>;
  config: ResolvedConfig;
  reportOnly: boolean;
  /** Explainer output by fingerprint, appended under its own heading. */
  explanations?: Map<string, string>;
  explainerModel?: string;
}

/** Lines on the RIGHT side a review comment can attach to, from a unified diff `patch`. */
export function commentableLines(patch: string | undefined): Set<number> {
  const lines = new Set<number>();
  if (!patch) return lines;
  let right = 0;
  for (const raw of patch.split('\n')) {
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw);
    if (hunk) {
      right = Number(hunk[1]);
      continue;
    }
    if (raw.startsWith('+')) {
      lines.add(right);
      right++;
    } else if (raw.startsWith('-')) {
      // left side only
    } else if (raw.startsWith('\\')) {
      // "\ No newline at end of file"
    } else {
      lines.add(right);
      right++;
    }
  }
  return lines;
}

export function commentBody(f: Finding, explanation?: string, model?: string): string {
  const parts = [`**${f.ruleId}** (${f.severity}): ${f.message}`];
  if (f.fix) {
    if (f.fix.kind === 'suggestion') parts.push('```suggestion\n' + f.fix.text + '\n```');
    else parts.push('```sql\n' + f.fix.text + '\n```');
  }
  if (explanation) parts.push(`**Explanation** (from your Anthropic key${model ? `, \`${model}\`` : ''}; the finding above does not depend on it):\n\n${explanation}`);
  parts.push(`<!-- ${COMMENT_MARKER}${f.fingerprint} -->`);
  return parts.join('\n\n');
}

function counts(findings: Finding[]): { errors: number; warnings: number; infos: number } {
  const c = { errors: 0, warnings: 0, infos: 0 };
  for (const f of findings) {
    if (f.severity === 'error') c.errors++;
    else if (f.severity === 'warning') c.warnings++;
    else c.infos++;
  }
  return c;
}

export function planReview(result: AnalysisResult, opts: ReviewOptions): ReviewPlan {
  const active = result.findings.filter((f) => !f.suppressed);
  const activeFps = new Set(active.map((f) => f.fingerprint));
  const resolved = [...opts.previous].filter((fp) => !activeFps.has(fp)).sort();
  const fresh = active.filter((f) => !opts.previous.has(f.fingerprint));

  const inDiff: Finding[] = [];
  const outsideDiff: Finding[] = [];
  for (const f of fresh) {
    const lines = opts.diff.get(f.path);
    if (lines && lines.has(f.line)) inDiff.push(f);
    else outsideDiff.push(f);
  }
  const max = opts.config.outputs.maxComments;
  const toComment = inDiff.slice(0, max);
  const overflow = inDiff.slice(max);

  const comments: ReviewComment[] = toComment.map((f) => {
    const c: ReviewComment = { path: f.path, line: f.line, side: 'RIGHT', body: commentBody(f, opts.explanations?.get(f.fingerprint), opts.explainerModel) };
    if (f.fix?.kind === 'suggestion' && f.fix.startLine && f.fix.endLine && f.fix.endLine > f.fix.startLine) {
      c.start_line = f.fix.startLine;
      c.start_side = 'RIGHT';
      c.line = f.fix.endLine;
    } else if (f.endLine > f.line && opts.diff.get(f.path)?.has(f.endLine)) {
      c.start_line = f.line;
      c.start_side = 'RIGHT';
      c.line = f.endLine;
    }
    return c;
  });

  const allClear = active.length === 0 && opts.previous.size > 0;
  if (fresh.length === 0 && resolved.length === 0) return { resolved, outsideDiff, overflow, allClear: false };

  const c = counts(active);
  const lines: string[] = [];
  if (allClear) lines.push('All lurie-guard findings resolved.');
  else {
    lines.push(`**lurie-guard**: ${active.length} finding${active.length === 1 ? '' : 's'} (${c.errors} error${c.errors === 1 ? '' : 's'}, ${c.warnings} warning${c.warnings === 1 ? '' : 's'}, ${c.infos} info)${fresh.length < active.length ? `, ${fresh.length} new` : ''}.`);
    if (opts.reportOnly) lines.push('Report-only: this check passes whatever it finds. To block merges on errors, add `fail_on: error` to `.lurie-guard.yml` on the base branch.');
    if (overflow.length) lines.push(`${overflow.length} more finding${overflow.length === 1 ? '' : 's'} beyond \`outputs.max_comments\` (${max}) are in the job summary.`);
    if (outsideDiff.length) lines.push(`${outsideDiff.length} finding${outsideDiff.length === 1 ? ' is' : 's are'} on lines outside this diff; see the job summary.`);
    if (resolved.length) lines.push(`${resolved.length} earlier finding${resolved.length === 1 ? '' : 's'} resolved.`);
    const suppressed = result.findings.filter((f) => f.suppressed);
    if (suppressed.length) {
      lines.push('', 'Suppressed with a reason:');
      for (const f of suppressed) lines.push(`- \`${f.path}:${f.line}\` ${f.ruleId}: ${f.suppressed?.reason}`);
    }
  }
  lines.push('', `<!-- ${FINGERPRINTS_MARKER} ${[...activeFps].sort().join(',')} -->`);
  return { review: { body: lines.join('\n'), comments }, resolved, outsideDiff, overflow, allClear };
}

/** Fingerprints recorded in earlier review bodies of this PR. */
export function parseFingerprints(bodies: string[]): Set<string> {
  const out = new Set<string>();
  for (const body of bodies) {
    const m = new RegExp(`<!-- ${FINGERPRINTS_MARKER} ([0-9a-f,]*) -->`).exec(body);
    if (!m) continue;
    for (const fp of m[1].split(',')) if (fp) out.add(fp);
  }
  return out;
}

/** Fingerprint of a review comment posted by lurie-guard, from its hidden marker. */
export function commentFingerprint(body: string): string | undefined {
  return new RegExp(`<!-- ${COMMENT_MARKER}([0-9a-f]+) -->`).exec(body)?.[1];
}
