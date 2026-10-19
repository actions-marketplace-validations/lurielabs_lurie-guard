BEGIN;
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey; -- expect: PG010
ALTER TABLE orders ADD CONSTRAINT orders_amount_check CHECK (amount >= 0) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check; -- expect: PG010
COMMIT;
