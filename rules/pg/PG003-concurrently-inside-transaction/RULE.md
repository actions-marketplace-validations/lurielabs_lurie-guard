---
id: PG003
name: concurrently-inside-transaction
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/good/test.sql#L129-L131
  - https://www.postgresql.org/docs/18/sql-createindex.html
verified: 2026-10-19
---

# PG003: `CONCURRENTLY` inside a transaction

## What it detects

`CREATE INDEX CONCURRENTLY`, `DROP INDEX CONCURRENTLY`, `REINDEX ... CONCURRENTLY` or `REFRESH MATERIALIZED VIEW CONCURRENTLY` inside an explicit `BEGIN` block, or in a file that the migration framework wraps in a transaction without the framework's opt-out (Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate, Sqitch, goose; see the table in [SPEC-MVP.md](../../../docs/SPEC-MVP.md)).

## Why it matters

`CREATE INDEX CONCURRENTLY` "cannot" run "within a transaction block" ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html)). The db-skills good example runs it from inside a function, which is a transaction block, and asserts SQLSTATE `25001` (`active_sql_transaction`). The migration fails at deploy time, and in most frameworks the failed migration leaves the deploy half done.

## The fix

Run the statement outside a transaction. How depends on the framework:

```text
goose      -- +goose NO TRANSACTION at the top of the file
Flyway     <file>.sql.conf with executeInTransaction=false
Liquibase  --changeset author:id runInTransaction:false
Rails      disable_ddl_transaction! in the migration class
Django     atomic = False on the Migration class
Alembic    with op.get_context().autocommit_block():
dbmate     -- migrate:up transaction:false
Prisma     no opt-out: run it outside Prisma Migrate
Plain SQL  move it outside the BEGIN ... COMMIT block
```

## When it does not apply

- The file is not wrapped: a plain SQL folder run statement by statement (golang-migrate, or `transaction: never` in `.lurie-guard.yml`), a Flyway migration with `executeInTransaction=false`, a Rails migration with `disable_ddl_transaction!`, a Django migration with `atomic = False`, an Alembic step in `autocommit_block()`, a dbmate section with `transaction:false`, a Liquibase changeset with `runInTransaction:false`, a goose file with `-- +goose NO TRANSACTION`.
- The statement is outside the explicit `BEGIN` ... `COMMIT` block of the file.

## Message

> `CREATE INDEX CONCURRENTLY` cannot run inside a transaction block: PostgreSQL rejects it with SQLSTATE `25001` and the migration fails. This statement runs in a file flyway wraps in a transaction. Fix: Flyway: create `<file>.sql.conf` next to the migration with `executeInTransaction=false`. No exception: the statement never works inside a transaction. (PG003, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/good/test.sql#L129-L131))

## Fixtures

- `fixtures/bad/explicit-begin.sql`: `CREATE INDEX CONCURRENTLY` and `DROP INDEX CONCURRENTLY` inside `BEGIN` ... `COMMIT`.
- `fixtures/bad/flyway/db/migration/V2__index.sql`: a Flyway migration without the `.conf` opt-out.
- `fixtures/bad/rails/db/migrate/20261019120000_index.rb`: Rails without `disable_ddl_transaction!`.
- `fixtures/bad/django/app/migrations/0002_index.py`: Django `RunSQL` without `atomic = False`.
- `fixtures/bad/prisma/prisma/migrations/20261019_index/migration.sql`: Prisma, which has no opt-out.
- `fixtures/bad/dbmate/db/migrations/20261019_index.sql`: dbmate without `transaction:false`.
- `fixtures/bad/liquibase/changelog/002_index.sql`: a Liquibase changeset without `runInTransaction:false`.
- `fixtures/bad/alembic/alembic/versions/0002_index.py`: Alembic `op.execute` outside `autocommit_block()`.
- `fixtures/bad/sqitch/deploy/index.sql`: Sqitch, wrapped.
- `fixtures/bad/goose/migrations/00003_index_users_display_name.sql`: goose without `-- +goose NO TRANSACTION` (from go-skills).
- `fixtures/bad/sql-always/`: a plain SQL folder with `transaction: always` in the config.
- `fixtures/good/outside-transaction.sql`: the statements after `COMMIT`.
- `fixtures/good/flyway-opt-out/`: the `.conf` sets `executeInTransaction=false`.
- `fixtures/good/rails-opt-out/`: `disable_ddl_transaction!`.
- `fixtures/good/django-opt-out/`: `atomic = False`.
- `fixtures/good/dbmate-opt-out/`: `-- migrate:up transaction:false`.
- `fixtures/good/liquibase-opt-out/`: `runInTransaction:false`.
- `fixtures/good/alembic-opt-out/`: `autocommit_block()`.
- `fixtures/good/golang-migrate/`: statement-by-statement runner, not wrapped.
- `fixtures/good/goose-no-transaction/`: `-- +goose NO TRANSACTION`.
- `fixtures/good/goose-down-only/`: the only `CONCURRENTLY` is in the Down section, which is not analyzed by default; the Up carries a `StatementBegin/End` function body.
