-- migrate:up
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at); -- expect: PG003

-- migrate:down
DROP INDEX CONCURRENTLY orders_created_at_idx; -- the down section is not analyzed by default (ADR 0013)
