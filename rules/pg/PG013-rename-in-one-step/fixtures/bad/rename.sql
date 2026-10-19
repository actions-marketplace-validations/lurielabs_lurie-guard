ALTER TABLE orders RENAME COLUMN account_id TO customer_id; -- expect: PG013
ALTER TABLE orders RENAME TO customer_orders; -- expect: PG013
