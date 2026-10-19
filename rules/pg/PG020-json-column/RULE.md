---
id: PG020
name: json-column
severity: warning
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-keys-and-types
evidence:
  - db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L77-L82
  - https://www.postgresql.org/docs/18/datatype-json.html
verified: 2026-10-19
---

# PG020: `json` column instead of `jsonb`

## What it detects

A column of type `json` (not `jsonb`) in `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN` or `ALTER TABLE ... ALTER COLUMN ... TYPE`.

## Why it matters

`json` "stores an exact copy of the input text, which processing functions must reparse on each execution", while `jsonb` is decomposed binary, supports indexing, and "most applications should prefer" it ([JSON types](https://www.postgresql.org/docs/18/datatype-json.html)). The db-skills bad example stores `{"gift": true, "gift": false, "total": "abc"}` in a `json` column and asserts that both copies of the duplicate key are kept and that `details = '{}'::json` fails with SQLSTATE `42883` (no equality operator); the good example's `jsonb` keeps the last duplicate and compares documents with `=`.

## The fix

```sql
details jsonb NOT NULL DEFAULT '{}'
```

Changing an existing column's type rewrites the table (PG011): fix it at creation, or expand/contract.

## When it does not apply

- A webhook body or document kept byte for byte for audit, where key order and duplicate keys must survive: keep `json` and suppress with that reason.

## Message

> `details json` on `orders` stores the input text as is: it keeps duplicate keys, is reparsed on every read, cannot be indexed with GIN and has no `=` operator (SQLSTATE `42883` in the db-skills test). Declare it `jsonb`, which keeps the last duplicate key, supports indexing and comparison, and is what "most applications should prefer". Not needed for a payload kept byte for byte for audit (key order and duplicates preserved); suppress with that reason. (PG020, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L77-L82))

## Fixtures

- `fixtures/bad/json.sql`: the skill's `details json`, plus `ADD COLUMN ... json` and `json[]`.
- `fixtures/bad/rails/db/migrate/20261019120000_add_json.rb`: `add_column ..., :json`.
- `fixtures/good/jsonb.sql`: the skill's `attributes jsonb`.
