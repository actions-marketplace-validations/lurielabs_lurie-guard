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

-- PG008: a one-step foreign key scans the table while SHARE ROW EXCLUSIVE is
-- held on both tables; a write on the referenced table waits (55P03).
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id);
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'ADD FOREIGN KEY scanned orders inside the locking statement');
SELECT assert_true(held_locks('accounts') = 'AccessShareLock,RowShareLock,ShareRowExclusiveLock',
  'the referenced table is locked against writes as well');
SELECT assert_error(format('SELECT dblink_exec(%L, %L)', app_conn(), 'INSERT INTO accounts VALUES (5000, ''new@example.com'', ''eu'')'),
  '55P03', 'a signup on accounts waits for the migration');
COMMIT;
ALTER TABLE orders DROP CONSTRAINT orders_account_id_fkey;
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ADD FOREIGN KEY (account_id) REFERENCES accounts (id);
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'the unnamed form scans as well');
COMMIT;
