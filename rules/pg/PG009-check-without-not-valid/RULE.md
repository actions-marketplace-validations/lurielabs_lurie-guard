---
id: PG009
name: check-without-not-valid
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/good/test.sql#L96-L102
  - db-skills/skills/pg-keys-and-types/examples/good/test.sql#L61-L67
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG009: `ADD CHECK` without `NOT VALID`

## What it detects

`ALTER TABLE ... ADD [CONSTRAINT name] CHECK (...)` without `NOT VALID`, on a table that is not created in the same migration set.

## Why it matters

`ALTER TABLE ... ADD CONSTRAINT` takes `ACCESS EXCLUSIVE` ("an `ACCESS EXCLUSIVE` lock is acquired unless explicitly noted", [ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), and without `NOT VALID` it scans every row under that lock: reads and writes wait for the whole scan. The db-skills good example shows the alternative measured: `ADD CONSTRAINT ... CHECK (...) NOT VALID` holds `AccessExclusiveLock` only for the catalog change (`pg_locks` asserted, commit at once), and `VALIDATE CONSTRAINT` then runs under `SHARE UPDATE EXCLUSIVE`, which does not block reads or writes. The pg-keys-and-types good example swaps a `CHECK` with `NOT VALID` then `VALIDATE` on a live table and asserts that the table's filenode does not change.

## The fix

```sql
ALTER TABLE orders ADD CONSTRAINT orders_amount_check CHECK (amount >= 0) NOT VALID;
-- separate transaction (a separate migration where the tool wraps files):
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check;
```

## When it does not apply

- The table is created in the same migration set.
- The constraint already says `NOT VALID` (PG010 then checks that the `VALIDATE` is not in the same transaction).
- A `CHECK` inside `ADD COLUMN` (a column constraint on a new column) is not this statement shape.

## Message

> `ADD CHECK` scans every row of `orders` to validate the constraint while it holds `ACCESS EXCLUSIVE`: reads and writes wait for the whole scan. Add it with `NOT VALID` (catalog only, milliseconds under the same lock), then `ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check` in a separate transaction, which takes only `SHARE UPDATE EXCLUSIVE`. Not needed if `orders` is new in this release or empty. (PG009, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/good/test.sql#L96-L102))

## Fixtures

- `fixtures/bad/one-step-check.sql`: a named and an unnamed `CHECK` without `NOT VALID`.
- `fixtures/good/not-valid.sql`: the skill's `NOT VALID` then `VALIDATE` path.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
