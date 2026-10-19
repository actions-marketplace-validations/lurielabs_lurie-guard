-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
SET lock_timeout = '1s';
ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'new';
DROP TABLE legacy_orders;
