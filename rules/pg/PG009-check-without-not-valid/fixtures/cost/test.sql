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

-- PG009: ADD CHECK without NOT VALID scans the table under ACCESS EXCLUSIVE;
-- NOT VALID is catalog only and VALIDATE runs under SHARE UPDATE EXCLUSIVE.
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ADD CONSTRAINT orders_amount_check CHECK (amount >= 0);
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'ADD CHECK scanned the table');
SELECT assert_true(held_locks('orders') = 'AccessExclusiveLock', 'under ACCESS EXCLUSIVE');
COMMIT;
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ADD CHECK (amount IS NOT NULL);
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'the unnamed CHECK scans as well');
COMMIT;
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ADD CONSTRAINT orders_amount_check2 CHECK (amount < 1000000) NOT VALID;
SELECT assert_true(xact_seq_scans('orders') = :scans_before, 'NOT VALID: no scan');
COMMIT;
BEGIN;
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check2;
SELECT assert_true(held_locks('orders') = 'ShareUpdateExclusiveLock', 'VALIDATE: SHARE UPDATE EXCLUSIVE, writes continue');
COMMIT;
