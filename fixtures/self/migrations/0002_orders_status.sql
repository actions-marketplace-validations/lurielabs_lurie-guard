SET lock_timeout = '2s';
ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'new';
CREATE INDEX CONCURRENTLY orders_status_idx ON orders (status);
