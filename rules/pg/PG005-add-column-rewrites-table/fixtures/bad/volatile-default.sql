-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: clock_timestamp() is volatile, so every row gets its own value:
-- full rewrite of the table and its indexes under ACCESS EXCLUSIVE.
ALTER TABLE orders ADD COLUMN created_at timestamptz NOT NULL DEFAULT clock_timestamp(); -- expect: PG005
ALTER TABLE orders ADD COLUMN public_id uuid NOT NULL DEFAULT gen_random_uuid(); -- expect: PG005
ALTER TABLE orders ADD COLUMN seq bigint DEFAULT nextval('orders_seq'); -- expect: PG005
ALTER TABLE orders ADD COLUMN token text DEFAULT app.make_token(); -- expect: PG005
