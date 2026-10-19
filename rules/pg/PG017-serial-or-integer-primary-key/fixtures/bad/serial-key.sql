-- from: db-skills/skills/pg-keys-and-types/examples/bad/test.sql@c6eb44e
-- MISTAKE: serial is a 4-byte integer with a separate sequence; it runs out at 2147483647
-- and does not notice ids written by hand.
CREATE TABLE customers (
  id serial PRIMARY KEY, -- expect: PG017
  email text
);
CREATE TABLE sessions (
  id integer NOT NULL, -- expect: PG017
  token text,
  PRIMARY KEY (id)
);
ALTER TABLE legacy ADD COLUMN id smallserial PRIMARY KEY; -- expect: PG017
