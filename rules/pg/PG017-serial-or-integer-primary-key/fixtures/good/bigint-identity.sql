-- from: db-skills/skills/pg-keys-and-types/examples/good/test.sql@c6eb44e
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  retries integer NOT NULL DEFAULT 0
);
CREATE TABLE legacy_ok (
  id bigserial PRIMARY KEY,
  position integer
);
