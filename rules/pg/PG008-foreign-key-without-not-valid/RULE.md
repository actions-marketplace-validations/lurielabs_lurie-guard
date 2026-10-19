---
id: PG008
name: foreign-key-without-not-valid
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L69-L85
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG008: `ADD FOREIGN KEY` without `NOT VALID`

## What it detects

`ALTER TABLE ... ADD [CONSTRAINT name] FOREIGN KEY (...) REFERENCES ...` without `NOT VALID`, on a table that is not created in the same migration set.

## Why it matters

`ADD FOREIGN KEY` takes `SHARE ROW EXCLUSIVE` on the table and on the referenced table ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), and in one step it also validates every existing row under that lock. The db-skills bad example adds `orders_account_id_fkey` on the 100,000-row `orders` inside a transaction and asserts that the statement scanned `orders` (`xact_seq_scans` grows), that `pg_locks` shows `ShareRowExclusiveLock` on `accounts` as well, and that an `INSERT INTO accounts` from another session fails with `55P03`: a signup is blocked by a migration on `orders`. With `NOT VALID` the same lock is held only for the catalog change; `VALIDATE CONSTRAINT` then "acquires a `SHARE UPDATE EXCLUSIVE` lock" and a `ROW SHARE` lock on the referenced table, so it "does not need to lock out concurrent updates" (good example, `pg_locks` asserted).

## The fix

```sql
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
-- separate transaction (a separate migration where the tool wraps files):
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey;
```

## When it does not apply

- The table is created in the same migration set: no rows to validate.
- The constraint already says `NOT VALID` (PG010 then checks that the `VALIDATE` is not in the same transaction).
- A column-level `REFERENCES` inside `ADD COLUMN`: the new column is all `NULL`, so there is nothing to validate; not this statement shape.
- Partitioned tables need PostgreSQL 18 or above for `NOT VALID` foreign keys; on older majors, suppress with a reason.

## Message

> `ADD FOREIGN KEY` validates every row of `orders` while it holds `SHARE ROW EXCLUSIVE` on `orders` and on `accounts`: writes on both tables wait for the whole scan. Add it with `NOT VALID` (catalog only), then `ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey` in a separate transaction, which takes only `SHARE UPDATE EXCLUSIVE` and lets writes continue. Not needed if `orders` is new in this release or empty. (PG008, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L69-L85))

## Fixtures

- `fixtures/bad/one-step-fk.sql`: the skill's one-step foreign key (named), and an unnamed one whose suggestion adds a name so it can be validated.
- `fixtures/bad/rails/db/migrate/20261019120000_add_fk.rb`: `add_foreign_key` without `validate: false`.
- `fixtures/good/not-valid.sql`: the skill's `NOT VALID` then `VALIDATE` path.
- `fixtures/good/rails-validate-false/db/migrate/20261019120000_add_fk.rb`: `add_foreign_key ..., validate: false`.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
