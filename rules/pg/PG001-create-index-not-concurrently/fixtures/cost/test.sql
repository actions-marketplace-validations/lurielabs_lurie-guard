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

-- PG001: a plain CREATE INDEX holds SHARE on the table for the whole build;
-- a write from another session waits (55P03 with its lock_timeout).
BEGIN;
CREATE INDEX orders_created_at_idx ON orders (created_at);
SELECT assert_true(held_locks('orders') = 'ShareLock',
  'CREATE INDEX holds SHARE, which conflicts with writes');
SELECT assert_error(format('SELECT dblink_exec(%L, %L)', app_conn(),
  'INSERT INTO orders VALUES (200001, 1, 1, now())'),
  '55P03', 'an insert waits for the whole index build');
COMMIT;
BEGIN;
CREATE UNIQUE INDEX accounts_email_idx ON accounts (email);
SELECT assert_true(held_locks('accounts') = 'ShareLock',
  'CREATE UNIQUE INDEX holds SHARE too');
COMMIT;
