ALTER TABLE order_events ADD CONSTRAINT order_events_amount_check CHECK (amount >= 0);
