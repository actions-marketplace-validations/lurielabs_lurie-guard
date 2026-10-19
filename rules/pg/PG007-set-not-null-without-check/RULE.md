---
id: PG007
name: set-not-null-without-check
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L87-L97
  - db-skills/skills/pg-online-migrations/examples/good/test.sql#L104-L118
  - https://www.postgresql.org/docs/15/sql-altertable.html
verified: 2026-10-19
---

# PG007: `SET NOT NULL` without a validated `CHECK (col IS NOT NULL)`

## What it detects

`ALTER TABLE ... ALTER COLUMN ... SET NOT NULL` on an existing table, when no `CHECK (col IS NOT NULL)` constraint on that column was added and validated earlier in the migration set. With `postgres_version: 18` or above in `.lurie-guard.yml`, a `NOT NULL ... NOT VALID` constraint on the column that was then validated also satisfies the rule.

## Why it matters

`SET NOT NULL` scans the whole table under `ACCESS EXCLUSIVE`; "however, if a valid `CHECK` constraint exists (and is not dropped in the same command) which proves no `NULL` can exist, then the table scan is skipped" ([ALTER TABLE 15](https://www.postgresql.org/docs/15/sql-altertable.html)). The db-skills examples count sequential scans of `orders` inside the transaction: the bare `SET NOT NULL` adds one scan of the 100,000 rows while `pg_locks` shows `AccessExclusiveLock` on `orders` (bad example); after a validated check, zero scans (good example). The `VALIDATE CONSTRAINT` step takes only `SHARE UPDATE EXCLUSIVE`, so writes continue while it scans. On PostgreSQL 18 the not-null constraint itself can be added `NOT VALID` and validated under the same weak lock, after which `pg_attribute.attnotnull` is true.

## The fix

PostgreSQL 15 to 17:

```sql
ALTER TABLE orders ADD CONSTRAINT orders_amount_not_null CHECK (amount IS NOT NULL) NOT VALID;  -- catalog only, commit at once
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_not_null;  -- separate transaction, writes continue
ALTER TABLE orders ALTER COLUMN amount SET NOT NULL;  -- skips the scan
ALTER TABLE orders DROP CONSTRAINT orders_amount_not_null;
```

PostgreSQL 18:

```sql
ALTER TABLE orders ADD CONSTRAINT orders_amount_not_null NOT NULL amount NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_not_null;
```

## When it does not apply

- The table is created in the same migration set.
- A `CHECK (col IS NOT NULL)` on the column was added (with or without `NOT VALID`) and validated earlier in this file or in an earlier added file of the PR. The detector tracks constraints by name across `ADD CONSTRAINT` and `VALIDATE CONSTRAINT`.
- `postgres_version: 18` or above, and a `NOT NULL ... NOT VALID` constraint on the column was validated earlier. On the default `postgres_version: 15` that path is reported, because the syntax does not exist there.
- A `NOT NULL` added together with the column (`ADD COLUMN ... NOT NULL DEFAULT ...`) is not this statement shape (PG006 covers it).

## Message

> `SET NOT NULL` scans every row of `orders` to check `amount` while it holds `ACCESS EXCLUSIVE`: reads and writes wait for the whole scan. Add `CHECK (amount IS NOT NULL) NOT VALID` first, `VALIDATE CONSTRAINT` it in a separate transaction (writes continue), then `SET NOT NULL` skips the scan. Not needed if `orders` is new in this release or empty. (PG007, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L87-L97))

## Fixtures

- `fixtures/bad/bare-set-not-null.sql`: the skill's bare `SET NOT NULL`.
- `fixtures/bad/pg18-path-on-pg15.sql`: the PostgreSQL 18 path with the default `postgres_version: 15`.
- `fixtures/bad/rails/db/migrate/20261019120000_amount_not_null.rb`: `change_column_null :orders, :amount, false`.
- `fixtures/good/validated-check.sql`: the skill's validated `CHECK` path.
- `fixtures/good/check-in-earlier-file/`: the `CHECK` is added and validated in an earlier added file of the PR.
- `fixtures/good/pg18-not-valid/`: the PostgreSQL 18 path with `postgres_version: 18`.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
