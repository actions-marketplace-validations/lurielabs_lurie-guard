ALTER TABLE orders ALTER COLUMN account_id SET NOT NULL;
ALTER TABLE orders DROP CONSTRAINT orders_account_id_not_null;
