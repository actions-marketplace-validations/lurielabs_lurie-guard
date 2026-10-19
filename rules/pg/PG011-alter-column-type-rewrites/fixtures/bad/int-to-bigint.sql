-- from: db-skills/skills/pg-online-migrations/examples/bad/test.sql@c6eb44e
-- MISTAKE: int -> bigint is not binary coercible: another full rewrite.
ALTER TABLE orders ALTER COLUMN account_id TYPE bigint; -- expect: PG011
-- from: db-skills/skills/pg-keys-and-types/examples/bad/test.sql@c6eb44e
ALTER TABLE customers ALTER COLUMN email TYPE varchar(10); -- expect: PG011
ALTER TABLE customers ALTER COLUMN created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC'; -- expect: PG011
