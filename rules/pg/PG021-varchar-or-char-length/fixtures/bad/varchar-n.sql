-- from: db-skills/skills/pg-keys-and-types/examples/bad/test.sql@c6eb44e
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- MISTAKE: varchar(20) is a guess at a business rule; it still accepts '' and casts truncate silently.
  email varchar(20), -- expect: PG021
  status varchar(10), -- expect: PG021
  currency char(3) -- expect: PG021
);
ALTER TABLE orders ADD COLUMN sku varchar(32); -- expect: PG021
