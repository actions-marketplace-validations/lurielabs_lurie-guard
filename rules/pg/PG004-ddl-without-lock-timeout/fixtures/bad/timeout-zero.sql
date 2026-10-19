SET lock_timeout = 0;
ALTER TABLE orders ADD COLUMN note text; -- expect: PG004
