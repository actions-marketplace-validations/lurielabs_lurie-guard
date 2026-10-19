-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
CREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);
ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE USING INDEX accounts_email_idx;
