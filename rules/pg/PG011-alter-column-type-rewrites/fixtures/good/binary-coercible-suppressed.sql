-- lurie-guard: ignore PG011 reason="email is varchar(50); varchar(n) to text is binary-coercible, no rewrite"
ALTER TABLE customers ALTER COLUMN email TYPE text;
