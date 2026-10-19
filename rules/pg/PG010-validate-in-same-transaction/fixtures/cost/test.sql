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

-- PG010: VALIDATE in the same transaction as the NOT VALID add runs its scan
-- while the lock from the ADD is still held; a write on the referenced table waits.
BEGIN;
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey;
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'VALIDATE scanned orders');
SELECT assert_true(held_locks('accounts') LIKE '%ShareRowExclusiveLock%',
  'the SHARE ROW EXCLUSIVE from the ADD is still held during and after the scan');
SELECT assert_error(format('SELECT dblink_exec(%L, %L)', app_conn(), 'INSERT INTO accounts VALUES (5000, ''new@example.com'', ''eu'')'),
  '55P03', 'a signup on accounts waits: NOT VALID bought nothing');
ALTER TABLE orders ADD CONSTRAINT orders_amount_check CHECK (amount >= 0) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check;
SELECT assert_true(held_locks('orders') LIKE '%AccessExclusiveLock%', 'the ACCESS EXCLUSIVE from ADD CHECK is still held');
COMMIT;
