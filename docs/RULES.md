# Rule authoring standard

Every finding lurie-guard reports comes from a rule. This document is the contract a rule must meet before it ships. `scripts/validate.sh` enforces the mechanical parts; a reviewer checks the rest with `/review-rule`.

## One rule, one mistake

A rule detects one mistake with one fix. If the description needs "or", it is two rules. If two rules always fire together, they are one rule with two fixtures.

A rule is named after the mistake, not the fix: `create-index-not-concurrently`, not `use-concurrently`.

## Rule folder layout

```
rules/<pack>/<ID>-<slug>/
├── RULE.md          # frontmatter + the rule text (the only documentation of the rule)
├── rule.ts          # the detector: a matcher over the parse tree, exports `rule`
├── rule.test.ts     # runs every fixture through the engine and asserts the findings
└── fixtures/
    ├── bad/         # *.sql that must trigger the rule
    └── good/        # *.sql that must not trigger it
```

`<pack>` is `pg` for PostgreSQL migrations. Later packs: `mysql`, `java`, `go`, and others ([ROADMAP.md](ROADMAP.md)). `<ID>` is the pack prefix in capitals plus three digits (`PG001`). Ids are never reused: a retired rule keeps its id and its folder with `status: deprecated`.

## Required frontmatter

```yaml
---
id: PG001
name: create-index-not-concurrently
severity: error            # error | warning | info
pack: pg
since: 0.1.0               # the release that first shipped the rule
status: active             # active | deprecated
skill: db-skills/skills/pg-online-migrations
evidence:
  - db-skills/skills/pg-online-migrations/examples/bad/test.sql#L121-L128
  - https://www.postgresql.org/docs/18/sql-createindex.html
verified: 2026-10-19       # the date the rule's facts were last checked against the sources
---
```

