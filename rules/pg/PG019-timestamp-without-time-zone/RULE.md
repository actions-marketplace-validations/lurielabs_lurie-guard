---
id: PG019
name: timestamp-without-time-zone
severity: warning
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-keys-and-types
evidence:
  - db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L54-L61
  - https://www.postgresql.org/docs/18/datatype-datetime.html
verified: 2026-10-19
---

# PG019: `timestamp` without time zone

## What it detects

A column of type `timestamp` (without time zone, with or without precision) in `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN` or `ALTER TABLE ... ALTER COLUMN ... TYPE`. Rails `datetime` maps to `timestamp(6)` by default and is reported through the detector.

## Why it matters

For `timestamp` without time zone, "PostgreSQL will silently ignore any time zone indication" in the input; for `timestamptz`, "the value is stored internally as UTC" and converted to the session's `TimeZone` on output ([date/time types](https://www.postgresql.org/docs/18/datatype-datetime.html)). The db-skills bad example writes the same instant from a session in `America/Sao_Paulo` (09:00-03) and one in `Asia/Tokyo` (21:00+09) into a `timestamp` column and asserts that the two stored values are 12 hours apart; the good example stores one value, `12:00+00`, into `timestamptz`. Both types are 8 bytes.

## The fix

```sql
placed_at timestamptz NOT NULL
```

Changing an existing column's type rewrites the table (PG011): fix it at creation, or expand/contract.

## When it does not apply

- A wall-clock value that is not an instant: a store's opening time, a recurring "09:00 local" alarm. Keep `time` or `timestamp` plus a time zone column, and suppress with that reason.
- Rails applications that set `ActiveRecord::ConnectionAdapters::PostgreSQLAdapter.datetime_type = :timestamptz`: the detector cannot see the application config and maps `datetime` to `timestamp(6)`, the framework default; set `rules: {PG019: off}` or suppress on those migrations.

## Message

> `created_at timestamp` on `customers` is a timestamp without time zone: PostgreSQL "silently ignore[s] any time zone indication" on input, so the same instant written from two sessions with different `TimeZone` settings is stored as two values (12 hours apart in the db-skills test). Declare it `timestamptz`: stored as UTC, same 8 bytes, converted on output to the session's zone. Not needed for a wall-clock value that is deliberately zone-free (a store's opening time, a recurring local alarm); suppress with that reason. (PG019, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L54-L61))

## Fixtures

- `fixtures/bad/timestamp.sql`: the skill's `created_at timestamp DEFAULT now()` and `placed_at timestamp`, plus `timestamp(6)`, `timestamp without time zone`, and the `ADD COLUMN` and `ALTER COLUMN TYPE` forms.
- `fixtures/bad/rails/db/migrate/20261019120000_add_datetime.rb`: `add_column ..., :datetime`.
- `fixtures/good/timestamptz.sql`: the skill's `timestamptz` columns, `timestamp with time zone`, `date` and `time`.
