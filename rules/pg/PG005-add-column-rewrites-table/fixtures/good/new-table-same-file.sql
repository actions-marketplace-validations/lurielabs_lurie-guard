CREATE TABLE order_events (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY);
ALTER TABLE order_events ADD COLUMN created_at timestamptz NOT NULL DEFAULT clock_timestamp();
