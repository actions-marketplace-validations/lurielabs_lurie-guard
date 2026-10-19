-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: no NOT VALID, so the full validation scan runs while
-- SHARE ROW EXCLUSIVE is held on orders and on accounts.
ALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey -- expect: PG008
  FOREIGN KEY (account_id) REFERENCES accounts (id);

ALTER TABLE orders ADD FOREIGN KEY (account_id) REFERENCES accounts (id); -- expect: PG008
