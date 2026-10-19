// The migration detector: which files are migrations, under which framework,
// whether the framework wraps them in a transaction, and the SQL in each.
import type { FileStatus, MigrationFile, ResolvedConfig, SqlSegment } from '../types.js';
import { classify, DBMATE_UP, type FrameworkDef } from './frameworks.js';
import { extractPython } from './python.js';
import { extractRuby } from './ruby.js';

export interface InputFile {
  path: string;
  status: FileStatus;
  content: string;
}

export interface DetectOptions {
  config: ResolvedConfig;
  /** Reads a file next to a migration (Flyway's `<file>.sql.conf`); undefined when absent. */
  readSibling?: (path: string) => string | undefined;
}

const CHANGESET = /^\s*--\s*changeset\b(.*)$/i;
const DBMATE_SECTION = /^\s*--\s*migrate:(up|down)\b(.*)$/i;

function liquibaseSegments(content: string): SqlSegment[] {
  const lines = content.split('\n');
  const segments: SqlSegment[] = [];
  let current: string[] = [];
  let currentLine = 1;
  let optOut = false;
  const flush = (): void => {
    if (current.length) segments.push({ sql: current.join('\n'), line: currentLine, transactionOptOut: optOut || undefined });
  };
  lines.forEach((text, i) => {
    const m = CHANGESET.exec(text);
    if (m) {
      flush();
      current = [];
      currentLine = i + 1;
      optOut = /runInTransaction\s*:\s*false/i.test(m[1]);
    }
    current.push(text);
  });
  flush();
  return segments;
}

function dbmateSegments(content: string): { segments: SqlSegment[]; anyOptOut: boolean } {
  const lines = content.split('\n');
  const segments: SqlSegment[] = [];
  let current: string[] = [];
  let currentLine = 1;
  let optOut = false;
  let anyOptOut = false;
  const flush = (): void => {
    if (current.length) segments.push({ sql: current.join('\n'), line: currentLine, transactionOptOut: optOut || undefined });
  };
  lines.forEach((text, i) => {
    const m = DBMATE_SECTION.exec(text);
    if (m) {
      flush();
      current = [];
      currentLine = i + 1;
      optOut = /transaction\s*:\s*false/i.test(m[2]);
      if (optOut) anyOptOut = true;
    }
    current.push(text);
  });
  flush();
  return { segments, anyOptOut };
}

export async function detectMigrations(files: InputFile[], opts: DetectOptions): Promise<MigrationFile[]> {
  const out: MigrationFile[] = [];
  for (const f of files) {
    const def = classify(f.path, f.content, opts.config);
    if (!def) continue;
    const m = await toMigration(f, def, opts);
    if (m) out.push(m);
  }
  return out;
}

async function toMigration(f: InputFile, def: FrameworkDef, opts: DetectOptions): Promise<MigrationFile | undefined> {
  const { config } = opts;
  const base: MigrationFile = {
    path: f.path,
    status: f.status,
    content: f.content,
    framework: def.name,
    wrapped: def.wrapped,
    wrapReason: def.wrapReason,
    segments: [],
    notAnalyzed: [],
  };
  switch (def.name) {
    case 'rails': {
      const x = await extractRuby(f.content);
      base.segments = x.segments;
      base.notAnalyzed = x.notAnalyzed;
      base.comments = x.comments;
      if (x.transactionOptOut) {
        base.wrapped = false;
        base.wrapReason = 'disable_ddl_transaction! is set';
      }
      break;
    }
    case 'django':
    case 'alembic': {
      const x = await extractPython(f.content, def.name);
      base.segments = x.segments;
      base.notAnalyzed = x.notAnalyzed;
      base.comments = x.comments;
      if (x.transactionOptOut) {
        base.wrapped = false;
        base.wrapReason = 'atomic = False is set';
      }
      break;
    }
    case 'liquibase':
      base.segments = liquibaseSegments(f.content);
      break;
    case 'dbmate': {
      const d = dbmateSegments(f.content);
      base.segments = d.segments;
      if (d.anyOptOut && d.segments.every((s) => s.transactionOptOut)) {
        base.wrapped = false;
        base.wrapReason = 'transaction:false is set on every section';
      }
      break;
    }
    case 'flyway': {
      base.segments = [{ sql: f.content, line: 1 }];
      const conf = opts.readSibling?.(`${f.path}.conf`);
      if (conf && /^\s*executeInTransaction\s*=\s*false\s*$/im.test(conf)) {
        base.wrapped = false;
        base.wrapReason = `${f.path}.conf sets executeInTransaction=false`;
      }
      break;
    }
    default:
      base.segments = [{ sql: f.content, line: 1 }];
      if (def.name === 'sql' && DBMATE_UP.test(f.content)) base.framework = 'dbmate';
  }
  if (config.transaction === 'always') {
    base.wrapped = true;
    base.wrapReason = 'config: transaction: always';
    for (const s of base.segments) delete s.transactionOptOut;
  } else if (config.transaction === 'never') {
    base.wrapped = false;
    base.wrapReason = 'config: transaction: never';
  }
  return base;
}
