CREATE TABLE order_events (id bigint, account_id bigint);
ALTER TABLE order_events RENAME COLUMN account_id TO customer_id;
ALTER TABLE order_events RENAME TO order_log;
