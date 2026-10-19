// Framework table from SPEC-MVP.md, "Migration detection": the built-in globs,
// whether the tool wraps a file in a transaction, and how a file opts out.
import picomatch from 'picomatch';
import type { Framework, ResolvedConfig } from '../types.js';

export interface FrameworkDef {
  name: Framework;
  globs: string[];
  wrapped: boolean;
  wrapReason: string;
  /** Content marker required for the file to be classified as this framework. */
  marker?: (content: string) => boolean;
}

export const LIQUIBASE_HEADER = /^\s*--\s*liquibase\s+formatted\s+sql/im;
export const DBMATE_UP = /^\s*--\s*migrate:up\b/im;

export const FRAMEWORKS: FrameworkDef[] = [
  {
    name: 'liquibase',
    globs: ['**/changelog/**/*.sql'],
    wrapped: true,
    wrapReason: 'Liquibase runs each changeset in a transaction unless it says runInTransaction:false',
    marker: (c) => LIQUIBASE_HEADER.test(c),
  },
  {
    name: 'dbmate',
    globs: ['db/migrations/*.sql', '**/db/migrations/*.sql'],
    wrapped: true,
    wrapReason: 'dbmate wraps each migration in a transaction unless the section says transaction:false',
    marker: (c) => DBMATE_UP.test(c),
  },
  {
    name: 'flyway',
    globs: ['**/db/migration/V*__*.sql', '**/db/migration/R*__*.sql'],
    wrapped: true,
    wrapReason: 'Flyway runs each migration in a transaction unless its script configuration sets executeInTransaction=false',
  },
  {
    name: 'prisma',
    globs: ['prisma/migrations/*/migration.sql', '**/prisma/migrations/*/migration.sql'],
    wrapped: true,
    wrapReason: 'Prisma Migrate runs each migration in a transaction and has no opt-out',
  },
  {
    name: 'golang-migrate',
    globs: ['**/*.up.sql', '**/*.down.sql'],
    wrapped: false,
    wrapReason: 'golang-migrate runs the file statement by statement unless x-multi-statement is set',
  },
  {
    name: 'rails',
    globs: ['db/migrate/*.rb', '**/db/migrate/*.rb'],
    wrapped: true,
    wrapReason: 'Active Record runs each migration in a transaction unless the class calls disable_ddl_transaction!',
  },
  {
    name: 'alembic',
    globs: ['**/versions/*.py'],
    wrapped: true,
    wrapReason: 'Alembic runs the migration in a transaction (transaction_per_migration) unless the step runs in autocommit_block() or after an explicit COMMIT',
  },
  {
    name: 'django',
    globs: ['**/migrations/[0-9]*.py'],
    wrapped: true,
    wrapReason: 'Django runs each migration in a transaction unless the Migration class sets atomic = False',
  },
  {
    name: 'sqitch',
    globs: ['deploy/*.sql', '**/deploy/*.sql'],
    wrapped: true,
    wrapReason: 'Sqitch runs each deploy script in a transaction',
  },
  {
    name: 'sql',
    globs: ['migrations/**/*.sql', 'db/migrations/**/*.sql', 'sql/migrations/**/*.sql'],
    wrapped: false,
    wrapReason: 'plain SQL folder: treated as not wrapped unless the config says transaction: always or the file has BEGIN/COMMIT',
  },
];

/**
 * Build, dependency and VCS output that is never a migration source, excluded by
 * default (SPEC-MVP.md, "Migration detection"): Maven `target/`, Gradle `build/`
 * and `.gradle/`, IDE and .NET `out/`, `bin/`, `obj/`, bundlers' `dist/`, Node
 * `node_modules/`, Go and Ruby `vendor/`, Python `.venv/`, `venv/`,
 * `__pycache__/`, `.tox/`, and `.git/`. A Flyway migration copied to
 * `target/classes/db/migration/` would otherwise be reported twice.
 * `default_excludes: false` in `.lurie-guard.yml` turns the list off; `exclude` extends it.
 */
export const DEFAULT_EXCLUDES: readonly string[] = [
  '**/target/**',
  '**/build/**',
  '**/out/**',
  '**/dist/**',
  '**/node_modules/**',
  '**/vendor/**',
  '**/bin/**',
  '**/obj/**',
  '**/.gradle/**',
  '**/.git/**',
  '**/.venv/**',
  '**/venv/**',
  '**/__pycache__/**',
  '**/.tox/**',
];

/** The directory names of DEFAULT_EXCLUDES, for walkers that skip them without reading. */
export const DEFAULT_EXCLUDED_DIRS: ReadonlySet<string> = new Set(DEFAULT_EXCLUDES.map((g) => g.slice(3, -3)));

const matchers = new Map<Framework, (p: string) => boolean>();
function matcherFor(def: FrameworkDef): (p: string) => boolean {
  let m = matchers.get(def.name);
  if (!m) {
    m = picomatch(def.globs, { dot: true });
    matchers.set(def.name, m);
  }
  return m;
}

export function frameworkDef(name: Framework): FrameworkDef {
  const def = FRAMEWORKS.find((f) => f.name === name);
  if (!def) throw new Error(`unknown framework ${name}`);
  return def;
}

/** Classifies a path; undefined when it is not a migration under this config. */
export function classify(path: string, content: string, config: ResolvedConfig): FrameworkDef | undefined {
  const normalized = path.replace(/\\/g, '/').replace(/^\.\//, '');
  const excludes = [...(config.defaultExcludes ? DEFAULT_EXCLUDES : []), ...config.exclude];
  if (excludes.length && picomatch(excludes, { dot: true })(normalized)) return undefined;
  const byContent = FRAMEWORKS.find((f) => f.marker && matcherFor(f)(normalized) && f.marker(content));
  const byPath = FRAMEWORKS.find((f) => !f.marker && matcherFor(f)(normalized));
  const detected = byContent ?? byPath;

  if (config.paths) {
    if (!picomatch(config.paths, { dot: true })(normalized)) return undefined;
    if (config.framework !== 'auto') return frameworkDef(config.framework);
    return detected ?? frameworkDef('sql');
  }
  if (config.framework !== 'auto') return detected ? frameworkDef(config.framework) : undefined;
  return detected;
}
