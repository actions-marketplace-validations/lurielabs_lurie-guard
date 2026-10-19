-- The PostgreSQL 18 path, but the config says 15 (the default): reported.
ALTER TABLE orders ADD CONSTRAINT orders_amount_not_null NOT NULL amount NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_not_null;
ALTER TABLE orders ALTER COLUMN amount SET NOT NULL; -- expect: PG007
