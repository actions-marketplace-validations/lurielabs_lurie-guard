-- from: db-skills/skills/pg-keys-and-types/examples/bad/test.sql@c6eb44e
CREATE TABLE orders (
  -- MISTAKE: random UUIDv4 keys land on random leaf pages and split them half full.
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- expect: PG018
  customer_id bigint
);
CREATE TABLE devices (
  id uuid NOT NULL DEFAULT uuid_generate_v4(), -- expect: PG018
  name text,
  PRIMARY KEY (id)
);
ALTER TABLE legacy ADD COLUMN id uuid PRIMARY KEY DEFAULT uuidv4(); -- expect: PG018
