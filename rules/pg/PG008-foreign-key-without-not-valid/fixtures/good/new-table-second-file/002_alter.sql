ALTER TABLE order_events ADD CONSTRAINT order_events_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts (id);
