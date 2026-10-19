CREATE TABLE order_events (id bigint, amount int);
ALTER TABLE order_events ALTER COLUMN amount SET NOT NULL;
