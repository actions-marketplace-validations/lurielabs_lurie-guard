// Everything that talks to api.github.com, over Node's own fetch: seven
// documented REST endpoints, pagination through the Link header, no Octokit
// (and no second HTTP stack in the bundle). One small interface, so the
// end-to-end test points it at a local fake server (GITHUB_API_URL). On a
// self-hosted runner behind a proxy, NODE_USE_ENV_PROXY=1 makes fetch honor
// HTTPS_PROXY.
import { gzipSync } from 'node:zlib';
import { commentFingerprint, parseFingerprints, type ReviewPayload } from '../reporters/review.js';

export interface PrFile {
  filename: string;
  status: string;
  patch?: string;
  previous_filename?: string;
}

export interface PreviousReview {
  fingerprints: Set<string>;
  /** Fingerprint -> review comment id, for replies on resolved findings. */
  comments: Map<string, number>;
}

export class GitHubApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly method: string,
    public readonly path: string,
    message: string,
  ) {
    super(`${method} ${path}: HTTP ${status} ${message}`.trim());
    this.name = 'GitHubApiError';
  }
}

const API_VERSION = '2022-11-28';

export class GitHubClient {
  private readonly baseUrl: string;

  constructor(
    private readonly token: string,
    baseUrl?: string,
    private readonly version = process.env.LURIE_GUARD_VERSION ?? '0.0.0-dev',
    private readonly fetchImpl: typeof fetch = globalThis.fetch,
  ) {
    this.baseUrl = (baseUrl ?? 'https://api.github.com').replace(/\/+$/, '');
  }

  private async request<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<{ data: T; headers: Headers }> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    const res = await this.fetchImpl(url, {
      method,
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${this.token}`,
        'x-github-api-version': API_VERSION,
        'user-agent': `lurie-guard/${this.version}`,
        ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(60_000),
    });
    const text = await res.text();
    if (!res.ok) {
      let message = text;
      try {
        message = (JSON.parse(text) as { message?: string }).message ?? text;
      } catch {
        // not JSON
      }
      throw new GitHubApiError(res.status, method, path, message);
    }
    return { data: (text ? JSON.parse(text) : undefined) as T, headers: res.headers };
  }

  /** GET every page of a list endpoint (per_page=100, `Link: rel="next"`). */
  private async paginate<T>(path: string): Promise<T[]> {
    const out: T[] = [];
    let next: string | undefined = `${path}${path.includes('?') ? '&' : '?'}per_page=100`;
    for (let page = 0; next && page < 100; page++) {
      const { data, headers } = await this.request<T[]>('GET', next);
      out.push(...data);
      const link = headers.get('link') ?? '';
      const m = /<([^>]+)>;\s*rel="next"/.exec(link);
      next = m?.[1];
    }
    return out;
  }

  async listPullFiles(owner: string, repo: string, pullNumber: number): Promise<PrFile[]> {
    return this.paginate<PrFile>(`/repos/${owner}/${repo}/pulls/${pullNumber}/files`);
  }

  /** File content at a ref through the contents API; undefined when the file does not exist. */
  async getFileContent(owner: string, repo: string, path: string, ref: string): Promise<string | undefined> {
    try {
      const { data } = await this.request<{ type?: string; content?: string; encoding?: string }>(
        'GET',
        `/repos/${owner}/${repo}/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(ref)}`,
      );
      if (data.type !== 'file' || typeof data.content !== 'string') return undefined;
      return Buffer.from(data.content, (data.encoding as BufferEncoding) || 'base64').toString('utf8');
    } catch (err) {
      if (err instanceof GitHubApiError && err.status === 404) return undefined;
      throw err;
    }
  }

  async previousReview(owner: string, repo: string, pullNumber: number): Promise<PreviousReview> {
    const reviews = await this.paginate<{ body?: string }>(`/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`);
    const fingerprints = parseFingerprints(reviews.map((r) => r.body ?? ''));
    const comments = new Map<string, number>();
    if (fingerprints.size) {
      const list = await this.paginate<{ id: number; body?: string }>(`/repos/${owner}/${repo}/pulls/${pullNumber}/comments`);
      for (const c of list) {
        const fp = commentFingerprint(c.body ?? '');
        if (fp && !comments.has(fp)) comments.set(fp, c.id);
      }
    }
    return { fingerprints, comments };
  }

  async createReview(owner: string, repo: string, pullNumber: number, commitId: string, review: ReviewPayload): Promise<void> {
    await this.request('POST', `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`, {
      commit_id: commitId,
      event: 'COMMENT',
      body: review.body,
      comments: review.comments,
    });
  }

  async replyResolved(owner: string, repo: string, pullNumber: number, commentId: number): Promise<void> {
    await this.request('POST', `/repos/${owner}/${repo}/pulls/${pullNumber}/comments/${commentId}/replies`, {
      body: 'Resolved: this finding no longer appears in the latest commit.',
    });
  }

  /** Uploads a SARIF log (gzip + base64, as the endpoint requires). Returns the upload id. */
  async uploadSarif(owner: string, repo: string, commitSha: string, ref: string, sarifJson: string): Promise<string | undefined> {
    const { data } = await this.request<{ id?: string }>('POST', `/repos/${owner}/${repo}/code-scanning/sarifs`, {
      commit_sha: commitSha,
      ref,
      sarif: gzipSync(Buffer.from(sarifJson, 'utf8')).toString('base64'),
      tool_name: 'lurie-guard',
    });
    return data?.id;
  }
}
