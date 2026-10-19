// End to end: the built action (dist/main.js) runs on a sample repository with
// a fake pull_request event and a fake GitHub API on localhost. No network.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const main = join(root, 'dist', 'main.js');

interface Recorded {
  method: string;
  url: string;
  body?: unknown;
}

interface FakeGitHub {
  server: Server;
  port: number;
  requests: Recorded[];
  state: {
    files: { filename: string; status: string; patch: string }[];
    baseConfig?: string;
    reviews: { body: string }[];
    comments: { id: number; body: string }[];
    reviewStatus: number;
    sarifStatus: number;
  };
}

function patchFor(content: string): string {
  const lines = content.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return `@@ -0,0 +1,${lines.length} @@\n${lines.map((l) => `+${l}`).join('\n')}`;
}

async function startFakeGitHub(): Promise<FakeGitHub> {
  const fake: FakeGitHub = {
    server: createServer(),
    port: 0,
    requests: [],
    state: { files: [], reviews: [], comments: [], reviewStatus: 200, sarifStatus: 202 },
  };
  fake.server.on('request', (req, res) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      const url = req.url ?? '';
      const body = raw ? JSON.parse(raw) : undefined;
      fake.requests.push({ method: req.method ?? '', url, body });
      const json = (status: number, data: unknown): void => {
        res.writeHead(status, { 'content-type': 'application/json' });
        res.end(JSON.stringify(data));
      };
      if (req.method === 'GET' && /\/pulls\/1\/files/.test(url)) return json(200, fake.state.files);
      if (req.method === 'GET' && /\/contents\/\.lurie-guard\.yml/.test(url)) {
        if (fake.state.baseConfig === undefined) return json(404, { message: 'Not Found' });
        return json(200, { type: 'file', encoding: 'base64', content: Buffer.from(fake.state.baseConfig).toString('base64') });
      }
      if (req.method === 'GET' && /\/pulls\/1\/reviews/.test(url)) return json(200, fake.state.reviews);
      if (req.method === 'GET' && /\/pulls\/1\/comments/.test(url)) return json(200, fake.state.comments);
      if (req.method === 'POST' && /\/pulls\/1\/reviews/.test(url)) {
        if (fake.state.reviewStatus !== 200) return json(fake.state.reviewStatus, { message: 'Resource not accessible by integration' });
        fake.state.reviews.push({ body: (body as { body: string }).body });
        (body as { comments: { body: string }[] }).comments.forEach((c, i) => fake.state.comments.push({ id: 1000 + fake.state.comments.length + i, body: c.body }));
        return json(200, { id: 1 });
      }
      if (req.method === 'POST' && /\/pulls\/1\/comments\/\d+\/replies/.test(url)) return json(201, { id: 2 });
      if (req.method === 'POST' && /\/code-scanning\/sarifs/.test(url)) {
        if (fake.state.sarifStatus !== 202) return json(fake.state.sarifStatus, { message: 'Advanced Security must be enabled for this repository' });
        return json(202, { id: 'abc', url: 'x' });
      }
      return json(404, { message: `unexpected ${req.method} ${url}` });
    });
  });
  await new Promise<void>((resolve) => fake.server.listen(0, '127.0.0.1', resolve));
  const addr = fake.server.address();
  fake.port = typeof addr === 'object' && addr ? addr.port : 0;
  return fake;
}

interface RunResult {
  status: number;
  stdout: string;
  stderr: string;
  summary: string;
  outputs: Record<string, string>;
  sarif?: Record<string, unknown>;
}

