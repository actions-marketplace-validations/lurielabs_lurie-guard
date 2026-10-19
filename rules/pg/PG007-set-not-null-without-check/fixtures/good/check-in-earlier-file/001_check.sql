ALTER TABLE orders ADD CONSTRAINT orders_account_id_not_null CHECK (account_id IS NOT NULL) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_not_null;
