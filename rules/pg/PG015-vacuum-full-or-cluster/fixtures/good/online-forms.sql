-- from: db-skills/skills/pg-vacuum-and-bloat/examples/good/test.sql@c6eb44e
VACUUM page_counters;
VACUUM (ANALYZE) page_counters;
REINDEX INDEX CONCURRENTLY page_counters_hits_idx;
REINDEX TABLE CONCURRENTLY page_counters;
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;
