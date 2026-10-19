// The GitHub Action entry: reads the pull_request event, lists the PR files,
// reads the base-branch config, runs the engine, and writes the review, the
// SARIF, the job summary, the annotations, the outputs and the exit code.
// The only network calls are to api.github.com (and api.anthropic.com when the
// client sets anthropic_api_key).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as core from '@actions/core';
import type { InputFile } from './detector/index.js';
import { GitHubClient } from './github/client.js';
import { explainFindings } from './llm/explainer.js';
import { emitAnnotations } from './reporters/annotations.js';
import { commentableLines, planReview } from './reporters/review.js';
import { buildSummary } from './reporters/summary.js';
import { ConfigError, fullCatalog, loadConfig, run, VERSION } from './run.js';

interface PullRequestEvent {
  action?: string;
  number?: number;
  pull_request?: {
    number: number;
    head: { sha: string; ref: string; repo: { full_name: string } | null };
    base: { sha: string; ref: string; repo: { full_name: string } };
  };
}

function readEvent(): PullRequestEvent | undefined {
  const path = process.env.GITHUB_EVENT_PATH;
  if (!path || !existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, 'utf8')) as PullRequestEvent;
}

async function main(): Promise<void> {
  const started = performance.now();
  const token = core.getInput('github_token');
  const anthropicKey = core.getInput('anthropic_api_key');
  const configPath = core.getInput('config_path') || '.lurie-guard.yml';
  const sarifFile = core.getInput('sarif_file') || 'lurie-guard.sarif';
  const uploadSarifInput = core.getInput('upload_sarif') === 'true';
  const strict = core.getInput('strict') === 'true';
  const workspace = process.env.GITHUB_WORKSPACE ?? process.cwd();
  const apiFailures: string[] = [];
  const apiFailure = (what: string, err: unknown): void => {
    const status = (err as { status?: number }).status;
    const msg = `${what}: ${status ? `HTTP ${status} ` : ''}${(err as Error).message}`;
    apiFailures.push(msg);
    core.warning(msg);
  };

  const event = readEvent();
  const pr = event?.pull_request;
  if (!pr) {
    core.warning('lurie-guard runs on pull_request events; nothing to do for this event.');
    return;
  }
  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '/').split('/');
  const fork = !pr.head.repo || pr.head.repo.full_name !== pr.base.repo.full_name;
  const client = new GitHubClient(token, process.env.GITHUB_API_URL);
  core.info(`lurie-guard ${VERSION}: ${owner}/${repo}#${pr.number} (${pr.head.sha.slice(0, 7)} onto ${pr.base.ref})${fork ? ', from a fork' : ''}`);

  // 1. The PR's files, from the API; contents from the checkout at the head commit.
  const prFiles = await client.listPullFiles(owner, repo, pr.number);
  const files: InputFile[] = [];
  const diff = new Map<string, Set<number>>();
  let configChanged = false;
  for (const f of prFiles) {
    if (f.filename === configPath) configChanged = true;
    if (f.status !== 'added' && f.status !== 'modified' && f.status !== 'renamed') continue;
    const abs = resolve(workspace, f.filename);
    if (!existsSync(abs)) {
      core.warning(`${f.filename} is in the PR but not in the checkout; skipped. Is actions/checkout at the head commit?`);
      continue;
    }
    files.push({ path: f.filename, status: f.status === 'added' ? 'added' : 'modified', content: readFileSync(abs, 'utf8') });
    diff.set(f.filename, commentableLines(f.patch));
  }

  // 2. The config from the base branch, never from the PR.
  const notices: string[] = [];
  let configText: string | undefined;
  try {
    configText = await client.getFileContent(owner, repo, configPath, pr.base.sha);
  } catch (err) {
    apiFailure(`reading ${configPath} from the base branch`, err);
    notices.push(`Could not read \`${configPath}\` from the base branch; the defaults were used.`);
  }
  if (configChanged) notices.push(`This PR changes \`${configPath}\`. The configuration from the base branch applies to this run; the new one applies after merge.`);
  try {
    loadConfig(configText);
  } catch (err) {
    if (err instanceof ConfigError) {
      core.setFailed(err.message);
      return;
    }
    throw err;
  }

  // 3. The engine and the reports.
  const out = await run({
    files,
    configText,
    notices,
    readSibling: (p) => {
      const abs = resolve(workspace, p);
      return existsSync(abs) ? readFileSync(abs, 'utf8') : undefined;
    },
  });

  // 4. Optional explainer, with the client's key, before the review so comments carry it.
  let explanations: Map<string, string> | undefined;
  let llmUsage: Parameters<typeof buildSummary>[1]['llm'];
  if (anthropicKey && out.config.llm.explain && !fork && out.active.length) {
    const ex = await explainFindings(out.active, { config: out.config, catalog: fullCatalog(), apiKey: anthropicKey });
    explanations = ex.explanations;
    for (const w of ex.warnings) core.warning(w);
    if (ex.usage.stoppedByBudget) notices.push(`The explainer stopped at the \`llm.max_cost_usd_per_run\` budget ($${out.config.llm.maxCostUsdPerRun}).`);
    llmUsage = {
      model: ex.usage.model,
      inputTokens: ex.usage.inputTokens,
      cacheReadTokens: ex.usage.cacheReadTokens,
      outputTokens: ex.usage.outputTokens,
      costUsd: ex.usage.costUsd,
      explained: ex.usage.explained,
    };
  }

  // 5. Review comments (not on fork PRs: the token is read-only).
  if (fork) {
    core.info('PR from a fork: GITHUB_TOKEN is read-only, so review comments and the SARIF upload are skipped. The summary, the annotations and the exit code still apply.');
  } else if (!out.config.outputs.reviewComments) {
    core.info('outputs.review_comments is false; no review posted.');
  } else {
    try {
      const previous = await client.previousReview(owner, repo, pr.number);
      const plan = planReview(out.result, {
        diff,
        previous: previous.fingerprints,
        config: out.config,
        reportOnly: out.reportOnly,
        explanations,
        explainerModel: llmUsage?.model,
      });
      if (plan.review) {
        await client.createReview(owner, repo, pr.number, pr.head.sha, plan.review);
        core.info(`Posted a review with ${plan.review.comments.length} comment(s); ${plan.resolved.length} resolved.`);
      } else core.info('No new findings and nothing resolved; no review posted.');
      for (const fp of plan.resolved) {
        const id = previous.comments.get(fp);
        if (id !== undefined) {
          try {
            await client.replyResolved(owner, repo, pr.number, id);
          } catch (err) {
            apiFailure('replying to a resolved finding', err);
          }
        }
      }
    } catch (err) {
      apiFailure('posting the review', err);
    }
  }

  // 6. SARIF: always written; uploaded when permitted.
  const sarifJson = JSON.stringify(out.sarif, null, 2);
  const sarifPath = resolve(workspace, sarifFile);
  writeFileSync(sarifPath, sarifJson);
  core.setOutput('sarif_file', sarifPath);
  // The upload is opt-in (ADR 0011): code scanning posts its own review on every finding of a PR.
  const uploadSarif = uploadSarifInput || out.config.outputs.sarif;
  if (!fork && !uploadSarif) {
    core.info(`SARIF written to ${sarifPath}; not uploaded to code scanning. Opt in with outputs.sarif: true in .lurie-guard.yml or upload_sarif: true (GitHub then also comments each finding on the PR).`);
  }
  if (!fork && uploadSarif) {
    try {
      const id = await client.uploadSarif(owner, repo, pr.head.sha, `refs/pull/${pr.number}/head`, sarifJson);
      core.info(`SARIF uploaded to code scanning${id ? ` (${id})` : ''}.`);
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 403 || status === 404)
        core.warning(`SARIF upload refused (HTTP ${status}): code scanning needs security-events: write and, on private repositories, a GitHub Code Security license. The file is at ${sarifPath}; a workflow step can upload it with github/codeql-action/upload-sarif.`);
      else apiFailure('uploading the SARIF', err);
    }
  }

  // 7. Summary, annotations, outputs, exit code.
  const summary = buildSummary(out.result, {
    config: out.config,
    reportOnly: out.reportOnly,
    skipped: out.skipped,
    runMs: Math.round(performance.now() - started),
    notices,
    llm: llmUsage,
    explanations,
  });
  const summaryPath = join(workspace, 'lurie-guard-summary.md');
  writeFileSync(summaryPath, summary);
  core.setOutput('summary_file', summaryPath);
  if (out.config.outputs.summary) await core.summary.addRaw(summary).write();
  emitAnnotations(out.result.findings, {
    error: (m, p) => core.error(m, p),
    warning: (m, p) => core.warning(m, p),
  });
  core.setOutput('findings', String(out.counts.findings));
  core.setOutput('errors', String(out.counts.errors));
  core.setOutput('warnings', String(out.counts.warnings));
  core.info(`${out.counts.findings} finding(s): ${out.counts.errors} error(s), ${out.counts.warnings} warning(s). fail_on: ${out.config.failOn}.`);

  if (out.exitCode !== 0) core.setFailed(`${out.counts.errors} error(s) and ${out.counts.warnings} warning(s) at or above fail_on: ${out.config.failOn}.`);
  else if (strict && apiFailures.length) core.setFailed(`strict: ${apiFailures.length} GitHub API call(s) failed: ${apiFailures.join('; ')}`);
}

main().catch((err: Error) => {
  core.setFailed(`lurie-guard failed: ${err.stack ?? err.message}`);
});
