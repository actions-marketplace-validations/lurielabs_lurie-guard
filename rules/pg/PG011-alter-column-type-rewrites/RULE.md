---
id: PG011
name: alter-column-type-rewrites
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L62-L67
  - db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L47-L52
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG011: `ALTER COLUMN ... TYPE` that rewrites the table

## What it detects

`ALTER TABLE ... ALTER COLUMN ... TYPE` on a table that is not created in the same migration set. The detector sees only the new type, not the column's current type, so it reports every retype of an existing table and names the binary-coercible cases in the message.

## Why it matters

A type change "will normally cause the entire table and its indexes to be rewritten", unless the old type is binary coercible to the new one and there is no `USING` clause ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)); rebuilds "temporarily require as much as double the disk space". The db-skills bad examples assert it twice with `pg_relation_filenode`: `int` to `bigint` on the 100,000-row `orders`, and `varchar(20)` to `varchar(10)` on `customers`, both write a new copy of the table under `ACCESS EXCLUSIVE`, which blocks reads and writes for the whole copy.

## The fix

Expand/contract across releases:

```sql
ALTER TABLE orders ADD COLUMN account_id_new bigint;
-- dual-write account_id and account_id_new from the application; backfill in batches
-- switch reads to account_id_new; then, in a later release:
ALTER TABLE orders DROP COLUMN account_id;
ALTER TABLE orders RENAME COLUMN account_id_new TO account_id;
```

## When it does not apply

- The table is created in the same migration set.
- The current type is binary-coercible to the new one: `varchar(n)` to a larger or unbounded `varchar` or to `text`, `numeric(p,s)` to a larger `p` with the same `s`, `timestamp(p)` to a larger precision. The detector cannot see the current type from the diff, so these are reported; suppress with a reason that names the current type (`-- lurie-guard: ignore PG011 reason="varchar(50) to varchar(200), binary-coercible"`).
- A small lookup table that fits in a few pages: the rewrite takes milliseconds; suppress with a reason, and keep `lock_timeout` set (PG004).

## Message

> `ALTER COLUMN account_id TYPE bigint` rewrites every row of `orders` and rebuilds all its indexes under `ACCESS EXCLUSIVE` (`pg_relation_filenode` changes), unless the current type is binary-coercible to the new one. Change the type with expand/contract: add a new column of type bigint, dual-write, backfill in batches, switch reads, drop the old column in a later release. Not needed if `orders` is new in this release or empty, or if the current type is binary-coercible (varchar(n) to a larger or unbounded varchar or to text, numeric(p,s) to a larger p, timestamp(p) to a larger p): then suppress with a reason that names the current type. (PG011, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L62-L67))

## Fixtures

- `fixtures/bad/int-to-bigint.sql`: the skill's `int` to `bigint`, and `varchar(20)` to `varchar(10)` from pg-keys-and-types.
- `fixtures/bad/rails/db/migrate/20261019120000_retype.rb`: `change_column :orders, :account_id, :bigint`.
- `fixtures/good/binary-coercible-suppressed.sql`: `varchar(50)` to `text` suppressed with the reason naming the current type.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
