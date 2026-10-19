// Workflow-command annotations: GitHub shows up to 10 errors and 10 warnings
// per step, so the first 10 of each are emitted (SPEC-MVP.md, "Annotations").
import type { Finding } from '../types.js';

export interface AnnotationSink {
  error(message: string, props: { file: string; startLine: number; endLine: number; title: string }): void;
  warning(message: string, props: { file: string; startLine: number; endLine: number; title: string }): void;
}

export const ANNOTATION_LIMIT = 10;

export function emitAnnotations(findings: Finding[], sink: AnnotationSink): { errors: number; warnings: number } {
  let errors = 0;
  let warnings = 0;
  for (const f of findings) {
    if (f.suppressed) continue;
    const props = { file: f.path, startLine: f.line, endLine: f.endLine, title: `lurie-guard ${f.ruleId}` };
    const text = f.message.replace(/\s*\[evidence\]\((.*?)\)/, ' evidence: $1');
    if (f.severity === 'error' && errors < ANNOTATION_LIMIT) {
      sink.error(text, props);
      errors++;
    } else if (f.severity === 'warning' && warnings < ANNOTATION_LIMIT) {
      sink.warning(text, props);
      warnings++;
    }
  }
  return { errors, warnings };
}
