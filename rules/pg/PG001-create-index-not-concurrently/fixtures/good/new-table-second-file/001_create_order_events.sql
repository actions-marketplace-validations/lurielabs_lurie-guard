CREATE TABLE order_events (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id   bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
