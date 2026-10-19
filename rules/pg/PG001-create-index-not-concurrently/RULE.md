---
id: PG001
name: create-index-not-concurrently
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L99-L104
  - https://www.postgresql.org/docs/18/sql-createindex.html
verified: 2026-10-19
---

# PG001: `CREATE INDEX` without `CONCURRENTLY` on an existing table

## What it detects

`CREATE INDEX` or `CREATE UNIQUE INDEX` without `CONCURRENTLY`, on a table that is not created in the same migration set (this file plus every other added migration file of the PR).

## Why it matters

A plain `CREATE INDEX` "locks out writes (but not reads) on the table until it's done" ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html)). The db-skills bad example shows `pg_locks` for the session running `CREATE INDEX orders_created_at_idx ON orders (created_at)`: it holds `ShareLock` on `orders` for the whole build, and `SHARE` conflicts with the `ROW EXCLUSIVE` lock every `INSERT`, `UPDATE` and `DELETE` needs. On a table with traffic, every write waits for as long as the build takes.

## The fix

```sql
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);
```

Run it outside a transaction block (PG003 checks that). If the build fails, drop the invalid index with `DROP INDEX CONCURRENTLY IF EXISTS` and build again; never retry with `IF NOT EXISTS` (PG016).

## When it does not apply

- The table is created in the same migration set (`CREATE TABLE` in this file or in another added migration file of the PR): nothing reads it yet, so the lock costs nothing. The detector tracks the created tables across the PR.
- The statement already says `CONCURRENTLY`.
- A partitioned parent table: `CREATE INDEX CONCURRENTLY` is not supported on the parent, so the documented way is to build the index concurrently on each partition and then create the parent index without `CONCURRENTLY`. The detector cannot see that a table is partitioned; suppress with a reason that says so.
- An empty table or an agreed maintenance window: suppress with a reason (`-- lurie-guard: ignore PG001 reason="..."`).

## Message

> `CREATE INDEX` holds a `SHARE` lock on `orders` for the whole build; every insert, update and delete on `orders` waits. Build it with `CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at)`, outside a transaction (PG003 checks that). Not needed if `orders` is new in this release or empty. (PG001, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L99-L104))

## Fixtures

- `fixtures/bad/plain-index.sql`: the skill's `CREATE INDEX` on `orders`, plus a `CREATE UNIQUE INDEX`; both produce a finding with a suggested change.
- `fixtures/bad/rails/db/migrate/20261019120000_add_orders_created_at_index.rb`: `add_index` without `algorithm: :concurrently`, mapped by the detector.
- `fixtures/good/concurrently.sql`: the `CONCURRENTLY` form.
- `fixtures/good/new-table-same-file.sql`: the table is created in the same file.
- `fixtures/good/new-table-second-file/`: the table is created in another added file of the same PR.
- `fixtures/good/suppressed.sql`: the finding is suppressed with a reason.
- `fixtures/good/rails-concurrently/db/migrate/20261019120000_add_index_concurrently.rb`: `add_index ... algorithm: :concurrently` with `disable_ddl_transaction!`.
