// SARIF 2.1.0 for GitHub code scanning (SPEC-MVP.md, "SARIF"): the full rule
// catalog with help.markdown, one result per finding with partialFingerprints,
// in-source suppressions, suggested changes as fixes, and the category in
// automationDetails.id. Deterministic: no timestamps.
import { lineHash } from '../engine/fingerprint.js';
import type { AnalysisResult, Finding, RuleCatalogEntry, Severity } from '../types.js';

export const SARIF_CATEGORY = 'lurie-guard/pg';
export const MAX_RESULTS = 25_000;
const RULES_BASE = 'https://github.com/lurielabs/lurie-guard/blob/main/rules/';

function level(s: Severity): 'error' | 'warning' | 'note' {
  return s === 'info' ? 'note' : s;
}

function firstParagraph(help: string): string {
  const m = /## What it detects\n\n([\s\S]*?)(?:\n\n|$)/.exec(help);
  return (m?.[1] ?? help.split('\n\n')[0] ?? '').replace(/\s+/g, ' ').trim();
}

export interface SarifOptions {
  version: string;
  /** File contents by path, for the line hash of each result. */
  contents: Map<string, string>;
}

export function buildSarif(result: AnalysisResult, catalog: RuleCatalogEntry[], opts: SarifOptions): Record<string, unknown> {
  const sorted = [...catalog].sort((a, b) => a.id.localeCompare(b.id));
  const ruleIndex = new Map(sorted.map((r, i) => [r.id, i]));
  const rules = sorted.map((r) => ({
    id: r.id,
    name: r.name,
    shortDescription: { text: r.title },
    fullDescription: { text: firstParagraph(r.help) || r.title },
    help: { text: r.help.replace(/[`*#>]/g, ''), markdown: r.help },
    helpUri: r.folder ? `${RULES_BASE}${r.folder}/RULE.md` : 'https://github.com/lurielabs/lurie-guard/blob/main/docs/SPEC-MVP.md',
    defaultConfiguration: { level: level(r.severity) },
    properties: { tags: ['postgresql', 'migration'], skill: r.skill || undefined },
  }));

  const truncated = result.findings.length > MAX_RESULTS;
  const findings = truncated ? result.findings.slice(0, MAX_RESULTS) : result.findings;
  const results = findings.map((f) => toResult(f, ruleIndex, opts.contents));

  const run: Record<string, unknown> = {
    tool: {
      driver: {
        name: 'lurie-guard',
        semanticVersion: opts.version,
        informationUri: 'https://github.com/lurielabs/lurie-guard',
        rules,
      },
    },
    automationDetails: { id: `${SARIF_CATEGORY}/` },
    columnKind: 'utf16CodeUnits',
    results,
  };
  if (truncated) {
    run.invocations = [
      {
        executionSuccessful: true,
        toolExecutionNotifications: [
          { level: 'warning', message: { text: `${result.findings.length} findings; only the first ${MAX_RESULTS} are in this file (code scanning limit).` } },
        ],
      },
    ];
  }
  return {
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    version: '2.1.0',
    runs: [run],
  };
}

function toResult(f: Finding, ruleIndex: Map<string, number>, contents: Map<string, string>): Record<string, unknown> {
  const lineText = contents.get(f.path)?.split('\n')[f.line - 1] ?? '';
  const location = {
    physicalLocation: {
      artifactLocation: { uri: f.path, uriBaseId: '%SRCROOT%' },
      region: { startLine: f.line, endLine: Math.max(f.line, f.endLine) },
    },
  };
  const out: Record<string, unknown> = {
    ruleId: f.ruleId,
    ruleIndex: ruleIndex.get(f.ruleId) ?? -1,
    level: level(f.severity),
    message: { text: f.message.replace(/\[evidence\]\((.*?)\)/, 'evidence: $1'), markdown: f.message },
    locations: [location],
    partialFingerprints: {
      primaryLocationLineHash: lineHash(lineText),
      'lurie-guard/v1': f.fingerprint,
    },
  };
  if (f.suppressed) out.suppressions = [{ kind: 'inSource', justification: f.suppressed.reason }];
  if (f.fix?.kind === 'suggestion' && f.fix.startLine && f.fix.endLine) {
    out.fixes = [
      {
        description: { text: `Replace with the online form (${f.ruleId}).` },
        artifactChanges: [
          {
            artifactLocation: { uri: f.path, uriBaseId: '%SRCROOT%' },
            replacements: [
              {
                deletedRegion: { startLine: f.fix.startLine, startColumn: 1, endLine: f.fix.endLine + 1, endColumn: 1 },
                insertedContent: { text: `${f.fix.text}\n` },
              },
            ],
          },
        ],
      },
    ];
  }
  return out;
}
