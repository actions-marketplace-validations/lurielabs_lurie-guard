---
id: PG006
name: add-column-not-null-without-default
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L117-L123
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG006: `ADD COLUMN ... NOT NULL` without a default on an existing table

## What it detects

`ALTER TABLE ... ADD COLUMN ... NOT NULL` with no `DEFAULT`, no identity, no generated expression and not a `serial` type, on a table that is not created in the same migration set.

## Why it matters

Nothing gives the existing rows a value, so the statement cannot succeed on a table with rows. The db-skills bad example runs `ALTER TABLE orders ADD COLUMN sku text NOT NULL` on the 100,000-row `orders` and asserts SQLSTATE `23502` (`not_null_violation`, "column contains null values"): the migration aborts at deploy time, after taking `ACCESS EXCLUSIVE` on the table to find that out. It passes on the empty database of the test suite, which is why it reaches review. With a constant default the column is metadata-only: "the default value is evaluated at the time of the statement and the result stored in the table's metadata" ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)); the good example adds `status text NOT NULL DEFAULT 'new'` and the filenode stays.

## The fix

```sql
ALTER TABLE orders ADD COLUMN sku text NOT NULL DEFAULT 'unknown';
```

Or, when no constant makes sense: add it nullable, backfill in batches, then make it `NOT NULL` through a validated `CHECK` (PG007).

## When it does not apply

- The table is created in the same migration set.
- The column has a `DEFAULT` (a volatile one is PG005), is an identity column, a generated column or a `serial`: each gives every row a value (identity and generated rewrite the table, PG005).
- The column is a `PRIMARY KEY` in the same clause: the key fails for other reasons on a non-empty table (PG012 and PG017 apply).

## Message

> `ADD COLUMN sku ... NOT NULL` without a default fails on any table that has rows: nothing fills the existing rows of `orders`, so PostgreSQL rejects the statement with SQLSTATE `23502` and the migration aborts. Add it with a constant default (`NOT NULL DEFAULT <constant>`: metadata-only, no rewrite), or add it nullable, backfill in batches, then `SET NOT NULL` through a validated `CHECK` (PG007). Not needed if `orders` is new in this release or empty. (PG006, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L117-L123))

## Fixtures

- `fixtures/bad/not-null-no-default.sql`: the skill's `ADD COLUMN sku text NOT NULL`.
- `fixtures/bad/rails/db/migrate/20261019120000_add_sku.rb`: `add_column ..., null: false` without `default:`.
- `fixtures/good/constant-default.sql`: `NOT NULL DEFAULT 'new'` and a nullable column.
- `fixtures/good/identity-and-serial.sql`: identity and `serial` columns fill themselves (PG005 and PG017 report those).
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