// Asynchronous on purpose: the fake API server lives in this process, and a blocking spawn would never let it answer.
async function runAction(fake: FakeGitHub, workspace: string, event: Record<string, unknown>, inputs: Record<string, string> = {}): Promise<RunResult> {
  const eventPath = join(workspace, 'event.json');
  writeFileSync(eventPath, JSON.stringify(event));
  const summaryPath = join(workspace, 'step-summary.md');
  const outputPath = join(workspace, 'github-output.txt');
  writeFileSync(summaryPath, '');
  writeFileSync(outputPath, '');
  const env: Record<string, string> = {
    PATH: process.env.PATH ?? '',
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_EVENT_NAME: 'pull_request',
    GITHUB_REPOSITORY: 'lurielabs/sample',
    GITHUB_WORKSPACE: workspace,
    GITHUB_API_URL: `http://127.0.0.1:${fake.port}`,
    GITHUB_STEP_SUMMARY: summaryPath,
    GITHUB_OUTPUT: outputPath,
    INPUT_GITHUB_TOKEN: 'ghs_fake',
    ...Object.fromEntries(Object.entries(inputs).map(([k, v]) => [`INPUT_${k.toUpperCase()}`, v])),
  };
  const r = await new Promise<{ status: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [main], { cwd: workspace, env });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    const killer = setTimeout(() => child.kill(), 120_000);
    child.on('close', (status) => {
      clearTimeout(killer);
      resolve({ status, stdout, stderr });
    });
  });
  const outputs: Record<string, string> = {};
  // @actions/core writes `name<<delimiter`, the value, the delimiter, each ending with os.EOL.
  for (const m of readFileSync(outputPath, 'utf8').matchAll(/^(\w+)<<(\S+)\r?\n([\s\S]*?)\r?\n\2\r?$/gm)) outputs[m[1]] = m[3];
  const sarifPath = join(workspace, 'lurie-guard.sarif');
  return {
    status: r.status ?? -1,
    stdout: r.stdout,
    stderr: r.stderr,
    summary: readFileSync(summaryPath, 'utf8'),
    outputs,
    sarif: existsSync(sarifPath) ? JSON.parse(readFileSync(sarifPath, 'utf8')) : undefined,
  };
}

const MIGRATION = `CREATE INDEX orders_created_at_idx ON orders (created_at);
ALTER TABLE orders ADD COLUMN sku text NOT NULL;
`;

function event(fork = false): Record<string, unknown> {
  return {
    action: 'synchronize',
    number: 1,
    pull_request: {
      number: 1,
      head: { sha: 'a'.repeat(40), ref: 'feature', repo: { full_name: fork ? 'someone/sample' : 'lurielabs/sample' } },
      base: { sha: 'b'.repeat(40), ref: 'main', repo: { full_name: 'lurielabs/sample' } },
    },
  };
}

