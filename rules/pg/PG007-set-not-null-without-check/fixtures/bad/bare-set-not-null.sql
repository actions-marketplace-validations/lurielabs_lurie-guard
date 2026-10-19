-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: no validated CHECK (amount IS NOT NULL) first, so the whole
-- table is scanned while reads and writes are locked out.
ALTER TABLE orders ALTER COLUMN amount SET NOT NULL; -- expect: PG007
