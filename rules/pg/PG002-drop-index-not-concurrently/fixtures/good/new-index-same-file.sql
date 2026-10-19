-- A failed concurrent build is retried in the same file: the index is new here.
CREATE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);
DROP INDEX accounts_email_idx;
CREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);
