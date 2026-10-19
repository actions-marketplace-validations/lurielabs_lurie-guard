---
id: PG015
name: vacuum-full-or-cluster
severity: error
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-vacuum-and-bloat
evidence:
  - db-skills/skills/pg-vacuum-and-bloat/examples/bad/test.sql#L76-L123
  - https://www.postgresql.org/docs/18/sql-vacuum.html
  - https://www.postgresql.org/docs/18/explicit-locking.html
verified: 2026-10-19
---

# PG015: `VACUUM FULL`, `CLUSTER`, `REINDEX` or `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY`

## What it detects

In a migration: `VACUUM FULL`, `CLUSTER`, `REINDEX` without `CONCURRENTLY`, and `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY`, on a table, index or view that is not created in the same migration set.

## Why it matters

`VACUUM FULL` "rewrites the entire contents of the table into a new disk file", "requires an `ACCESS EXCLUSIVE` lock" and "requires extra disk space" ([VACUUM](https://www.postgresql.org/docs/18/sql-vacuum.html)). `ACCESS EXCLUSIVE` is "acquired by the `DROP TABLE`, `TRUNCATE`, `REINDEX`, `CLUSTER`, `VACUUM FULL`, and `REFRESH MATERIALIZED VIEW` (without `CONCURRENTLY`) commands" and "conflicts with locks of all modes" ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)), so even a `SELECT` waits. The db-skills bad example measures three of them on PG 15 and 18: with a report holding `ACCESS SHARE` on `page_counters`, a `VACUUM FULL` from another session queues for `ACCESS EXCLUSIVE`, a plain `SELECT ... WHERE id = 1` that arrives after it fails with `55P03`, and the table has a new filenode when it finishes; `CLUSTER` holds `AccessExclusiveLock,ShareLock` until commit and changes the filenode; a plain `REINDEX INDEX` holds `ShareLock` on the table (writes wait) and `AccessExclusiveLock` on the index (reads that use it wait).

## The fix

```sql
VACUUM (ANALYZE) page_counters;                      -- online: no exclusive lock
REINDEX INDEX CONCURRENTLY page_counters_hits_idx;   -- online rebuild, outside a transaction
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;  -- needs a unique index on the view
```

To shrink a table on disk without the lock, use pg_repack or a copy-and-swap; otherwise plan `VACUUM FULL` or `CLUSTER` for a maintenance window with traffic stopped.

## When it does not apply

- The table, index or view is created in the same migration set.
- An agreed maintenance window with traffic stopped: suppress with the reason naming it; still set `lock_timeout` (PG004).
- `REINDEX INDEX CONCURRENTLY`, `REINDEX TABLE CONCURRENTLY` and `REFRESH MATERIALIZED VIEW CONCURRENTLY` are the online forms and are not reported (PG003 checks they are outside a transaction).

## Message

> `VACUUM FULL` rewrites `page_counters` into a new file under `ACCESS EXCLUSIVE`: it queues behind every running query, every query that arrives after it waits for the whole rewrite, and the copy needs the table's size again in free disk. Plain `VACUUM` reclaims space online; for bloated indexes use `REINDEX INDEX CONCURRENTLY`; to shrink a table online use pg_repack or a copy-and-swap in a maintenance window. Not needed in an agreed maintenance window with traffic stopped: suppress with the reason naming it. (PG015, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-vacuum-and-bloat/examples/bad/test.sql#L76-L123))

## Fixtures

- `fixtures/bad/vacuum-full-cluster-reindex.sql`: the skill's `VACUUM FULL page_counters`, `CLUSTER`, `REINDEX INDEX`, plus `REINDEX TABLE` and `REFRESH MATERIALIZED VIEW`.
- `fixtures/good/online-forms.sql`: plain `VACUUM`, `REINDEX INDEX CONCURRENTLY`, `REFRESH MATERIALIZED VIEW CONCURRENTLY`.
- `fixtures/good/new-table-same-file.sql` and `fixtures/good/new-table-second-file/`: the table and index are new in the migration set.
