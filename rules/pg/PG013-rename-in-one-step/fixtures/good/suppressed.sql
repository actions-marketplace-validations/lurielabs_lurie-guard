-- lurie-guard: ignore PG013 reason="release 2026.41 stopped reading account_id; nothing running uses it"
ALTER TABLE orders RENAME COLUMN account_id TO customer_id;
