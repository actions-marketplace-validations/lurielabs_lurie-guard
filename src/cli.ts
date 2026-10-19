// The local CLI, built from the same sources as the action (ADR 0001):
//
//   lurie-guard [options] [files...]
//     --root DIR          repository root (default: cwd); files are relative to it
//     --config FILE       .lurie-guard.yml to use (default: <root>/.lurie-guard.yml)
//     --modified FILE     treat FILE as modified rather than added (repeatable)
//     --format FORMAT     text | json | sarif | summary (default: text)
//     --out FILE          write the output there instead of stdout
//     --fail-on LEVEL     none | warning | error (overrides the config)
//     --all-rules         enable every rule, including the info ones
//     --fixtures DIR      run every rule fixture under DIR (the determinism check)
//     --one-set           with no files: treat the whole folder as one PR (default: each file is its own)
//
// With no files, every file under --root that the detector classifies as a
// migration is reviewed as "added": the way the pilots scan history.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import type { InputFile } from './detector/index.js';
import { DEFAULT_EXCLUDED_DIRS } from './detector/frameworks.js';
import { loadCases, runCase } from './harness-core.js';
import { buildSarif } from './reporters/sarif.js';
import { planReview } from './reporters/review.js';
import { ConfigError, fullCatalog, loadConfig, run, VERSION } from './run.js';

const USAGE = `Usage: lurie-guard [options] [files...]

  --root DIR          repository root (default: cwd); files are relative to it
  --config FILE       .lurie-guard.yml to use (default: <root>/.lurie-guard.yml)
  --modified FILE     treat FILE as modified rather than added (repeatable)
  --format FORMAT     text | json | sarif | summary (default: text)
  --out FILE          write the output there instead of stdout
  --fail-on LEVEL     none | warning | error (overrides the config)
  --all-rules         enable every rule, including the info ones
  --fixtures DIR      run every rule fixture under DIR (the determinism check)
  --one-set           with no files: the whole folder is one PR (default: each file is
                      its own migration set, as a history scan replays each PR)
  --version, --help

With no files, every file under --root that the detector classifies as a
migration is reviewed, each as its own migration set (a table created in an
earlier file is existing); a list of files is reviewed as one PR. Build,
dependency and VCS output (target/,
build/, dist/, node_modules/, vendor/, ...) is skipped unless the config says
default_excludes: false. Exit code: 0, or 1 when a finding reaches --fail-on
(or the config's fail_on); 2 on a usage or configuration error.
`;

interface Args {
  root: string;
  config?: string;
  modified: Set<string>;
  format: 'text' | 'json' | 'sarif' | 'summary';
  out?: string;
  failOn?: 'none' | 'warning' | 'error';
  allRules: boolean;
  fixtures?: string;
  oneSet: boolean;
  files: string[];
}

function parseArgs(argv: string[]): Args {
  const a: Args = { root: process.cwd(), modified: new Set(), format: 'text', allRules: false, oneSet: false, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    const next = (): string => {
      const v = argv[++i];
      if (v === undefined) throw new Error(`${x} needs a value`);
      return v;
    };
    switch (x) {
      case '--root':
        a.root = resolve(next());
        break;
      case '--config':
        a.config = resolve(next());
        break;
      case '--modified':
        a.modified.add(next().replace(/\\/g, '/'));
        break;
      case '--format':
        a.format = next() as Args['format'];
        break;
      case '--out':
        a.out = resolve(next());
        break;
      case '--fail-on':
        a.failOn = next() as Args['failOn'];
        break;
      case '--all-rules':
        a.allRules = true;
        break;
      case '--one-set':
        a.oneSet = true;
        break;
      case '--fixtures':
        a.fixtures = resolve(next());
        break;
      case '--version':
        console.log(VERSION);
        process.exit(0);
        break;
      case '--help':
      case '-h':
        process.stdout.write(USAGE);
        process.exit(0);
        break;
      default:
        if (x.startsWith('-')) {
          process.stderr.write(`unknown option ${x}\n\n${USAGE}`);
          process.exit(2);
        }
        a.files.push(x);
    }
  }
  return a;
}

const ALWAYS_SKIPPED = new Set(['node_modules', '.git']);

/** Files under the root; build and dependency output is not even read unless the config asks for it. */
function walk(dir: string, skipDefaults: boolean, out: string[] = []): string[] {
  for (const e of readdirSync(dir).sort()) {
    if (ALWAYS_SKIPPED.has(e) || (skipDefaults && DEFAULT_EXCLUDED_DIRS.has(e))) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, skipDefaults, out);
    else out.push(p);
  }
  return out;
}

