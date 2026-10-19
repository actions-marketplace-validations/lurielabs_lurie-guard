BEGIN;
CREATE TABLE order_events (id bigint, account_id bigint);
ALTER TABLE order_events ADD CONSTRAINT order_events_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;
ALTER TABLE order_events VALIDATE CONSTRAINT order_events_account_id_fkey;
COMMIT;
