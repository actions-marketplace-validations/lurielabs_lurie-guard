-- +goose Up
-- +goose StatementBegin
CREATE FUNCTION bump_counter() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.hits := NEW.hits + 1;
  RETURN NEW;
END;
$$;
-- +goose StatementEnd
ALTER TABLE page_counters ADD COLUMN bumped boolean NOT NULL DEFAULT false;

-- +goose Down
-- The Down section is the reversal and is not analyzed by default (analyze_down: false).
DROP INDEX CONCURRENTLY page_counters_hits_idx;
DROP FUNCTION bump_counter();
