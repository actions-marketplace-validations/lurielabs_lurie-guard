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

-- PG006: ADD COLUMN ... NOT NULL with no default fails with 23502 on a table with rows.
SELECT assert_error('ALTER TABLE orders ADD COLUMN sku text NOT NULL',
  '23502', 'ADD COLUMN NOT NULL without a default fails on a table with rows');
-- The good form works and keeps the filenode.
SELECT pg_relation_filenode('orders') AS node \gset
ALTER TABLE orders ADD COLUMN sku text NOT NULL DEFAULT 'unknown';
SELECT assert_true(pg_relation_filenode('orders') = :node, 'constant default: table not rewritten');
