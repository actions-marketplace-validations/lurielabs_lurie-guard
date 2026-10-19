---
id: PG014
name: drop-column-or-table
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

# PG014: `DROP COLUMN` / `DROP TABLE`

## What it detects

`ALTER TABLE ... DROP COLUMN` on a table not created in the same migration set, and `DROP TABLE` of a table not created in the same migration set.

## Why it matters

"A one-step `RENAME COLUMN` or `DROP COLUMN` breaks every query of that code when it commits" (pg-online-migrations, rule 8): the running release keeps serving until the deploy finishes, and each of its queries that names the column fails with `42703` from the commit on. A dropped column's data is gone (`DROP COLUMN` marks it dead in the catalog; the space is reclaimed later), and `DROP TABLE` is irreversible without a backup. Both take `ACCESS EXCLUSIVE` ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), so PG004 applies too. There is no measured fixture for the application-side failure, so the severity is `warning`; the finding asks for the release that stopped reading the column as the suppression reason.

## The fix

```sql
-- release N: stop reading and writing the column, deploy everywhere
-- release N+1:
ALTER TABLE orders DROP COLUMN legacy_note;
```

For a table, rename it first (`ALTER TABLE legacy RENAME TO legacy_dropped`) and drop it a release later, or take a backup.

## When it does not apply

- The table is created in the same migration set (a PR that creates and drops a scratch table, or a `down` migration of the `up` in the same PR).
- No running code uses the column or table: suppress with a reason that names the release that stopped using it.

## Message

> `DROP COLUMN legacy_note` fails every query of the running release that still reads or writes `orders.legacy_note` the moment it commits, and the data is gone. Drop it in the release after the last one that reads it (expand/contract): stop reading, deploy, then drop. Not needed if `orders` is new in this release; otherwise suppress with the reason naming the release that stopped reading `legacy_note`. (PG014, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/SKILL.md#L51))

## Fixtures

- `fixtures/bad/drop.sql`: `DROP COLUMN` and `DROP TABLE`.
- `fixtures/bad/rails/db/migrate/20261019120000_drop.rb`: `remove_column` and `drop_table`.
- `fixtures/good/suppressed.sql`: suppressed with the release that stopped reading the column.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
