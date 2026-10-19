-- from: db-skills/skills/pg-vacuum-and-bloat/examples/bad/test.sql@c6eb44e
VACUUM FULL page_counters; -- expect: PG015
VACUUM (FULL, ANALYZE); -- expect: PG015
CLUSTER page_counters USING page_counters_pkey; -- expect: PG015
REINDEX INDEX page_counters_hits_idx; -- expect: PG015
REINDEX TABLE page_counters; -- expect: PG015
REFRESH MATERIALIZED VIEW daily_sales; -- expect: PG015
