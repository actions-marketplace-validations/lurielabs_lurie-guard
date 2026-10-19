-- lurie-guard: ignore PG014 reason="release 2026.41 stopped reading legacy_note; it is out everywhere"
ALTER TABLE orders DROP COLUMN legacy_note;
