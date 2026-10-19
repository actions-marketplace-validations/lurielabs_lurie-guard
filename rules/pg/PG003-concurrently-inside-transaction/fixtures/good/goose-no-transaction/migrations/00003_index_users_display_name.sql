-- +goose NO TRANSACTION
-- +goose Up
CREATE INDEX CONCURRENTLY users_display_name_idx ON users (display_name);

-- +goose Down
DROP INDEX CONCURRENTLY users_display_name_idx;
