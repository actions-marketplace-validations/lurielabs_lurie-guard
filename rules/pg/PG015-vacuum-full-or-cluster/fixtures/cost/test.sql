-- Cost test for scripts/test-fixtures.sh: the bad statements of this rule
-- wrapped in the assertions the db-skills evidence uses. Runs on PostgreSQL 15
-- and 18 after scripts/lib/pg-helpers.sql (assert_true, assert_error,
-- held_locks, xact_seq_scans). Schema and data as in
-- db-skills/skills/pg-online-migrations/examples/bad/test.sql.
CREATE TABLE accounts (
  id    bigint PRIMARY KEY,
  email text,
  region text
);
CREATE TABLE orders (
  id         bigint PRIMARY KEY,
  account_id int,
  amount     int,
  created_at timestamp
);
INSERT INTO accounts SELECT g, 'user' || g || '@example.com', 'eu' FROM generate_series(1, 1000) g;
INSERT INTO orders SELECT g, g % 1000 + 1, g % 500, now() FROM generate_series(1, 100000) g;
ANALYZE accounts;
ANALYZE orders;
CREATE EXTENSION dblink;
-- A second session with a short lock_timeout: what the application sees.
CREATE FUNCTION app_conn() RETURNS text LANGUAGE sql AS $$
  SELECT 'dbname=' || current_database() || ' options=''-c lock_timeout=200''';
$$;

-- PG015: VACUUM FULL, CLUSTER, REINDEX and REFRESH MATERIALIZED VIEW without
-- CONCURRENTLY take outage-class locks (and the first two rewrite the table).
CREATE TABLE page_counters (id bigint PRIMARY KEY, path text NOT NULL, hits bigint NOT NULL DEFAULT 0);
CREATE INDEX page_counters_hits_idx ON page_counters (hits);
INSERT INTO page_counters (id, path) SELECT g, '/page/' || g FROM generate_series(1, 20000) g;
CREATE MATERIALIZED VIEW daily_sales AS SELECT account_id, sum(amount) AS total FROM orders GROUP BY account_id;
CREATE UNIQUE INDEX daily_sales_account_id_idx ON daily_sales (account_id);

-- VACUUM FULL cannot run in a transaction block, so a second session runs it
-- while a report holds ACCESS SHARE; the application's SELECT then queues behind it.
SELECT pg_relation_filenode('page_counters') AS node_before \gset
SELECT dblink_connect('report', 'dbname=' || current_database());
SELECT dblink_exec('report', 'BEGIN');
SELECT * FROM dblink('report', 'SELECT count(*) FROM page_counters') AS t(n bigint);
SELECT dblink_connect('maintenance', 'dbname=' || current_database());
SELECT dblink_send_query('maintenance', 'VACUUM FULL page_counters');
DO $$
BEGIN
  FOR i IN 1..100 LOOP
    EXIT WHEN EXISTS (SELECT 1 FROM pg_locks
      WHERE relation = 'page_counters'::regclass AND mode = 'AccessExclusiveLock' AND NOT granted);
    PERFORM pg_sleep(0.05);
  END LOOP;
END
$$;
SET lock_timeout = '500ms';
SELECT assert_error('SELECT count(*) FROM page_counters WHERE id = 1', '55P03', 'a plain SELECT is blocked behind the waiting VACUUM FULL');
RESET lock_timeout;
SELECT dblink_exec('report', 'COMMIT');
SELECT * FROM dblink_get_result('maintenance') AS r(status text);
SELECT dblink_disconnect('report');
SELECT dblink_disconnect('maintenance');
SELECT assert_true(pg_relation_filenode('page_counters') <> :node_before, 'VACUUM FULL wrote a new copy of the table');

SELECT pg_relation_filenode('orders') AS node_before \gset
VACUUM (FULL, ANALYZE);
SELECT assert_true(pg_relation_filenode('orders') <> :node_before, 'a database-wide VACUUM FULL rewrote orders too');

BEGIN;
SELECT pg_relation_filenode('page_counters') AS node_before \gset
CLUSTER page_counters USING page_counters_pkey;
SELECT assert_true(held_locks('page_counters') = 'AccessExclusiveLock,ShareLock', 'CLUSTER holds ACCESS EXCLUSIVE (plus SHARE for the index rebuild)');
SELECT assert_true(pg_relation_filenode('page_counters') <> :node_before, 'CLUSTER rewrote the table');
COMMIT;

BEGIN;
REINDEX INDEX page_counters_hits_idx;
SELECT assert_true(held_locks('page_counters') = 'ShareLock', 'REINDEX holds SHARE on the table: writes wait');
SELECT assert_true(held_locks('page_counters_hits_idx') = 'AccessExclusiveLock', 'and ACCESS EXCLUSIVE on the index');
COMMIT;

BEGIN;
REINDEX TABLE page_counters;
SELECT assert_true(held_locks('page_counters') = 'ShareLock', 'REINDEX TABLE holds SHARE on the table');
COMMIT;

BEGIN;
REFRESH MATERIALIZED VIEW daily_sales;
SELECT assert_true(held_locks('daily_sales') LIKE '%AccessExclusiveLock%', 'REFRESH MATERIALIZED VIEW holds ACCESS EXCLUSIVE on the view (plus the mode of its index rebuild)');
COMMIT;
