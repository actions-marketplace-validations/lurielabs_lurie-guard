CREATE TABLE page_counters (id bigint PRIMARY KEY, hits bigint NOT NULL DEFAULT 0);
CREATE INDEX page_counters_hits_idx ON page_counters (hits);
VACUUM FULL page_counters;
CLUSTER page_counters USING page_counters_pkey;
REINDEX INDEX page_counters_hits_idx;
REINDEX TABLE page_counters;