async function runFixtures(dir: string): Promise<Record<string, unknown>> {
  // Every rule folder's fixtures, each case as one PR, with every reporter's output: the determinism diff compares this.
  const out: Record<string, unknown> = {};
  const packs = readdirSync(dir).filter((p) => statSync(join(dir, p)).isDirectory());
  for (const pack of packs.sort()) {
    for (const folder of readdirSync(join(dir, pack)).sort()) {
      const ruleDir = join(dir, pack, folder);
      if (!existsSync(join(ruleDir, 'fixtures'))) continue;
      const ruleId = /^([A-Z]+\d{3})-/.exec(folder)?.[1];
      for (const kind of ['bad', 'good'] as const) {
        for (const c of loadCases(ruleDir, kind)) {
          const result = await runCase(c, ruleId);
          const contents = new Map(c.files.map((f) => [f.path, f.content]));
          const sarif = buildSarif(result, fullCatalog(), { version: VERSION, contents });
          const diff = new Map(c.files.map((f) => [f.path, new Set(f.content.split('\n').map((_, i) => i + 1))]));
          const review = planReview(result, { diff, previous: new Set(), config: result.config, reportOnly: true });
          out[`${folder}/${kind}/${c.name}`] = { findings: result.findings, suppressions: result.suppressions, files: result.files, sarif, review: review.review };
        }
      }
    }
  }
  return out;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.fixtures) {
    const data = await runFixtures(args.fixtures);
    const text = JSON.stringify(data, null, 1);
    if (args.out) writeFileSync(args.out, text);
    else process.stdout.write(text);
    return;
  }
  const configPath = args.config ?? join(args.root, '.lurie-guard.yml');
  const configText = existsSync(configPath) ? readFileSync(configPath, 'utf8') : undefined;
  // The config decides whether build output is walked at all (default_excludes); an invalid config is a usage error.
  let skipDefaults: boolean;
  try {
    skipDefaults = loadConfig(configText).defaultExcludes;
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(err.message);
      process.exit(2);
    }
    throw err;
  }
  const paths = args.files.length
    ? args.files.map((f) => f.replace(/\\/g, '/'))
    : walk(args.root, skipDefaults).map((p) => relative(args.root, p).replace(/\\/g, '/'));
  const files: InputFile[] = [];
  for (const p of paths) {
    const abs = resolve(args.root, p);
    if (!existsSync(abs) || statSync(abs).isDirectory()) continue;
    files.push({ path: p, status: args.modified.has(p) ? 'modified' : 'added', content: readFileSync(abs, 'utf8') });
  }
  let out;
  try {
    out = await run({
      files,
      configText,
      perFile: args.files.length === 0 && !args.oneSet,
      configOverride: (config) => {
        if (args.failOn) config.failOn = args.failOn;
        if (args.allRules) for (const r of fullCatalog()) if (r.folder) config.rules[r.id] = config.rules[r.id] ?? r.severity;
      },
      readSibling: (p) => {
        const abs = resolve(args.root, p);
        return existsSync(abs) ? readFileSync(abs, 'utf8') : undefined;
      },
    });
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(err.message);
      process.exit(2);
    }
    throw err;
  }
  let text: string;
  switch (args.format) {
    case 'json':
      text = JSON.stringify({ findings: out.result.findings, suppressions: out.result.suppressions, files: out.result.files, counts: out.counts, exitCode: out.exitCode }, null, 2);
      break;
    case 'sarif':
      text = JSON.stringify(out.sarif, null, 2);
      break;
    case 'summary':
      text = out.summary;
      break;
    default: {
      const lines: string[] = [];
      for (const f of out.result.findings) {
        const tag = f.suppressed ? ' (suppressed)' : '';
        lines.push(`${f.path}:${f.line}: ${f.severity} ${f.ruleId}${tag}: ${f.message.replace(/\s*\[evidence\]\((.*?)\)/, ' evidence: $1')}`);
      }
      lines.push(`${out.counts.findings} finding(s): ${out.counts.errors} error(s), ${out.counts.warnings} warning(s), ${out.counts.infos} info. ${out.result.files.length} file(s) analyzed, ${out.skipped.length} skipped. fail_on: ${out.config.failOn}.`);
      text = lines.join('\n') + '\n';
    }
  }
  if (args.out) writeFileSync(args.out, text);
  else process.stdout.write(text);
  process.exitCode = out.exitCode;
}

main().catch((err: Error) => {
  console.error(err.stack ?? err.message);
  process.exitCode = 2;
});
