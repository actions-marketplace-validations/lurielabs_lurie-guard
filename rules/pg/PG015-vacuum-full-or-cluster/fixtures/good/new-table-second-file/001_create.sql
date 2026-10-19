CREATE TABLE page_counters (id bigint PRIMARY KEY, hits bigint NOT NULL DEFAULT 0);
CREATE INDEX page_counters_hits_idx ON page_counters (hits);
