CREATE TABLE scratch_import (id bigint, note text);
ALTER TABLE scratch_import DROP COLUMN note;
DROP TABLE scratch_import;
