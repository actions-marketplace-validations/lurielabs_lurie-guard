// The built CLI (dist/cli.js) on a sample repository: usage, exit codes, and
// the default excludes that keep build output (target/, build/, dist/, ...)
// from being reported next to its source.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const cli = join(root, 'dist', 'cli.js');

function run(args: string[], cwd: string) {
  return spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8', timeout: 60_000 });
}

const MIGRATION = 'CREATE INDEX CONCURRENTLY orders_client_idx ON orders (client_id);\n';

describe('the built CLI', () => {
  let repo: string;

  beforeAll(() => {
    expect(existsSync(cli), 'dist/cli.js must exist: run npm run build').toBe(true);
    repo = mkdtempSync(join(tmpdir(), 'lurie-guard-cli-'));
    // A Flyway migration and its copy in Maven's build output, plus copies under other build folders.
    for (const dir of ['src/main/resources/db/migration', 'target/classes/db/migration', 'build/resources/main/db/migration', 'node_modules/pkg/db/migration', 'vendor/x/db/migration']) {
      mkdirSync(join(repo, dir), { recursive: true });
      writeFileSync(join(repo, dir, 'V3__index_orders_client.sql'), MIGRATION);
    }
  });

  afterAll(() => rmSync(repo, { recursive: true, force: true }));

  it('--help and -h print the usage and exit 0; an unknown flag prints it and exits 2', () => {
    for (const flag of ['--help', '-h']) {
      const r = run([flag], repo);
      expect(r.status).toBe(0);
      expect(r.stdout).toMatch(/^Usage: lurie-guard \[options\] \[files\.\.\.\]/);
      expect(r.stdout).toContain('--fail-on LEVEL');
      expect(r.stdout).not.toContain('import ');
    }
    const bad = run(['--bogus'], repo);
    expect(bad.status).toBe(2);
    expect(bad.stderr).toContain('unknown option --bogus');
    expect(bad.stderr).toContain('Usage: lurie-guard');
    const version = run(['--version'], repo);
    expect(version.status).toBe(0);
    expect(version.stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('skips build, dependency and vendor output by default: the source migration is reported once', () => {
    const r = run(['--root', '.', '--format', 'json'], repo);
    expect(r.status).toBe(0);
    const out = JSON.parse(r.stdout) as { findings: { ruleId: string; path: string }[]; files: { path: string }[] };
    expect(out.files.map((f) => f.path)).toEqual(['src/main/resources/db/migration/V3__index_orders_client.sql']);
    expect(out.findings.map((f) => [f.ruleId, f.path])).toEqual([['PG003', 'src/main/resources/db/migration/V3__index_orders_client.sql']]);
  });

  it('default_excludes: false brings the copies back; exclude extends the defaults', () => {
    writeFileSync(join(repo, '.lurie-guard.yml'), 'default_excludes: false\n');
    const all = run(['--root', '.', '--format', 'json'], repo);
    const files = (JSON.parse(all.stdout) as { files: { path: string }[] }).files.map((f) => f.path);
    // The walker never reads node_modules or .git; every other copy is now analyzed.
    expect(files).toEqual([
      'build/resources/main/db/migration/V3__index_orders_client.sql',
      'src/main/resources/db/migration/V3__index_orders_client.sql',
      'target/classes/db/migration/V3__index_orders_client.sql',
      'vendor/x/db/migration/V3__index_orders_client.sql',
    ]);
    writeFileSync(join(repo, '.lurie-guard.yml'), 'exclude:\n  - src/main/resources/db/migration/V3__*\n');
    const none = run(['--root', '.', '--format', 'json'], repo);
    expect((JSON.parse(none.stdout) as { files: unknown[] }).files).toEqual([]);
    rmSync(join(repo, '.lurie-guard.yml'));
  });

  it('--fail-on error exits 1 on an error finding; an invalid config exits 2 naming the key', () => {
    expect(run(['--root', '.', '--fail-on', 'error'], repo).status).toBe(1);
    expect(run(['--root', '.', '--fail-on', 'none'], repo).status).toBe(0);
    writeFileSync(join(repo, '.lurie-guard.yml'), 'fail_onn: error\n');
    const r = run(['--root', '.'], repo);
    expect(r.status).toBe(2);
    expect(r.stderr).toContain('unknown key `fail_onn`');
    rmSync(join(repo, '.lurie-guard.yml'));
  });
});
