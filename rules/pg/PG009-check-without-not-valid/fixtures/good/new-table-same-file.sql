CREATE TABLE order_events (id bigint, amount int);
ALTER TABLE order_events ADD CONSTRAINT order_events_amount_check CHECK (amount >= 0);
