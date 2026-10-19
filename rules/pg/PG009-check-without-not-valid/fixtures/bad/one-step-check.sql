-- MISTAKE: no NOT VALID: the CHECK is validated by a full scan under ACCESS EXCLUSIVE.
ALTER TABLE orders ADD CONSTRAINT orders_amount_check CHECK (amount >= 0); -- expect: PG009
ALTER TABLE orders ADD CHECK (amount IS NOT NULL); -- expect: PG009
