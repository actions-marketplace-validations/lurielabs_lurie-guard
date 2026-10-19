-- The table is created in this migration: nothing reads it yet.
CREATE TABLE order_events (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id   bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX order_events_order_id_idx ON order_events (order_id);
