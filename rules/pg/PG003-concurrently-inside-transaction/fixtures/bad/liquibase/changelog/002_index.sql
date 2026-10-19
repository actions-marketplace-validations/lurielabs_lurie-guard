--liquibase formatted sql

--changeset rafael:2
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at); -- expect: PG003