describe('the built action end to end (no network)', () => {
  let fake: FakeGitHub;
  let workspace: string;

  beforeAll(async () => {
    expect(existsSync(main), 'dist/main.js must exist: run npm run build').toBe(true);
    fake = await startFakeGitHub();
    workspace = mkdtempSync(join(tmpdir(), 'lurie-guard-e2e-'));
    mkdirSync(join(workspace, 'migrations'), { recursive: true });
    writeFileSync(join(workspace, 'migrations', '0002_index.sql'), MIGRATION);
    fake.state.files = [{ filename: 'migrations/0002_index.sql', status: 'added', patch: patchFor(MIGRATION) }];
  });

  afterAll(() => {
    fake.server.close();
    rmSync(workspace, { recursive: true, force: true });
  });

  function reset(): void {
    fake.requests.length = 0;
    fake.state.reviews = [];
    fake.state.comments = [];
    fake.state.baseConfig = undefined;
    fake.state.reviewStatus = 200;
    fake.state.sarifStatus = 202;
  }

  it('posts one review with suggestions, uploads the SARIF, writes the summary and outputs, exits 0 (report-only)', async () => {
    reset();
    const r = await runAction(fake, workspace, event());
    expect(r.stderr).toBe('');
    expect(r.status).toBe(0);
    const review = fake.requests.find((q) => q.method === 'POST' && /reviews/.test(q.url));
    expect(review).toBeDefined();
    const body = review!.body as { event: string; commit_id: string; body: string; comments: { path: string; line: number; side: string; body: string }[] };
    expect(body.event).toBe('COMMENT');
    expect(body.commit_id).toBe('a'.repeat(40));
    expect(body.body).toContain('Report-only');
    // PG001 on line 1; PG004 (no lock_timeout) and PG006 on line 2.
    expect(body.comments.map((c) => [c.path, c.line, c.side, c.body.slice(0, 9)])).toEqual([
      ['migrations/0002_index.sql', 1, 'RIGHT', '**PG001**'],
      ['migrations/0002_index.sql', 2, 'RIGHT', '**PG004**'],
      ['migrations/0002_index.sql', 2, 'RIGHT', '**PG006**'],
    ]);
    expect(body.comments[0].body).toContain('```suggestion\nCREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);\n```');
    const upload = fake.requests.find((q) => q.method === 'POST' && /sarifs/.test(q.url));
    expect(upload).toBeDefined();
    const u = upload!.body as { commit_sha: string; ref: string; sarif: string };
    expect(u.commit_sha).toBe('a'.repeat(40));
    expect(u.ref).toBe('refs/pull/1/head');
    const decoded = JSON.parse(gunzipSync(Buffer.from(u.sarif, 'base64')).toString('utf8')) as { version: string; runs: { results: unknown[] }[] };
    expect(decoded.version).toBe('2.1.0');
    expect(decoded.runs[0].results.length).toBe(3);
    expect(r.sarif).toEqual(decoded);
    expect(r.summary).toContain('## lurie-guard');
    expect(r.summary).toContain('PG001');
    expect(r.outputs.findings).toBe('3');
    expect(r.outputs.errors).toBe('2');
    expect(r.outputs.warnings).toBe('1');
    expect(r.outputs.sarif_file).toContain('lurie-guard.sarif');
    expect(r.stdout).toMatch(/::error title=lurie-guard PG001,file=migrations\/0002_index.sql,line=1,endLine=1::/);
    // The only hosts contacted: the fake api.github.com.
    expect(fake.requests.every((q) => q.url.startsWith('/repos/lurielabs/sample/'))).toBe(true);
  });

  it('is idempotent: a second run on the same commit posts nothing new', async () => {
    fake.requests.length = 0;
    const r = await runAction(fake, workspace, event());
    expect(r.status).toBe(0);
    expect(fake.requests.find((q) => q.method === 'POST' && /reviews/.test(q.url))).toBeUndefined();
    expect(r.stdout).toContain('No new findings and nothing resolved');
  });

  it('fail_on: error in the base-branch config fails the run; the PR cannot turn a rule off for itself', async () => {
    reset();
    fake.state.baseConfig = 'fail_on: error\n';
    // The PR's own checkout carries a config that turns PG001 off and adds the file to the diff: ignored, with a notice.
    writeFileSync(join(workspace, '.lurie-guard.yml'), 'rules:\n  PG001: off\n');
    fake.state.files.push({ filename: '.lurie-guard.yml', status: 'added', patch: patchFor('rules:\n  PG001: off\n') });
    const r = await runAction(fake, workspace, event());
    fake.state.files.pop();
    rmSync(join(workspace, '.lurie-guard.yml'));
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('::error::2 error(s) and 1 warning(s) at or above fail_on: error');
    expect(r.summary).toContain('PG001');
    expect(r.summary).toContain('This PR changes `.lurie-guard.yml`. The configuration from the base branch applies to this run');
    expect(r.summary).not.toContain('Report-only');
  });

  it('an invalid base config fails the run with the key named', async () => {
    reset();
    fake.state.baseConfig = 'fail_onn: error\n';
    const r = await runAction(fake, workspace, event());
    expect(r.status).toBe(1);
    expect(r.stdout).toContain('::error::.lurie-guard.yml: unknown key `fail_onn`');
  });

  it('on a PR from a fork: no review, no SARIF upload, summary and exit code still written', async () => {
    reset();
    fake.state.baseConfig = 'fail_on: error\n';
    const r = await runAction(fake, workspace, event(true));
    expect(r.status).toBe(1);
    expect(fake.requests.filter((q) => q.method === 'POST')).toEqual([]);
    expect(r.stdout).toContain('PR from a fork: GITHUB_TOKEN is read-only');
    expect(r.summary).toContain('PG001');
    expect(r.sarif).toBeDefined();
  });

  it('with contents: read only (403 on the review and the upload) the run still completes with summary and annotations', async () => {
    reset();
    fake.state.reviewStatus = 403;
    fake.state.sarifStatus = 403;
    const r = await runAction(fake, workspace, event());
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('::warning::posting the review: HTTP 403');
    expect(r.stdout).toContain('SARIF upload refused (HTTP 403)');
    expect(r.summary).toContain('PG001');
    expect(r.stdout).toMatch(/::error title=lurie-guard PG001,file=migrations\/0002_index.sql/);
    const strict = await runAction(fake, workspace, event(), { strict: 'true' });
    expect(strict.status).toBe(1);
  });

  it('does nothing on a non-pull_request event', async () => {
    reset();
    const r = await runAction(fake, workspace, { ref: 'refs/heads/main' });
    expect(r.status).toBe(0);
    expect(fake.requests).toEqual([]);
    expect(r.stdout).toContain('runs on pull_request events');
  });
});
