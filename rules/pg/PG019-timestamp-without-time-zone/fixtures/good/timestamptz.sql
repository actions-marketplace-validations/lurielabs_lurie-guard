-- from: db-skills/skills/pg-keys-and-types/examples/good/test.sql@c6eb44e
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  placed_at timestamp with time zone NOT NULL,
  birthday date,
  opens_at time
);
ALTER TABLE orders ADD COLUMN shipped_at timestamptz;
