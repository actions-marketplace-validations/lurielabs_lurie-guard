-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
BEGIN;
SET LOCAL lock_timeout = '1s';
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
COMMIT;

BEGIN;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey;
COMMIT;
