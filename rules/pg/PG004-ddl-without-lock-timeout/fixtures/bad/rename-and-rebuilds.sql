-- Other statements that wait for an outage-class lock with no lock_timeout set.
ALTER TABLE orders RENAME COLUMN account_id TO customer_id; -- expect: PG004, PG013
ALTER TABLE orders RENAME TO customer_orders; -- expect: PG004, PG013
VACUUM FULL orders; -- expect: PG004, PG015
REINDEX INDEX orders_pkey; -- expect: PG004, PG015
REFRESH MATERIALIZED VIEW daily_sales; -- expect: PG004, PG015
LOCK TABLE orders; -- expect: PG004
LOCK TABLE orders IN ACCESS SHARE MODE;
