-- from: go-skills/skills/db-migrations/examples/bad/migrations/00003_index_users_display_name.sql
-- MISTAKE: no -- +goose NO TRANSACTION. goose wraps the file in a transaction and
-- Postgres rejects it: CREATE INDEX CONCURRENTLY cannot run inside a transaction block.
-- +goose Up
CREATE INDEX CONCURRENTLY users_display_name_idx ON users (display_name); -- expect: PG003

-- +goose Down
DROP INDEX CONCURRENTLY users_display_name_idx;
