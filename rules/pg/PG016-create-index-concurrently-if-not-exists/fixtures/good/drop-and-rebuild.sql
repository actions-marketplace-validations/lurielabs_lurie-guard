-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
DROP INDEX CONCURRENTLY IF EXISTS accounts_email_idx;
CREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);
