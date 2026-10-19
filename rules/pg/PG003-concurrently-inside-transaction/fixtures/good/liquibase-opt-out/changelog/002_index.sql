--liquibase formatted sql

--changeset rafael:2 runInTransaction:false
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);
