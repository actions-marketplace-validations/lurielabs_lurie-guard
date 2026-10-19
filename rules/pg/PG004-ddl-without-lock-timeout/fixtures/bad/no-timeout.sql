-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: lock_timeout is 0 (wait forever), so the ALTER queues for its
-- ACCESS EXCLUSIVE lock for as long as the report runs.
ALTER TABLE orders ADD COLUMN note text; -- expect: PG004
DROP TABLE legacy_orders; -- expect: PG004
TRUNCATE audit_log; -- expect: PG004
DROP INDEX CONCURRENTLY orders_old_idx;
DROP INDEX orders_older_idx; -- expect: PG004, PG002
