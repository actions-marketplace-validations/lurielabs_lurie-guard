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

-- PG012: ADD UNIQUE / ADD PRIMARY KEY without USING INDEX build the index under
-- ACCESS EXCLUSIVE (plus the build's SHARE); a write waits (55P03).
-- orders without its primary key, so the fixture's ADD PRIMARY KEY (id) can run.
ALTER TABLE orders DROP CONSTRAINT orders_pkey;
BEGIN;
SELECT xact_seq_scans('accounts') AS scans_before \gset
ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE (email);
SELECT assert_true(xact_seq_scans('accounts') > :scans_before, 'ADD UNIQUE scanned accounts to build the index');
SELECT assert_true(held_locks('accounts') = 'AccessExclusiveLock,ShareLock',
  'and holds ACCESS EXCLUSIVE (plus the build''s SHARE) until commit: reads and writes wait');
SELECT assert_error(format('SELECT dblink_exec(%L, %L)', app_conn(), 'INSERT INTO accounts VALUES (5001, ''late@example.com'', ''eu'')'),
  '55P03', 'a signup waits for the whole index build');
COMMIT;
BEGIN;
ALTER TABLE accounts ADD UNIQUE (email, region);
SELECT assert_true(held_locks('accounts') = 'AccessExclusiveLock,ShareLock', 'the unnamed form holds the same locks');
COMMIT;
BEGIN;
SELECT xact_seq_scans('orders') AS scans_before \gset
ALTER TABLE orders ADD PRIMARY KEY (id);
SELECT assert_true(xact_seq_scans('orders') > :scans_before, 'ADD PRIMARY KEY scanned the table to build the index');
SELECT assert_true(held_locks('orders') = 'AccessExclusiveLock,ShareLock', 'under ACCESS EXCLUSIVE plus SHARE');
COMMIT;
-- The good form: a catalog change over a concurrently built index.
CREATE UNIQUE INDEX CONCURRENTLY accounts_id_region_idx ON accounts (id, region);
BEGIN;
SELECT xact_seq_scans('accounts') AS scans_before \gset
ALTER TABLE accounts ADD CONSTRAINT accounts_id_region_key UNIQUE USING INDEX accounts_id_region_idx;
SELECT assert_true(xact_seq_scans('accounts') = :scans_before, 'USING INDEX: no scan');
COMMIT;
