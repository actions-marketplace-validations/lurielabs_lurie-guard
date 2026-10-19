---
id: <PACK><nnn>
name: <mistake-in-kebab-case>
severity: <error | warning | info>
pack: <pg>
since: <release that first ships it>
status: active
skill: <db-skills/skills/pg-...>
evidence:
  - <db-skills/skills/pg-.../examples/bad/test.sql#Lx-Ly>   # the assertion that measures the cost
  - <https://www.postgresql.org/docs/18/...>                 # the primary source
verified: <YYYY-MM-DD>
---

# <ID>: <mistake, as a short noun phrase>

## What it detects

<One paragraph. The exact statement shapes, in SQL terms, and the condition that makes them a mistake (for example, the table is not created in the same migration set).>

## Why it matters

<The cost in production with the number from the evidence: the lock mode, the scan, the rewrite, the SQLSTATE, the size. Quote the primary source where it states the behavior. No padding.>

## The fix

```sql
<the statement(s) to write instead, in order>
```

## When it does not apply

- <Exemption the detector implements, with the reason. One `good` fixture per item.>
- <...>

## Message

> <What happens, naming the table.> <The fix.> <The exception.> (<ID>, [evidence](<link>))

## Fixtures

- `fixtures/bad/<file>.sql`: <what it shows>
- `fixtures/good/<file>.sql`: <what it shows>
