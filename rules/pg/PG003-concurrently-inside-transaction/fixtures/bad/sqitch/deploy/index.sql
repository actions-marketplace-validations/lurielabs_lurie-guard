-- Deploy app:index to pg
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at); -- expect: PG003
