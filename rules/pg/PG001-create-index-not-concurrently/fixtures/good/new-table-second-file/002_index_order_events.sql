-- order_events is created in 001_create_order_events.sql, added in the same PR.
CREATE INDEX order_events_order_id_idx ON order_events (order_id);
