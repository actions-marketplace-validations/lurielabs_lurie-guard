---
id: PG005
name: add-column-rewrites-table
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L51-L60
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG005: `ADD COLUMN` that rewrites the table

## What it detects

`ALTER TABLE ... ADD COLUMN` on an existing table with a volatile `DEFAULT` (`clock_timestamp()`, `random()`, `gen_random_uuid()`, `uuidv7()`, `nextval()`, a subquery, or any function not in the detector's list of built-in stable and immutable functions), a `GENERATED ... STORED` column, or a `GENERATED ... AS IDENTITY` column.

## Why it matters

"Adding a column with a volatile `DEFAULT` (e.g., `clock_timestamp()`), a stored generated column, an identity column, or a column with a domain data type that has constraints will cause the entire table and its indexes to be rewritten" ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)). The db-skills bad example adds `created_at timestamptz NOT NULL DEFAULT clock_timestamp()` to `orders` (100,000 rows) and asserts that `pg_relation_filenode('orders')` and `pg_relation_filenode('orders_pkey')` both change: a full copy of the table and its indexes, under `ACCESS EXCLUSIVE`, which blocks reads and writes for the whole copy and "temporarily require[s] as much as double the disk space". A constant default is metadata-only: the good example adds `status text NOT NULL DEFAULT 'new'` and the filenode stays.

## The fix

```sql
ALTER TABLE orders ADD COLUMN created_at timestamptz;
ALTER TABLE orders ALTER COLUMN created_at SET DEFAULT clock_timestamp();  -- new rows only
-- backfill the existing rows in batches, each batch its own transaction
-- then, if the column must be NOT NULL: the validated-CHECK path (PG007)
```

## When it does not apply

- The table is created in the same migration set.
- The default is a constant or a call to a stable or immutable built-in (`now()`, `current_timestamp`, `lower(...)`, `coalesce(...)`): PostgreSQL evaluates it once and stores it in the metadata, no rewrite.
- A user-defined function marked `IMMUTABLE` or `STABLE`: the detector cannot see function volatility from the diff, so it treats unknown functions as volatile; suppress with a reason that names the function's volatility.
- A domain type with constraints also rewrites the table, but the detector cannot see domain definitions; not detected.

## Message

> `ADD COLUMN created_at` rewrites every row of `orders` and rebuilds all its indexes under `ACCESS EXCLUSIVE` (`pg_relation_filenode` changes): `DEFAULT clock_timestamp()` is volatile, so every existing row gets its own value and the table is rewritten. Add the column nullable, set the default separately so only new rows get it, and backfill the existing rows in batches. Not needed if `orders` is new in this release or empty. (PG005, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L51-L60))

## Fixtures

- `fixtures/bad/volatile-default.sql`: the skill's `DEFAULT clock_timestamp()`, plus `gen_random_uuid()`, `nextval()` and a user-defined function.
- `fixtures/bad/generated-and-identity.sql`: a `GENERATED ... STORED` column and an identity column.
- `fixtures/good/constant-default.sql`: the skill's `DEFAULT 'new'`, `DEFAULT now()`, `DEFAULT 0`, and the nullable-then-`SET DEFAULT` path.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
