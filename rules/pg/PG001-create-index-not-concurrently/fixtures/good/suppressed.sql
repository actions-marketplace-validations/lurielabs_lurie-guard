-- lurie-guard: ignore PG001 reason="orders is created in V12 of this release and still empty in production"
CREATE INDEX orders_created_at_idx ON orders (created_at);
