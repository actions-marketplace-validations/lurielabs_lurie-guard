---
id: PG012
name: unique-or-pk-without-using-index
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L125-L140
  - db-skills/skills/pg-online-migrations/examples/good/test.sql#L146-L151
  - https://www.postgresql.org/docs/18/sql-altertable.html
verified: 2026-10-19
---

# PG012: `ADD UNIQUE` / `ADD PRIMARY KEY` without `USING INDEX`

## What it detects

`ALTER TABLE ... ADD [CONSTRAINT name] UNIQUE (...)` or `PRIMARY KEY (...)` without `USING INDEX`, on a table that is not created in the same migration set.

## Why it matters

Without a prebuilt index, `ADD CONSTRAINT` builds the unique index itself inside the `ALTER TABLE`, which holds `ACCESS EXCLUSIVE`. The db-skills bad example adds `UNIQUE (email)` on `accounts` inside a transaction and asserts that the statement scanned the table (`xact_seq_scans` grows), that `pg_locks` shows `AccessExclusiveLock,ShareLock` on `accounts` until commit, and that an `INSERT INTO accounts` from another session fails with `55P03`. `ADD CONSTRAINT ... USING INDEX` over an index built with `CREATE UNIQUE INDEX CONCURRENTLY` "is a fast operation" ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)); the good example does it and asserts that the constraint enforces uniqueness (`23505`).

## The fix

```sql
CREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);  -- outside a transaction
ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE USING INDEX accounts_email_idx;
```

For a `PRIMARY KEY`, the key columns must already be `NOT NULL` (PG007), or `USING INDEX` runs `SET NOT NULL` with its full scan. The index must be a plain b-tree with default sort order, not partial and without expressions, and the form is not available on partitioned tables.

## When it does not apply

- The table is created in the same migration set.
- The constraint already says `USING INDEX`.
- A partitioned table: `USING INDEX` is not available; suppress with a reason.

## Message

> `ADD UNIQUE` builds the unique index itself while it holds `ACCESS EXCLUSIVE` on `accounts` (plus the build's `SHARE`): it scans the table and every read and write waits for the whole build. Build the index first with `CREATE UNIQUE INDEX CONCURRENTLY accounts_email_key_idx ON accounts (email)`, then `ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE USING INDEX accounts_email_key_idx`, a catalog change. Not needed if `accounts` is new in this release or empty. (PG012, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L125-L140))

## Fixtures

- `fixtures/bad/unique-and-pk.sql`: the skill's `ADD CONSTRAINT ... UNIQUE (email)`, an unnamed `UNIQUE`, and `ADD PRIMARY KEY (id)`.
- `fixtures/good/using-index.sql`: the skill's `USING INDEX` form.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
