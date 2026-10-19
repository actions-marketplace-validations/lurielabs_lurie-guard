ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey; -- expect: PG010
