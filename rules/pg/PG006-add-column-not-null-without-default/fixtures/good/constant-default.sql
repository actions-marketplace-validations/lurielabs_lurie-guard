ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'new';
ALTER TABLE orders ADD COLUMN note text;
