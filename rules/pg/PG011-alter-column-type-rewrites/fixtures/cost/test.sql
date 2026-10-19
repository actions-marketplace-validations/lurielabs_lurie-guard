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

-- PG011: a type change that is not binary-coercible rewrites the table.
CREATE TABLE customers (id bigint PRIMARY KEY, email varchar(20), created_at timestamp);
INSERT INTO customers SELECT g, left('user' || g || '@example.com', 10), now() FROM generate_series(1, 1000) g;
SELECT pg_relation_filenode('orders') AS node \gset
ALTER TABLE orders ALTER COLUMN account_id TYPE bigint;
SELECT assert_true(pg_relation_filenode('orders') <> :node, 'type change rewrote the table');
SELECT pg_relation_filenode('customers') AS node \gset
ALTER TABLE customers ALTER COLUMN email TYPE varchar(10);
SELECT assert_true(pg_relation_filenode('customers') <> :node, 'changing varchar(20) to varchar(10) wrote a new copy of the table');
SELECT pg_relation_filenode('customers') AS node \gset
ALTER TABLE customers ALTER COLUMN created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC';
SELECT assert_true(pg_relation_filenode('customers') <> :node, 'a USING clause always rewrites');
-- Binary-coercible: varchar(n) to text keeps the filenode.
SELECT pg_relation_filenode('customers') AS node \gset
ALTER TABLE customers ALTER COLUMN email TYPE text;
SELECT assert_true(pg_relation_filenode('customers') = :node, 'varchar(10) to text: no rewrite');
