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
//
// With no files, every file under --root that the detector classifies as a
// migration is reviewed as "added": the way the pilots scan history.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import type { InputFile } from './detector/index.js';
import { loadCases, runCase } from './harness-core.js';
import { buildSarif } from './reporters/sarif.js';
import { planReview } from './reporters/review.js';
import { ConfigError, fullCatalog, run, VERSION } from './run.js';

interface Args {
  root: string;
  config?: string;
  modified: Set<string>;
  format: 'text' | 'json' | 'sarif' | 'summary';
  out?: string;
  failOn?: 'none' | 'warning' | 'error';
  allRules: boolean;
  fixtures?: string;
  files: string[];
}

function parseArgs(argv: string[]): Args {
  const a: Args = { root: process.cwd(), modified: new Set(), format: 'text', allRules: false, files: [] };
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
      case '--fixtures':
        a.fixtures = resolve(next());
        break;
      case '--version':
        console.log(VERSION);
        process.exit(0);
        break;
      case '--help':
      case '-h':
        console.log(readFileSync(new URL(import.meta.url)).toString().split('\n').slice(0, 16).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
        process.exit(0);
        break;
      default:
        if (x.startsWith('-')) throw new Error(`unknown option ${x}`);
        a.files.push(x);
    }
  }
  return a;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir).sort()) {
    if (e === 'node_modules' || e === '.git') continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
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
  const paths = args.files.length ? args.files.map((f) => f.replace(/\\/g, '/')) : walk(args.root).map((p) => relative(args.root, p).replace(/\\/g, '/'));
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
