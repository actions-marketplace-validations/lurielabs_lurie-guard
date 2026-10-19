-- from: db-skills/skills/pg-keys-and-types/examples/bad/test.sql@c6eb44e
CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- MISTAKE: json keeps duplicate keys, reparses on every read and has no = operator.
  details json -- expect: PG020
);
ALTER TABLE orders ADD COLUMN metadata json NOT NULL DEFAULT '{}'; -- expect: PG020
ALTER TABLE orders ADD COLUMN tags json[]; -- expect: PG020