- `skill` names the sister-repository skill whose rule this detector enforces. Every rule has exactly one. The skill's position is the rule's position.
- `evidence` lists at least one measured item (a line range in a sister-repository test that asserts the cost) and at least one primary source (the PostgreSQL manual, the framework's own documentation). Sister-repository paths are resolved at the commit pinned in `scripts/validate.sh` (`DB_SKILLS_REF`), so a moved test fails validation here instead of silently pointing nowhere.
- `verified` follows the sister repositories: `check-freshness.sh` fails once it is more than six months old.

## Required sections of RULE.md

In this order.

1. **What it detects.** One paragraph. The exact statement shapes, in SQL terms (`CREATE INDEX` on a table that is not created in the same migration set, without `CONCURRENTLY`).
2. **Why it matters.** The cost in production, with the number from the evidence: the lock mode, the scan, the rewrite, the error code, the index size. Quote the primary source where it states the behavior. Do not pad.
3. **The fix.** The statement the user should write instead, as a code block. If the fix has several steps (`NOT VALID` then `VALIDATE`), show all of them in order.
4. **When it does not apply.** The exemptions the detector implements, each with the reason. These are the skill's "When not to apply" items that a parser can recognize. Every exemption has a `good` fixture.
5. **Message.** The exact text the user sees, in the three parts described below.
6. **Fixtures.** One line per file in `fixtures/`, saying what it shows.

## Fixtures

Fixtures are the rule's tests and its documentation. They come from the skill's `examples/good` and `examples/bad` whenever the skill has the statement; trimmed to what the rule needs, with the skill's own comments kept where they explain the mistake.

- A `bad` fixture marks every line that must produce a finding with a trailing comment `-- expect: <ID>`. The harness fails if a finding is missing, extra, or on another line.
- A `good` fixture has no `-- expect:` markers and must produce zero findings from this rule. Other rules may fire on it; the harness scopes the assertion to the rule under test unless the file says `-- expect-none` at the top.
- There is at least one `good` fixture per exemption listed in "When it does not apply", and one for the correct form of the statement.
- A fixture that depends on a framework wrapper (a Flyway file name, a Rails `disable_ddl_transaction!`, a Django `atomic = False`) lives under a path that the migration detector recognizes, for example `fixtures/good/db/migrate/20261019_add_index.rb`, so the test exercises the detector as well as the rule.
- A fixture must parse. A file that PostgreSQL's parser rejects is a test of the parser, not of the rule, and belongs in `src/`'s tests.

The weekly `scripts/test-fixtures.sh` runs each `bad` fixture against PostgreSQL 15 and 18 in Docker, wrapped in the same assertion the evidence line points to (`held_locks`, `pg_relation_filenode`, `xact_seq_scans` from db-skills' `scripts/lib`). That is what keeps the evidence tied to the fixture rather than to a sentence in a document.

## Messages

A message has three parts, each one or two sentences, in this order:

1. **What happens.** The production effect, in the present tense, naming the table when known. "`CREATE INDEX` holds a `SHARE` lock on `orders` for the whole build; every insert and update waits."
2. **The fix.** "Build it with `CREATE INDEX CONCURRENTLY`, outside a transaction."
3. **The exception.** "Not needed if `orders` is new in this release or empty." Omit when the rule has no exemption.

The message ends with the rule id and the evidence link: `(PG001, evidence)`. Variables in the message are limited to identifiers from the statement; never interpolate user comments or file contents.

## Severity policy

| Severity | Meaning | Required evidence | Default effect |
|---|---|---|---|
| `error` | The statement will take an outage-class lock, rewrite or scan the table, or fail outright on a non-empty table | A measured assertion (lock mode, filenode change, scan count, SQLSTATE) in a sister-repository test, or in this repository's `scripts/test-fixtures.sh` run against PostgreSQL 15 and 18 when the sister repository has no example for the statement; in that case the issue to add the example upstream is linked in the frontmatter | Fails the check when the config sets `fail_on: error`; the default is `none` (report-only) through v0.x ([ADR 0007](adr/0007-report-only-default.md)) |
| `warning` | The statement has a documented cost or breaks the running release, but legitimate exceptions are common or the cost is not measured in a fixture | A primary-source citation; a measured fixture when one exists | Reported, never fails the check by default |
| `info` | An opinion the skills hold that teams may reasonably reject | A primary-source citation | Off by default; enabled per rule in `.lurie-guard.yml` |

A rule starts at the severity its evidence supports, not higher. A `warning` is promoted to `error` only when all of the following hold:

1. A measured fixture exists and runs in `test-fixtures.sh`.
2. The rule has run on at least 500 real migration files from the pilot corpus and the public fixture corpus with no confirmed false positive.
3. Every exemption in the skill's "When not to apply" that a parser can recognize is implemented and has a `good` fixture.
4. The promotion is its own PR, referencing the corpus run, and ships in a minor release with a changelog line.

## False positives

A false positive is a finding on a statement that does not have the cost the rule claims. It is a bug with a deadline, not a matter of taste.

1. Reproduce it as a `good` fixture in the rule's folder. The fixture fails.
2. If the rule has `severity: error`, demote it to `warning` in a patch release within 48 hours, with the failing fixture committed and skipped (`-- skip: #<issue>`), so the finding stops blocking merges while the fix is pending.
3. Fix the detector or add the exemption. Un-skip the fixture. Restore the severity in the same PR only if the fixture now passes and no other fixture changed.
4. Record the case in the rule's "When it does not apply".

A report that the rule is right but the team disagrees with the position is not a false positive. The answer is suppression with a reason ([SPEC-MVP.md](SPEC-MVP.md), "Suppression"), or an issue in the sister repository to change the skill.

## Deprecation

A rule is deprecated when the database no longer has the cost (for example PostgreSQL makes an operation metadata-only), when the skill changes its position, or when a better rule replaces it.

1. Set `status: deprecated` and add a **Deprecated** line under the frontmatter saying why and, if there is one, the replacement id.
2. The rule stops running by default in the next minor release. Enabling it explicitly in `.lurie-guard.yml` still works and prints a deprecation note.
3. The folder, the fixtures and the id stay forever. The README index moves the rule to a "Deprecated" table.

## Version gates

PostgreSQL versions differ. A rule whose cost or fix depends on the major says so inline, as the skills do ("on PG 18+ use `ADD CONSTRAINT ... NOT NULL ... NOT VALID`"). The detector reads `postgres_version` from `.lurie-guard.yml` (default: 15, the oldest major db-skills tests) and adjusts the fix text, never the finding: a statement that is unsafe on 15 is reported even when the configured version is 18, unless the statement is safe on 18 and the config says 18.

## Checklist before opening the PR

- [ ] One mistake, one fix, named after the mistake.
- [ ] Frontmatter complete; `skill` and `evidence` resolve; `verified` is today.
- [ ] `bad` fixtures copied from the skill where it has the statement, each finding marked `-- expect:`.
- [ ] One `good` fixture per exemption and one for the correct form.
- [ ] Message has the three parts and names the table.
- [ ] Severity matches the evidence table.
- [ ] `bash scripts/validate.sh` and `bash scripts/test-rules.sh` pass; two runs produce identical output.
- [ ] README index updated in both languages.
