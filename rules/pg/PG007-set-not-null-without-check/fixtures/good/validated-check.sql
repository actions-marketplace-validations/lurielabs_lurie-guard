-- from: db-skills/skills/pg-online-migrations/examples/good/test.sql@c6eb44e
ALTER TABLE orders ADD CONSTRAINT orders_account_id_not_null
  CHECK (account_id IS NOT NULL) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_not_null;
ALTER TABLE orders ALTER COLUMN account_id SET NOT NULL;
ALTER TABLE orders DROP CONSTRAINT orders_account_id_not_null;
