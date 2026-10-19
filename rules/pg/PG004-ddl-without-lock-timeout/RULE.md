---
id: PG004
name: ddl-without-lock-timeout
severity: warning
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L24-L49
  - https://www.postgresql.org/docs/18/runtime-config-client.html#GUC-LOCK-TIMEOUT
verified: 2026-10-19
---

# PG004: DDL that takes a heavy lock without `SET lock_timeout`

## What it detects

A statement that takes an `ACCESS EXCLUSIVE` or `SHARE ROW EXCLUSIVE` lock on an existing table (`ALTER TABLE` other than `VALIDATE CONSTRAINT` alone, including `RENAME COLUMN` and `RENAME TO`; `DROP TABLE`; `DROP INDEX` without `CONCURRENTLY`; `TRUNCATE`; `CLUSTER`; `VACUUM FULL`; `REINDEX` without `CONCURRENTLY`; `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY`; `LOCK TABLE` in `SHARE ROW EXCLUSIVE` mode or above) when no `SET lock_timeout` or `SET LOCAL lock_timeout` with a non-zero value appears earlier in the file, and the config does not say the runner sets it (`lock_timeout_set_by_runner: true`).

## Why it matters

`lock_timeout` defaults to `0`, which disables it, and "a transaction seeking either a table-level or row-level lock will wait indefinitely for conflicting locks to be released" ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html), [lock_timeout](https://www.postgresql.org/docs/18/runtime-config-client.html#GUC-LOCK-TIMEOUT)). The db-skills bad example holds a report's `ACCESS SHARE` lock on `orders` in one session and runs `ALTER TABLE orders ADD COLUMN note text` in another: the `ALTER` queues for its `ACCESS EXCLUSIVE` lock, and a plain `SELECT count(*) FROM orders WHERE id = 1` that arrives next is blocked behind the waiting `ALTER` (it fails with `55P03` after the 500 ms the test allows it). In production that read hangs for as long as the report runs. The statement list follows the manual: "an ACCESS EXCLUSIVE lock is acquired unless explicitly noted" for every `ALTER TABLE` form, renames included ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), and `ACCESS EXCLUSIVE` is "acquired by the DROP TABLE, TRUNCATE, REINDEX, CLUSTER, VACUUM FULL, and REFRESH MATERIALIZED VIEW (without CONCURRENTLY) commands" and by `LOCK TABLE` by default ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)). The good example sets `lock_timeout = '1s'`: the `ALTER` fails fast with `55P03`, traffic keeps flowing, and the retry after the report commits succeeds at once.

## The fix

```sql
SET lock_timeout = '2s';   -- a few seconds; the docs give no figure
ALTER TABLE orders ADD COLUMN note text;
-- retry the step on SQLSTATE 55P03 with backoff
```

Inside a transaction, `SET LOCAL lock_timeout` scopes it to that transaction. Commit each heavy-lock step on its own; locks are held until the end of the transaction.

## When it does not apply

- `SET lock_timeout` or `SET LOCAL lock_timeout` with a non-zero value appears earlier in the file; `SET lock_timeout = 0` and `RESET lock_timeout` turn the timeout off again.
- The migration runner sets `lock_timeout` for every session (a connection option, `ALTER ROLE ... SET lock_timeout`, Rails' `config.active_record.postgresql_adapter...`, a Flyway `initSql`): set `lock_timeout_set_by_runner: true` in `.lurie-guard.yml` and the rule is silent.
- The table is created in the same migration set.
- An `ALTER TABLE` whose only subcommand is `VALIDATE CONSTRAINT` takes `SHARE UPDATE EXCLUSIVE`, which does not block reads or writes.

## Message

> `ALTER TABLE` waits for a heavy lock (`ACCESS EXCLUSIVE` or `SHARE ROW EXCLUSIVE`) on `orders` with `lock_timeout` at its default of 0 (wait forever): it queues behind any long transaction, and every query that arrives after it queues behind the DDL. Run `SET lock_timeout = '2s'` (or `SET LOCAL` inside the transaction) before the first DDL and retry on SQLSTATE `55P03`. Not needed when your migration runner sets `lock_timeout` for every session: say so with `lock_timeout_set_by_runner: true` in `.lurie-guard.yml`. (PG004, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L24-L49))

## Fixtures

- `fixtures/bad/no-timeout.sql`: the skill's `ALTER TABLE orders ADD COLUMN note text` with no `lock_timeout`, then `DROP TABLE`, `TRUNCATE` and a plain `DROP INDEX`.
- `fixtures/bad/timeout-zero.sql`: `SET lock_timeout = 0` does not count.
- `fixtures/bad/rename-and-rebuilds.sql`: `RENAME COLUMN`, `RENAME TO`, `VACUUM FULL`, `REINDEX`, `REFRESH MATERIALIZED VIEW`, `LOCK TABLE`; a `LOCK TABLE ... IN ACCESS SHARE MODE` is not reported.
- `fixtures/good/set-lock-timeout.sql`: `SET lock_timeout = '1s'` before the DDL.
- `fixtures/good/set-local.sql`: `SET LOCAL lock_timeout` inside the transaction.
- `fixtures/good/runner-sets-it/`: `lock_timeout_set_by_runner: true` in the config.
- `fixtures/good/validate-only.sql`: `VALIDATE CONSTRAINT` alone takes a weak lock.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table is new in the migration set.
