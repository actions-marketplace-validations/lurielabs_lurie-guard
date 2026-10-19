---
id: PG013
name: rename-in-one-step
severity: warning
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/SKILL.md#L51
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG013: `RENAME COLUMN` / `RENAME TO` in one step

## What it detects

`ALTER TABLE ... RENAME COLUMN old TO new` and `ALTER TABLE ... RENAME TO new` on a table that is not created in the same migration set.

## Why it matters

The rename itself is a catalog change, but "the previous release keeps serving while and after the migration runs", and "a one-step `RENAME COLUMN` or `DROP COLUMN` breaks every query of that code when it commits" (pg-online-migrations, rule 8). Every `SELECT`, `INSERT` or `UPDATE` of the running release that names the old column fails with `42703` (undefined column) from the commit until the new release is fully deployed; with a rolling deploy that window is minutes. There is no measured fixture for the application-side failure, so the severity is `warning`.

## The fix

Expand/contract across releases:

```sql
ALTER TABLE orders ADD COLUMN customer_id bigint;
-- release N: dual-write account_id and customer_id, backfill in batches
-- release N+1: read customer_id
ALTER TABLE orders DROP COLUMN account_id;  -- release N+2
```

For a table rename, create a view with the old name over the new table during the transition, or the reverse.

## When it does not apply

- The table is created in the same migration set.
- No running code uses the old name (a column nobody reads, a table only the migration touches): suppress with a reason that names the release that stopped using it.

## Message

> `RENAME COLUMN account_id TO customer_id` breaks every query of the running release that reads or writes `orders.account_id` the moment it commits, and the old release keeps serving until the deploy finishes. Use expand/contract: add `customer_id`, dual-write both columns, backfill, switch reads to `customer_id`, then drop `account_id` in a later release. Not needed if `orders` is new in this release, or if no running code reads `account_id`: suppress with the reason naming that release. (PG013, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/SKILL.md#L51))

## Fixtures

- `fixtures/bad/rename.sql`: a column rename and a table rename.
- `fixtures/bad/rails/db/migrate/20261019120000_rename.rb`: `rename_column` and `rename_table`.
- `fixtures/good/suppressed.sql`: suppressed with the release that stopped reading the column.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
