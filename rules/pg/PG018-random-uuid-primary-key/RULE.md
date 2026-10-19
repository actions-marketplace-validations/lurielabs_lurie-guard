---
id: PG018
name: random-uuid-primary-key
severity: warning
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-keys-and-types
evidence:
  - db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L84-L92
  - https://www.postgresql.org/docs/18/functions-uuid.html
verified: 2026-10-19
---

# PG018: random UUID primary key

## What it detects

A `uuid` primary key column whose `DEFAULT` is `gen_random_uuid()`, `uuid_generate_v4()` or `uuidv4()`, in `CREATE TABLE` or `ALTER TABLE ... ADD COLUMN`.

## Why it matters

A B-tree fills leaf pages to its fillfactor "when extending the index at the right (adding new largest key values)"; pages that become completely full "will be split, leading to fragmentation" ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html)). `gen_random_uuid()` and its PostgreSQL 18 alias `uuidv4()` are random; `uuidv7()` is time-ordered ([UUID functions](https://www.postgresql.org/docs/18/functions-uuid.html)). The db-skills bad example inserts the same 200,000 UUIDs in random order and in key order and asserts, with `pgstatindex`, that the random-order primary key has leaf density under 75% and is over 30% larger than the ordered one (8.7 MB against 6.3 MB in the skill's run). Random keys also spread every insert over the whole index, so the working set is the whole index rather than its right edge.

## The fix

```sql
id uuid PRIMARY KEY DEFAULT uuidv7()   -- PostgreSQL 18+
```

Below 18, generate UUIDv7 in the application, or use `bigint GENERATED ALWAYS AS IDENTITY` when the id never leaves your system (8 bytes against 16).

## When it does not apply

- The id must not reveal when or in what order rows were created: a UUIDv7 contains its creation time (`uuid_extract_timestamp()`). Keep the random key or expose a random token in a separate unique column.
- The key is not the primary key (a random token column) is not reported.

## Message

> `id uuid PRIMARY KEY DEFAULT gen_random_uuid()` on `orders` inserts random keys all over the index: leaf pages split half full (about 65% density in the db-skills test) and the primary key index is over 30% larger than the same keys inserted in order, with every insert touching a random page. Generate UUIDv7 in the application (PostgreSQL below 18 has no `uuidv7()`), or use `bigint GENERATED ALWAYS AS IDENTITY` when the id never leaves your system. Not needed if the id must not reveal creation order; then keep the random key and accept the index cost, or expose a random token in a separate column. (PG018, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L84-L92))

## Fixtures

- `fixtures/bad/random-uuid.sql`: the skill's `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`, a table-level key with `uuid_generate_v4()`, and `uuidv4()`.
- `fixtures/bad/pg18/`: the same with `postgres_version: 18`, where the fix is a suggested `uuidv7()`.
- `fixtures/good/uuidv7-and-identity.sql`: the skill's `uuidv7()` key, a `bigint` identity key, and a random uuid that is not the key.
