-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: IF NOT EXISTS sees the invalid index by name and skips the build.
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS accounts_email_idx ON accounts (email); -- expect: PG016
