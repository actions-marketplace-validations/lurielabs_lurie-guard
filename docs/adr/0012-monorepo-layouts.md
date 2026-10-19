# ADR 0012: Migration globs match at any depth

Status: accepted, 2026-10-19

## Context

The first self-pilot runs of the CLI over the sister repositories analyzed nothing in go-skills: its migrations live in `skills/db-migrations/examples/good/migrations/00001_create_users.sql`, and the plain-SQL globs in [SPEC-MVP.md](../SPEC-MVP.md) were anchored at the repository root (`migrations/**/*.sql`, `db/migrations/**/*.sql`, `sql/migrations/**/*.sql`). Monorepos have the same shape: `services/<name>/migrations/`, `apps/<name>/db/migrate/`, `packages/<name>/prisma/migrations/`. The framework globs already matched at any depth (`**/db/migration/V*__*.sql`, `**/db/migrate/*.rb`, `**/prisma/migrations/*/migration.sql`, `**/migrations/[0-9]*.py`, `**/versions/*.py`, `**/deploy/*.sql`, `**/db/migrations/*.sql` with the dbmate marker); only the plain-SQL folder was root-only.

## Decision

Every built-in glob matches at any depth: the plain-SQL globs become `**/migrations/**/*.sql`, `**/db/migrations/**/*.sql` and `**/sql/migrations/**/*.sql`. Framework detection order is unchanged (content markers first, then the framework-specific paths, plain SQL last), so a nested Prisma or Flyway folder keeps its framework. The default excludes ([SPEC-MVP.md](../SPEC-MVP.md), "Migration detection") still win: `target/`, `build/`, `node_modules/`, `vendor/` and the rest are never analyzed unless the config says `default_excludes: false`. `paths` and `exclude` in `.lurie-guard.yml` override everything, as before.

## Alternatives considered

- **Keep root-anchored globs and ask monorepos for `paths:`.** Works, but the first run on a monorepo then reviews nothing and says so only in the summary; the pilots' first impression would be "it does not see my migrations". Rejected.
- **A `services/*/` convention.** Guesses one layout among many. Rejected.

## Consequences

- A repository with a non-migration `migrations/` folder of SQL (seed scripts, report queries) gets findings there; the fix is one `exclude:` line, and the summary lists every file analyzed.
- The rule fixtures of this repository (`rules/pg/*/fixtures/**/migrations/*.sql`) now match too; the repository's own `.lurie-guard.yml` keeps `paths: [fixtures/self/**/*.sql]`, so the self-review job reviews only the dogfooding folder.
