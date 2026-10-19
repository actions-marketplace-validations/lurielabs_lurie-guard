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

-- PG003: CONCURRENTLY is rejected inside a transaction block (25001).
-- assert_error runs the statement inside a function, which is a transaction block.
CREATE INDEX orders_old_idx ON orders (amount);
SELECT assert_error('CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at)',
  '25001', 'CREATE INDEX CONCURRENTLY is rejected inside a transaction');
SELECT assert_error('DROP INDEX CONCURRENTLY orders_old_idx',
  '25001', 'DROP INDEX CONCURRENTLY is rejected inside a transaction');
SELECT assert_error('REINDEX INDEX CONCURRENTLY orders_pkey',
  '25001', 'REINDEX CONCURRENTLY is rejected inside a transaction');
-- The same statements work as top-level autocommit statements.
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);
DROP INDEX CONCURRENTLY orders_old_idx;
REINDEX INDEX CONCURRENTLY orders_pkey;
-- The fixtures' exact forms, as top-level statements (outside any transaction block, they work).
DROP INDEX CONCURRENTLY orders_created_at_idx;
CREATE INDEX CONCURRENTLY "orders_created_at_idx" ON "orders"("created_at");
