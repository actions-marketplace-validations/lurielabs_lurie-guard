-- from: db-skills/skills/pg-keys-and-types/examples/bad/test.sql@c6eb44e
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- MISTAKE: timestamp without time zone stores wall-clock time and drops the offset.
  created_at timestamp DEFAULT now(), -- expect: PG019
  placed_at timestamp, -- expect: PG019
  updated_at timestamp(6) NOT NULL, -- expect: PG019
  seen_at timestamp without time zone -- expect: PG019
);
ALTER TABLE orders ADD COLUMN shipped_at timestamp; -- expect: PG019
ALTER TABLE orders ALTER COLUMN placed_at TYPE timestamp(3); -- expect: PG019, PG011
