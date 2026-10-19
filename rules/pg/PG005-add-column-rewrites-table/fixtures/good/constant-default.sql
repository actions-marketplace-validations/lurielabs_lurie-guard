-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'new';
ALTER TABLE orders ADD COLUMN created_at timestamptz;
ALTER TABLE orders ALTER COLUMN created_at SET DEFAULT clock_timestamp();
ALTER TABLE orders ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE orders ADD COLUMN retries int NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN region text DEFAULT lower('EU');
