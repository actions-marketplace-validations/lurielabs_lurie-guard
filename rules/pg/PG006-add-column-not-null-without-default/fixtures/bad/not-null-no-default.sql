-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: nothing gives the 100,000 existing rows a value, so the
-- statement checks them under ACCESS EXCLUSIVE, finds NULLs and aborts the
-- migration with 23502.
ALTER TABLE orders ADD COLUMN sku text NOT NULL; -- expect: PG006
