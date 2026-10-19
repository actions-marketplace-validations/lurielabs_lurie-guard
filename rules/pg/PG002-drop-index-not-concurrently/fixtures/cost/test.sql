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

-- PG002: a plain DROP INDEX holds ACCESS EXCLUSIVE on the table until commit;
-- even a SELECT from another session waits.
CREATE INDEX orders_created_at_idx ON orders (created_at);
CREATE INDEX accounts_email_idx ON accounts (email);
CREATE INDEX orders_account_id_idx ON orders (account_id);
BEGIN;
DROP INDEX orders_created_at_idx;
SELECT assert_true(held_locks('orders') = 'AccessExclusiveLock',
  'DROP INDEX holds ACCESS EXCLUSIVE on the table, not only on the index');
SELECT assert_error(format('SELECT * FROM dblink(%L, %L) AS r(n bigint)', app_conn(),
  'SELECT count(*) FROM orders'),
  '55P03', 'a plain SELECT on orders waits for the drop to commit');
COMMIT;
BEGIN;
DROP INDEX IF EXISTS accounts_email_idx, orders_account_id_idx;
SELECT assert_true(held_locks('accounts') = 'AccessExclusiveLock' AND held_locks('orders') = 'AccessExclusiveLock',
  'a two-index drop locks both tables');
COMMIT;
