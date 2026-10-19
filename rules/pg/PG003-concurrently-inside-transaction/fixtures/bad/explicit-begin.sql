BEGIN;
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at); -- expect: PG003
DROP INDEX CONCURRENTLY orders_old_idx; -- expect: PG003
REINDEX INDEX CONCURRENTLY orders_pkey; -- expect: PG003
COMMIT;
