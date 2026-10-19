-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: no CONCURRENTLY, so the drop waits for every running query on
-- orders and, from then until commit, every new query on orders waits.
DROP INDEX orders_created_at_idx; -- expect: PG002

DROP INDEX IF EXISTS accounts_email_idx, orders_account_id_idx; -- expect: PG002
