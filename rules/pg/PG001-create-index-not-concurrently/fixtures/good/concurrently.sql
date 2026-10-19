-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);
CREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);
