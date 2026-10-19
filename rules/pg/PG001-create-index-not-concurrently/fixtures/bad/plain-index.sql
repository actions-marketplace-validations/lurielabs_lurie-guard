-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: no CONCURRENTLY: SHARE lock, inserts and updates wait.
CREATE INDEX orders_created_at_idx ON orders (created_at); -- expect: PG001

CREATE UNIQUE INDEX accounts_email_idx ON accounts (email); -- expect: PG001
