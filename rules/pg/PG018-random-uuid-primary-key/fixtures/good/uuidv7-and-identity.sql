-- from: db-skills/skills/pg-keys-and-types/examples/good/test.sql@c6eb44e
CREATE TABLE devices (id uuid PRIMARY KEY DEFAULT uuidv7(), name text NOT NULL);
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  public_token uuid NOT NULL DEFAULT gen_random_uuid()
);
