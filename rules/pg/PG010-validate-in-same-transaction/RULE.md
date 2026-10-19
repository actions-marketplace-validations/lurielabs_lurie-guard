---
id: PG010
name: validate-in-same-transaction
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L69-L85
  - db-skills/skills/pg-online-migrations/examples/good/test.sql#L74-L91
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG010: `VALIDATE CONSTRAINT` in the same transaction as the `NOT VALID` add

## What it detects

`ALTER TABLE ... VALIDATE CONSTRAINT name` in the same transaction as the `ALTER TABLE ... ADD CONSTRAINT name ... NOT VALID` that created it: inside the same explicit `BEGIN` block, or in the same file when the framework wraps the file in one transaction (Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate, Sqitch, or `transaction: always`).

## Why it matters

Locks are "held until the end of the transaction" ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)). `ADD FOREIGN KEY ... NOT VALID` takes `SHARE ROW EXCLUSIVE` on both tables and `ADD CHECK ... NOT VALID` takes `ACCESS EXCLUSIVE`; when `VALIDATE` runs in the same transaction, its full scan happens while that lock is still held, which is exactly the one-step foreign key the db-skills bad example measures: a scan of `orders` under the lock and an `INSERT INTO accounts` from another session failing with `55P03`. The good example commits between the two steps and asserts that `VALIDATE` holds only `ShareUpdateExclusiveLock` on `orders` and `RowShareLock` on `accounts`, so writes continue.

## The fix

```sql
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
COMMIT;
BEGIN;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey;
```

Where the framework wraps each file in a transaction, put the `VALIDATE` in the next migration file, or use the framework's opt-out so the file runs statement by statement.

## When it does not apply

- The `ADD ... NOT VALID` and the `VALIDATE` are in different transactions: different files, or a `COMMIT` between them in a file that is not wrapped.
- The table is created in the same migration set.
- The constraint being validated was not added `NOT VALID` in this file (the detector only knows constraints it saw).

## Message

> `VALIDATE CONSTRAINT orders_account_id_fkey` runs in the same transaction as the `ADD ... NOT VALID` that created it (the same `BEGIN` block), so the full scan of `orders` runs while the `SHARE ROW EXCLUSIVE` on both tables lock from the `ADD` is still held: `NOT VALID` bought nothing. Commit after the `ADD` and validate in its own transaction: move it outside the `BEGIN` ... `COMMIT` block. Not needed if `orders` is new in this release or empty. (PG010, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L69-L85))

## Fixtures

- `fixtures/bad/same-begin-block.sql`: `ADD ... NOT VALID` and `VALIDATE` inside one `BEGIN` block, for a foreign key and a check.
- `fixtures/bad/flyway/db/migration/V3__fk.sql`: both steps in one Flyway file.
- `fixtures/good/separate-transactions.sql`: the skill's `COMMIT` between the steps.
- `fixtures/good/separate-files/`: the `VALIDATE` in the next Flyway migration.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
