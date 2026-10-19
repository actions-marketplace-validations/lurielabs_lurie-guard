-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
ALTER TABLE orders ADD CONSTRAINT orders_amount_not_null NOT NULL amount NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_not_null;
ALTER TABLE orders ALTER COLUMN amount SET NOT NULL;
