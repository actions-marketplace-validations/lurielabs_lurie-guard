-- migrate:up transaction:false
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);

-- migrate:down transaction:false
DROP INDEX CONCURRENTLY orders_created_at_idx;
