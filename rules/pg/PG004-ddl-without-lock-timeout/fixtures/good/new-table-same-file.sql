CREATE TABLE order_events (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, order_id bigint NOT NULL);
ALTER TABLE order_events ADD COLUMN note text;
