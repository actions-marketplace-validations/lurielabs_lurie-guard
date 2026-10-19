ALTER TABLE orders DROP COLUMN legacy_note; -- expect: PG014
DROP TABLE legacy_orders; -- expect: PG014
DROP TABLE IF EXISTS legacy_accounts, legacy_items; -- expect: PG014
