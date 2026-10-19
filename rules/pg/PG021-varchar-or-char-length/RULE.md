---
id: PG021
name: varchar-or-char-length
severity: info
pack: pg
since: 0.1.0
status: active
skill: db-skills/skills/pg-keys-and-types
evidence:
  - db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L39-L52
  - https://www.postgresql.org/docs/18/datatype-character.html
verified: 2026-10-19
---

# PG021: `varchar(n)` / `char(n)`

## What it detects

A column of type `varchar(n)` or `char(n)` in `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN` or `ALTER TABLE ... ALTER COLUMN ... TYPE`. Unbounded `varchar` and `text` are not reported. The rule is `info` and off by default: many teams keep `varchar(n)` deliberately. Enable it with `rules: {PG021: info}` (or `warning`).

## Why it matters

"There is no performance difference" among `text`, `varchar(n)` and `varchar`, and `char(n)` "is usually the slowest of the three because of its additional storage costs" ([character types](https://www.postgresql.org/docs/18/datatype-character.html)). `varchar(n)` enforces only a maximum: it still stores `''`, and an explicit cast "will be truncated to n characters without raising an error". The db-skills bad example stores an empty email in `varchar(20)`, casts a long address and asserts it was silently cut to 20 characters, then shrinks the limit to `varchar(10)` and asserts, with `pg_relation_filenode`, that the table was rewritten. The good example states the rule as `CHECK (char_length(email) BETWEEN 3 AND 254)` on `text`, which fails loudly on an empty or a 300-character email and is changed with `NOT VALID` then `VALIDATE` with the same filenode.

## The fix

```sql
email text NOT NULL,
CONSTRAINT customers_email_len CHECK (char_length(email) BETWEEN 3 AND 254)
```

## When it does not apply

- The limit is a real business rule the team keeps deliberately in the type: this is why the rule is `info` and off by default.
- Fixed-length codes defined by a standard (ISO 4217, country codes): `text` with `CHECK (col ~ '^[A-Z]{3}$')` states the rule more precisely than `char(3)`; suppress or keep `char(n)` with a reason.

## Message

> `email varchar(20)` on `customers` enforces only a maximum: it still accepts `''`, an explicit cast silently truncates to 20 characters, and shrinking the limit later rewrites the table. Declare it `text` with a named check, `CONSTRAINT customers_email_len CHECK (char_length(email) BETWEEN 1 AND 20)`, which states the real rule and can be changed with `NOT VALID` then `VALIDATE` and no rewrite. Not needed when the limit is a real business rule the team keeps deliberately, or for fixed-length codes from a standard (then prefer `text` with a regular-expression check). (PG021, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L39-L52))

## Fixtures

- `fixtures/bad/varchar-n.sql`: the skill's `email varchar(20)` and `status varchar(10)`, a `char(3)`, and the `ADD COLUMN` form.
- `fixtures/good/text-with-check.sql`: the skill's `text` with a length `CHECK`, and unbounded `varchar`.
