BEGIN;
ALTER TABLE orders ADD COLUMN note text;
COMMIT;
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);
DROP INDEX CONCURRENTLY IF EXISTS orders_old_idx;
