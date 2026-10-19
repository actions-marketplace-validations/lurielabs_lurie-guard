---
id: PG002
name: drop-index-not-concurrently
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L142-L153
  - https://www.postgresql.org/docs/18/sql-dropindex.html
verified: 2026-10-19
---

# PG002: `DROP INDEX` without `CONCURRENTLY`

## What it detects

`DROP INDEX` without `CONCURRENTLY`, where the index is not created in the same migration set (a `CREATE INDEX` or a `UNIQUE`/`PRIMARY KEY` constraint of that name in this file or in another added migration file of the PR).

## Why it matters

"A normal `DROP INDEX` acquires an exclusive lock on the table, blocking other accesses until the index drop can be completed" ([DROP INDEX](https://www.postgresql.org/docs/18/sql-dropindex.html)). The db-skills bad example drops `orders_created_at_idx` inside a transaction and shows `pg_locks` for the session: `AccessExclusiveLock` on `orders`, the table, not only on the index. A plain `SELECT count(*) FROM orders` from another session with `lock_timeout = 200ms` fails with SQLSTATE `55P03` behind it. In production the drop itself first queues behind every running query on the table, and from then on every new query queues behind the drop.

## The fix

```sql
DROP INDEX CONCURRENTLY orders_created_at_idx;
```

`DROP INDEX CONCURRENTLY` "waits until conflicting transactions have completed" instead of blocking them. It takes one index name per statement, cannot run inside a transaction block (PG003 checks that), and does not support `CASCADE`.

## When it does not apply

- The index is created in the same migration set (a failed build being retried, or an index the PR itself adds and removes): nothing uses it yet. The detector tracks index names created by `CREATE INDEX` and by `UNIQUE`/`PRIMARY KEY` constraints across the added files.
- The statement already says `CONCURRENTLY`.
- An index on a partitioned table: "indexes on partitioned tables cannot be dropped using this option". Suppress with a reason that says so.

## Message

> `DROP INDEX` takes an `ACCESS EXCLUSIVE` lock on the table of `orders_created_at_idx` until the transaction commits: it waits for every running query on the table, and every query that arrives after it waits for the drop. Drop it with `DROP INDEX CONCURRENTLY` (one index per statement), outside a transaction (PG003 checks that). Not needed if the index was created in this release. (PG002, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L142-L153))

## Fixtures

- `fixtures/bad/plain-drop.sql`: the skill's `DROP INDEX orders_created_at_idx`, and a two-name drop whose fix is one statement per index.
- `fixtures/good/concurrently.sql`: the `CONCURRENTLY` form, with `IF EXISTS`.
- `fixtures/good/new-index-same-file.sql`: the index is created in the same file (a retried build).
- `fixtures/good/new-index-second-file/`: the index is created in another added file of the same PR.
