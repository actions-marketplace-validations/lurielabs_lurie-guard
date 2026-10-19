---
id: PG016
name: create-index-concurrently-if-not-exists
severity: warning
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L107-L115
  - https://www.postgresql.org/docs/18/sql-createindex.html
verified: 2026-10-19
---

# PG016: `CREATE INDEX CONCURRENTLY IF NOT EXISTS`

## What it detects

`CREATE [UNIQUE] INDEX CONCURRENTLY IF NOT EXISTS`, on any table.

## Why it matters

A concurrent build that fails (a deadlock, a duplicate in a unique index, a timeout, a cancelled migration) leaves an index marked `INVALID`: "the index will be marked invalid... it will still consume update overhead" and queries ignore it ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html), "Building Indexes Concurrently"). The db-skills bad example makes a unique concurrent build fail on a duplicate, then retries it with `IF NOT EXISTS`: the retry sees the invalid index by name, skips the build, and `pg_index.indisvalid` stays false. The migration reports success and the table has no usable index. The documented recovery is to drop the index and build it again, or `REINDEX INDEX CONCURRENTLY`.

## The fix

```sql
DROP INDEX CONCURRENTLY IF EXISTS accounts_email_idx;
CREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);
```

## When it does not apply

- A runner that never retries a failed step and never re-runs a migration: `IF NOT EXISTS` is then harmless but useless; the rule is a `warning` for that reason.
- `CREATE INDEX IF NOT EXISTS` without `CONCURRENTLY` cannot leave an invalid index (PG001 applies to it instead).

## Message

> `CREATE INDEX CONCURRENTLY IF NOT EXISTS` skips the build when a previous concurrent build of `accounts_email_idx` failed and left it `INVALID`: the index exists by name, so nothing is rebuilt, writes keep maintaining it and queries on `accounts` never use it. Recover a failed build with `DROP INDEX CONCURRENTLY IF EXISTS accounts_email_idx` and then `CREATE INDEX CONCURRENTLY` again (or `REINDEX INDEX CONCURRENTLY`), without `IF NOT EXISTS`. Not needed if the migration runner never retries a failed step; then `IF NOT EXISTS` only hides the invalid index. (PG016, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L107-L115))

## Fixtures

- `fixtures/bad/if-not-exists.sql`: the skill's retry with `IF NOT EXISTS`.
- `fixtures/bad/rails/db/migrate/20261019120000_index.rb`: `add_index ..., algorithm: :concurrently, if_not_exists: true`.
- `fixtures/good/drop-and-rebuild.sql`: the skill's `DROP INDEX CONCURRENTLY IF EXISTS` then rebuild.
