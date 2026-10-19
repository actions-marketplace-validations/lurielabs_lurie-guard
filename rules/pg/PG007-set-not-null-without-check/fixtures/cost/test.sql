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

-- PG007: a bare SET NOT NULL scans the table under ACCESS EXCLUSIVE; after a
-- validated CHECK it scans nothing.
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ALTER COLUMN amount SET NOT NULL;
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'SET NOT NULL scanned the table');
SELECT assert_true(held_locks('orders') = 'AccessExclusiveLock', 'and held ACCESS EXCLUSIVE while it did');
COMMIT;
ALTER TABLE orders ADD CONSTRAINT orders_account_id_not_null CHECK (account_id IS NOT NULL) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_not_null;
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ALTER COLUMN account_id SET NOT NULL;
SELECT assert_true(xact_seq_scans('orders') = :scans_before, 'SET NOT NULL with a valid CHECK does not scan the table');
COMMIT;
