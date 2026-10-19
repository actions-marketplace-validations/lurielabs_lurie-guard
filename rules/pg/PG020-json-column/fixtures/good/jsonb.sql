-- from: db-skills/skills/pg-keys-and-types/examples/good/test.sql@c6eb44e
CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  attributes jsonb NOT NULL DEFAULT '{}'
);
ALTER TABLE orders ADD COLUMN metadata jsonb;
