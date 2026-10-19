-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: no CREATE UNIQUE INDEX CONCURRENTLY first, so ADD CONSTRAINT
-- scans the table and builds the index itself while reads and writes wait.
ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE (email); -- expect: PG012
ALTER TABLE accounts ADD UNIQUE (email, region); -- expect: PG012
ALTER TABLE orders ADD PRIMARY KEY (id); -- expect: PG012
