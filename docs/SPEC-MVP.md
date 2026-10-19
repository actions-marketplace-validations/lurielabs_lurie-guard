# MVP specification

Status: design, 2026-10-19. The MVP is the PostgreSQL migration pack, deterministic, as a GitHub Action. This document is the contract the first release (`v0.1.0`, tag `v1` once the pilots confirm it) must meet. Every acceptance criterion at the end is checkable by a test.

## User stories

1. As a developer, I open a PR that adds a migration file. Within the time my other checks take, I see a review comment on the exact line of the `CREATE INDEX` that would lock the table, saying what happens in production, the fix, and the exception. I did not configure anything beyond adding the action to a workflow.
2. As a platform engineer, I add lurie-guard to the organization's workflow template. Every finding is reported on every PR from day one, and the check passes. When the team trusts the findings, I set `fail_on: error` in `.lurie-guard.yml` and errors block the merge while warnings do not ([ADR 0007](adr/0007-report-only-default.md)). I can suppress a finding with a reason in the SQL, and the reason is visible in the review.
3. As a security engineer, I see lurie-guard's findings in the repository's code scanning tab, with the rule's documentation and a stable fingerprint, so a finding that moves lines is not a new alert.
4. As a team lead, I open the job summary and see every finding of the PR in one table, grouped by file, with counts by severity and a link to the rule.
5. As a developer using a coding agent, the agent reads the review comment, applies the fix, and the next run is clean. The message is specific enough that an agent can act on it without reading the rule.

## Inputs

### The event

The action runs on `pull_request` (`opened`, `synchronize`, `reopened`, `ready_for_review`). It does not run on `pull_request_target`: GitHub's own guidance is "if you don't need a repository write access or secrets, just stick to the `pull_request` trigger", and running untrusted code under `pull_request_target` "may lead to security vulnerabilities" ([events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows), [preventing pwn requests](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)). On a PR from a fork, `GITHUB_TOKEN` is read-only, so the action cannot post review comments; it then writes the job summary, uploads nothing, and sets the exit code. Posting comments on fork PRs is a documented limitation with the two-workflow `workflow_run` pattern as the opt-in solution in [ARCHITECTURE.md](ARCHITECTURE.md).

### Files

The action reads the PR diff through the GitHub API (`GET /repos/{owner}/{repo}/pulls/{pull_number}/files`, paginated) and the file contents from the checkout at the head commit. It only analyzes files that are **added or modified** in the PR and that the migration detector classifies as a PostgreSQL migration. Deleted files are ignored.

### Migration detection

A file is a migration when it matches a path glob from the config or, with no config, one of the built-in framework patterns. The framework also decides the **transaction wrapper**: whether the tool runs the file inside a transaction by default, and how a file opts out. That is what rule PG003 needs.

| Framework | Built-in glob | Runs the file in a transaction by default | Opt-out the detector recognizes |
|---|---|---|---|
| Plain SQL folder | `migrations/**/*.sql`, `db/migrations/**/*.sql`, `sql/migrations/**/*.sql` | Unknown; treated as **not wrapped** unless the config says `transaction: always` | `BEGIN`/`COMMIT` in the file make the wrapped region explicit |
| Flyway | `**/db/migration/V*__*.sql`, `**/db/migration/R*__*.sql` | Yes | A file with the `executeInTransaction=false` setting in its script configuration (`<file>.sql.conf`), or the global flag the config declares |
| Liquibase (SQL format) | `**/changelog/**/*.sql` with the `--liquibase formatted sql` header | Yes | `--changeset ... runInTransaction:false` |
| Rails / Active Record | `db/migrate/*.rb` | Yes | `disable_ddl_transaction!` in the class body |
| Django | `**/migrations/[0-9]*.py` | Yes | `atomic = False` on the `Migration` class |
| Alembic | `**/versions/*.py` | Depends on `transaction_per_migration` and the env; treated as wrapped | `op.get_bind().execute(text("COMMIT"))` before the statement, or `autocommit_block()` |
| Prisma | `prisma/migrations/*/migration.sql` | Yes | No opt-out exists; the finding says so |
| golang-migrate | `**/*.up.sql`, `**/*.down.sql` | No (statement by statement) unless `x-multi-statement` | `-- +migrate` comments are not used; treated as not wrapped |
| dbmate | `db/migrations/*.sql` | Yes | `-- migrate:up transaction:false` |
| sqitch | `deploy/*.sql` | Yes | None recognized; config can override |
| Knex, TypeORM, Sequelize, Ecto, Phinx | Not in the MVP | | |

For Rails, Django and Alembic the detector extracts the raw SQL from `execute` / `RunSQL` / `op.execute` string literals (strings, heredocs, `text("...")`), keeping the line offset inside the host file. In Rails it also maps the DSL helpers `add_index` (with `algorithm: :concurrently`, `unique:`, `name:`, `if_not_exists:`), `add_column` (with `null:`, `default:`), `add_foreign_key` (with `validate: false`, `column:`), `change_column_null` and `change_column` to the equivalent statement, and recognizes `disable_ddl_transaction!`. Anything the detector cannot map is skipped and listed in the summary as "not analyzed", never guessed. The exact mapping is the table in the README. **Django and Alembic DSL extraction** (`AddField`, `AddIndex`, `op.add_column`, `op.create_index`, ...) is not in the MVP; it is scheduled for after the first pilot that asks for it ([ADR 0008](adr/0008-host-language-migrations-mvp-scope.md)). Until then those files are reviewed for their raw SQL and their transaction opt-out only.

The config overrides every built-in: `paths`, `exclude`, `framework`, `transaction`.

### Parsing

SQL is parsed with PostgreSQL's own parser (`libpg_query`, compiled to WebAssembly; [ARCHITECTURE.md](ARCHITECTURE.md), [ADR 0001](adr/0001-runtime-javascript-action-with-wasm-parser.md)). A file that fails to parse produces one `info` finding ("could not parse; no rules ran on this file") with the parser's error position, and the run continues. Parse failures never fail the check.

Statements are analyzed in order, with a per-file state: the set of tables created in the file so far (and in every other added migration file of the same PR), whether the cursor is inside an explicit `BEGIN`/`COMMIT`, the current `lock_timeout` set by `SET`/`SET LOCAL`, and the constraints added `NOT VALID` so far.

## Rules

Severity follows [RULES.md](RULES.md): `error` only with a measured assertion in db-skills. "Existing table" means a table not created in the same migration set (this file plus every other added migration file in the PR). Every rule has that exemption unless the table says otherwise.

| Id | Name | Severity | Detects | Skill | Evidence (db-skills) |
|---|---|---|---|---|---|
| PG001 | create-index-not-concurrently | error | `CREATE [UNIQUE] INDEX` without `CONCURRENTLY` on an existing table | pg-online-migrations (rule 6), pg-indexing (rule 8) | `pg-online-migrations/examples/bad/test.sql`: plain `CREATE INDEX` holds `ShareLock` on `orders`; the docs: it "locks out writes (but not reads) on the table until it's done" |
| PG002 | drop-index-not-concurrently | error | `DROP INDEX` without `CONCURRENTLY` where the index is not created in the same migration set | pg-online-migrations (rule 6), pg-indexing (rule 8) | `pg-online-migrations/examples/bad/test.sql`: a plain `DROP INDEX` holds `AccessExclusiveLock` on `orders` until commit and a `SELECT` from another session fails with `55P03` behind it; the docs: "a normal `DROP INDEX` acquires an exclusive lock on the table, blocking other accesses until the index drop can be completed" ([DROP INDEX](https://www.postgresql.org/docs/18/sql-dropindex.html)) |
| PG003 | concurrently-inside-transaction | error | `CREATE INDEX CONCURRENTLY`, `DROP INDEX CONCURRENTLY` or `REINDEX ... CONCURRENTLY` inside an explicit `BEGIN` block or in a file the framework wraps in a transaction without the opt-out | pg-online-migrations (rule 6) | `pg-online-migrations/examples/good/test.sql`: the build fails with SQLSTATE `25001` inside a transaction block |
| PG004 | ddl-without-lock-timeout | warning | A statement that takes `ACCESS EXCLUSIVE` or `SHARE ROW EXCLUSIVE` on an existing table (`ALTER TABLE`, `DROP TABLE`, `DROP INDEX`, `TRUNCATE`, `CLUSTER`) with no `SET lock_timeout` / `SET LOCAL lock_timeout` earlier in the file, and the config does not declare that the runner sets it | pg-online-migrations (rule 1), pg-transactions-and-locking (rule 4) | `pg-online-migrations/examples/bad/test.sql`: with `lock_timeout = 0` the `ALTER` queues behind a report and a plain `SELECT` is blocked behind it (`55P03` observed from the application side) |
| PG005 | add-column-rewrites-table | error | `ALTER TABLE ... ADD COLUMN` on an existing table with a volatile `DEFAULT` (`clock_timestamp()`, `random()`, `gen_random_uuid()`, `uuidv7()`, any function not marked immutable or stable in the built-in list), a `GENERATED ... STORED` column, or a `GENERATED ... AS IDENTITY` column | pg-online-migrations (rule 3) | `pg-online-migrations/examples/bad/test.sql`: `DEFAULT clock_timestamp()` changes `pg_relation_filenode` of the table and of `orders_pkey`; the docs: a volatile default "will cause the entire table and its indexes to be rewritten" |
| PG006 | add-column-not-null-without-default | error | `ALTER TABLE ... ADD COLUMN ... NOT NULL` without `DEFAULT` on an existing table | pg-online-migrations (rule 3), pg-keys-and-types (rule 6) | `pg-online-migrations/examples/bad/test.sql`: `ADD COLUMN sku text NOT NULL` fails with `23502` on the 100,000-row `orders`, so the migration aborts; the good example shows that a constant default keeps the filenode |
| PG007 | set-not-null-without-check | error | `ALTER TABLE ... ALTER COLUMN ... SET NOT NULL` on an existing table without a `CHECK (col IS NOT NULL)` constraint added and validated earlier in the migration set (or, with `postgres_version >= 18`, without the `ADD CONSTRAINT ... NOT NULL ... NOT VALID` then `VALIDATE` path) | pg-online-migrations (rule 5) | `pg-online-migrations/examples/bad/test.sql`: the bare `SET NOT NULL` scans the table (`xact_seq_scans` increases) under `AccessExclusiveLock`; the good example scans nothing after the validated check |
| PG008 | foreign-key-without-not-valid | error | `ALTER TABLE ... ADD [CONSTRAINT] FOREIGN KEY` on an existing table without `NOT VALID` | pg-online-migrations (rule 4) | `pg-online-migrations/examples/bad/test.sql`: the one-step foreign key scans `orders` while holding `SHARE ROW EXCLUSIVE` on `orders` and `accounts`; an `INSERT INTO accounts` from another session fails with `55P03` |
| PG009 | check-without-not-valid | error | `ALTER TABLE ... ADD [CONSTRAINT] CHECK (...)` on an existing table without `NOT VALID` | pg-online-migrations (rule 4), pg-keys-and-types (rule 4) | `pg-keys-and-types/examples/good/test.sql`: swapping a `CHECK` with `NOT VALID` then `VALIDATE` keeps the filenode; `VALIDATE` takes only `SHARE UPDATE EXCLUSIVE` |
| PG010 | validate-in-same-transaction | error | `ALTER TABLE ... VALIDATE CONSTRAINT` in the same transaction (explicit block or framework wrapper) as the `ADD ... NOT VALID` of the same constraint | pg-online-migrations (rule 4) | Same evidence as PG008: the lock taken by `ADD` is held until commit, so the validation scan runs under it |
| PG011 | alter-column-type-rewrites | error | `ALTER TABLE ... ALTER COLUMN ... TYPE` on an existing table, unless the (from, to) pair is in the binary-coercible list (`varchar(n)` to `varchar(m)` with m > n or unbounded, `varchar` to `text`, `numeric(p,s)` to `numeric(p',s)` with p' > p, adding a `timestamp` precision) | pg-online-migrations (rules 3 and 8), pg-keys-and-types | `pg-online-migrations/examples/bad/test.sql`: `int` to `bigint` changes the filenode; `pg-keys-and-types/examples/bad/test.sql`: `varchar(20)` to `varchar(10)` writes a new copy of the table |
| PG012 | unique-or-pk-without-using-index | error | `ALTER TABLE ... ADD [CONSTRAINT] UNIQUE (...)` or `PRIMARY KEY (...)` on an existing table, without `USING INDEX` | pg-online-migrations (rule 7) | `pg-online-migrations/examples/bad/test.sql`: `ADD CONSTRAINT ... UNIQUE (email)` scans `accounts` and holds `AccessExclusiveLock,ShareLock` while it builds the index; an `INSERT` from another session fails with `55P03`. The good example: `UNIQUE USING INDEX` over a concurrently built index is a catalog change, "a fast operation" per the docs |
| PG013 | rename-in-one-step | warning | `ALTER TABLE ... RENAME COLUMN`, `ALTER TABLE ... RENAME TO` on an existing table | pg-online-migrations (rule 8) | The running release's queries fail at commit; expand/contract is the documented alternative. No measured fixture, hence `warning` |
| PG014 | drop-column-or-table | warning | `ALTER TABLE ... DROP COLUMN`, `DROP TABLE` on an existing table | pg-online-migrations (rule 8) | Same as PG013; the comment asks for the suppression reason to name the release that stopped reading the column |
| PG015 | vacuum-full-or-cluster | error | `VACUUM FULL`, `CLUSTER`, `REINDEX` without `CONCURRENTLY`, `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY` in a migration | pg-vacuum-and-bloat (rule 6) | `pg-vacuum-and-bloat/examples/bad/test.sql`: a `VACUUM FULL` queued behind a report blocks a plain `SELECT` (`55P03`) and leaves `page_counters` with a new filenode; `CLUSTER` holds `AccessExclusiveLock,ShareLock` and changes the filenode; a plain `REINDEX` holds `ShareLock` on the table and `AccessExclusiveLock` on the index. `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY` is in the manual's list of commands that acquire `ACCESS EXCLUSIVE` ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)); the docs: `VACUUM FULL` "requires an ACCESS EXCLUSIVE lock on the table" and "requires extra disk space" ([VACUUM](https://www.postgresql.org/docs/18/sql-vacuum.html)) |
| PG016 | create-index-concurrently-if-not-exists | warning | `CREATE INDEX CONCURRENTLY IF NOT EXISTS` | pg-online-migrations (rule 6) | `pg-online-migrations/examples/bad/test.sql`: after a failed concurrent build the retry with `IF NOT EXISTS` skips the build and `indisvalid` stays false |
| PG017 | serial-or-integer-primary-key | warning | `CREATE TABLE` with a primary key of type `serial`, `integer` or `smallint`; `ADD COLUMN ... serial PRIMARY KEY` | pg-keys-and-types (rule 1) | `pg-keys-and-types/examples/bad/test.sql`: the `serial` sequence stops at 2147483647 (`2200H`); a later retype rewrites the table |
| PG018 | random-uuid-primary-key | warning | A `uuid` primary key whose `DEFAULT` is `gen_random_uuid()`, `uuid_generate_v4()` or `uuidv4()` | pg-keys-and-types (rule 2) | `pg-keys-and-types/examples/bad/test.sql`: random inserts leave leaf pages under 75% full and the index over 30% larger than the same keys in order |
| PG019 | timestamp-without-time-zone | warning | A column of type `timestamp` (without time zone) in `CREATE TABLE` or `ADD COLUMN` | pg-keys-and-types (rule 3) | `pg-keys-and-types/examples/bad/test.sql`: the same instant written from two time zones is stored 12 hours apart |
| PG020 | json-column | warning | A column of type `json` (not `jsonb`) | pg-keys-and-types (rule 7) | `pg-keys-and-types/examples/bad/test.sql`: `json` keeps duplicate keys and has no `=` operator (`42883`) |
| PG021 | varchar-or-char-length | info | A column of type `varchar(n)` or `char(n)` | pg-keys-and-types (rule 4) | `pg-keys-and-types/examples/bad/test.sql`: a cast silently truncates; shrinking the limit rewrites the table. `info` because many teams keep `varchar(n)` deliberately |

Twenty-one rules; twenty on by default (PG021 is `info`, off by default; PG013 and PG014 are on as warnings). The suppression findings `PGS01` and `PGS02` (see "Suppression") are produced by the engine, not by rule folders, and are not counted here.

Candidate rules not in the MVP, because they need schema context or a measured fixture that does not exist yet: foreign key without an index on the referencing columns (needs the index list of the table), `ACCESS EXCLUSIVE` on more than one table in one transaction, `statement_timeout` lower than `lock_timeout`, partial index predicate that no query can match, `OFFSET` pagination and N+1 in application code (LLM layer, [ROADMAP.md](ROADMAP.md)).

### Message text

Each rule's exact message is in its `RULE.md`. The shape, with PG001 as the example:

> `CREATE INDEX` holds a `SHARE` lock on `orders` for the whole build; every insert and update on `orders` waits. Build it with `CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at)`, outside a transaction (PG003 checks that). Not needed if `orders` is new in this release or empty. (PG001, [evidence](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-online-migrations/examples/bad/test.sql))

The fix suggestion is a GitHub suggested change (a ```` ```suggestion ```` block) when the fix is a single-statement replacement on the same lines (PG001, PG002, PG008, PG009, PG016, PG018 in `CREATE TABLE`); otherwise it is a code block in the comment.

## Configuration: `.lurie-guard.yml`

Optional, at the repository root. Every key has a default. Unknown keys fail the run with a clear message, so a typo does not silently disable a rule.

```yaml
version: 1

postgres_version: 15          # the oldest major in production; changes fix text and PG007's path, never whether a finding exists

paths:                        # overrides the built-in globs; relative to the repo root
  - db/migrate/**/*.sql
  - services/*/migrations/**/*.sql
exclude:
  - db/migrate/seed/**

framework: auto               # auto | sql | flyway | liquibase | rails | django | alembic | prisma | golang-migrate | dbmate | sqitch
transaction: auto             # auto | always | never: whether the runner wraps each file in a transaction
lock_timeout_set_by_runner: false   # true silences PG004 when the runner sets lock_timeout for every session

fail_on: none                 # none | warning | error: the lowest severity that fails the check.
                              # Default none through v0.x: report-only (ADR 0007). Set error to block merges.
rules:
  PG013: off                  # off | info | warning | error
  PG021: info
  PG004:
    severity: error
    exclude:                  # per-rule path exclusions
      - db/migrate/legacy/**

outputs:
  review_comments: true
  sarif: true
  summary: true
  max_comments: 25            # further findings go to the summary only; the first comment says so

llm:                          # only used when the anthropic_api_key input is set
  model: claude-sonnet-5-5
  explain: true               # plain-words explanation appended to deterministic findings
  extra_checks: false         # N+1, OFFSET pagination, pool sizing, transactions around network calls (post-MVP)
  max_cost_usd_per_run: 0.50
```

The config is read from the **base** branch of the PR, not the head, so a PR cannot turn rules off for itself. A PR that changes `.lurie-guard.yml` gets a notice in the summary saying the new config applies after merge.

## Suppression

Inline, with a reason, on the statement's line or the line above:

```sql
-- lurie-guard: ignore PG001 reason="orders is created in V12 and still empty in production"
CREATE INDEX orders_created_at_idx ON orders (created_at);
```

- The reason is required; a suppression without one is reported as a `warning` (`PGS01 suppression-without-reason`) and does not suppress.
- `ignore PG001,PG004` suppresses several rules; `ignore all` is accepted and reported as a warning so it is visible in review.
- A suppression that matches no finding is reported as `info` (`PGS02 unused-suppression`), so stale suppressions get cleaned up.
- Suppressions appear in the job summary under their own heading with the reason, so a reviewer sees them without opening the file.
- For Rails and Django the comment uses the host language's comment syntax (`# lurie-guard: ignore ...`) on the line above the `execute`/`RunSQL` call.

## Outputs

### Review comments

One review per run, created with `POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews` with all inline comments in the `comments` array, so the run makes one content-generating request instead of one per finding (secondary rate limits allow "no more than 80 content-generating requests per minute"; `GITHUB_TOKEN` has 1,000 requests per hour per repository, [rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)). The review `event` is `COMMENT`; lurie-guard never requests changes or approves, so it does not interfere with the team's review rules. Each comment uses `line` and `side: RIGHT` ([create a review comment](https://docs.github.com/en/rest/pulls/comments)); a finding on a line outside the diff (possible when the detector reports the table's `CREATE TABLE` in context) goes to the summary only.

Idempotence: the action records the finding fingerprints it posted in a hidden HTML comment in the review body (`<!-- lurie-guard:fingerprints ... -->`) and, on the next run, posts only new findings and resolves (replies to) the ones that disappeared. A clean run on a PR that had findings posts one comment: "All lurie-guard findings resolved."

### SARIF

One SARIF 2.1.0 file ("Code scanning only supports SARIF version 2.1.0", [SARIF support](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)) written to the path in the `sarif_file` output and uploaded by the action itself when `security-events: write` is granted (the action calls the code scanning upload endpoint directly so the workflow does not need a second step; the workflow can instead pass the file to `github/codeql-action/upload-sarif`). Properties:

- `tool.driver.name: lurie-guard`, `semanticVersion` from the release, `informationUri` the repository.
- One `rules[]` entry per rule with `id`, `shortDescription`, `fullDescription`, `help.markdown` (the RULE.md sections 1 to 4; GitHub displays `help.markdown` when present), `helpUri` to the rule's page, `defaultConfiguration.level` (`error`/`warning`/`note`), and `properties.security-severity` left unset (these are not security findings; the scale is for CVSS-style scores).
- One `results[]` entry per finding with `ruleId`, `level`, `message.text`, one `locations[]` entry with the file and the statement's line range, and `partialFingerprints.primaryLocationLineHash` computed as GitHub documents so a finding that moves lines stays one alert.
- Suppressed findings are included with `suppressions[]` (`kind: inSource`, `justification` = the reason), so code scanning shows them as dismissed, not missing.
- Limits respected: at most 25,000 results per run and 10 MB compressed; the action truncates with a notice long before that.

`category` is `lurie-guard/pg` so other SARIF uploads in the same workflow are not overwritten. On private repositories, code scanning needs a GitHub Code Security license; when the upload is refused the action prints the reason once and continues.

### Job summary

Markdown appended to `$GITHUB_STEP_SUMMARY` (GitHub-flavored, 1 MiB limit per step, [workflow commands](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions)): a header with counts by severity, a table of findings (file, line, rule, message), a table of suppressions with reasons, the files analyzed and the files skipped (with the reason: not a migration, could not parse), the framework detected, and the run time. When the LLM layer ran, its cost in tokens and dollars.

### Annotations

Up to 10 error and 10 warning annotations per step are shown by GitHub; the action emits the first 10 of each with `::error file=...,line=...,title=...::` so a repository without code scanning or with a read-only token still sees findings in the Files changed tab.

### Outputs and exit code

Action outputs: `findings` (count), `errors`, `warnings`, `sarif_file`, `summary_file`. Exit code `1` when any finding at or above `fail_on` remains after suppression; `0` otherwise, including on parse failures and on upload or comment failures (those are logged with `::warning`). With the default `fail_on: none` the exit code is always `0`: the run is report-only, and the summary header and the review body say so and show the `fail_on: error` line that turns blocking on ([ADR 0007](adr/0007-report-only-default.md)). A `strict` input makes an API failure exit `1` for teams that want that.

## Performance budget

Measured in CI on the standard public-repository runner (4 vCPU, 16 GB; private repositories get 2 vCPU, 8 GB, [GitHub-hosted runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)):

| Measure | Budget |
|---|---|
| Action start to first rule running (runtime boot, WASM parser load) | under 2 s |
| 200 migration files, 20 statements each, all 21 rules | under 10 s end to end, under 5 s in the engine |
| One typical PR (3 files) | under 3 s end to end, excluding the GitHub API round trips |
| Peak memory | under 256 MB |
| Bundle size (`dist/`) | under 10 MB including the WASM parser |

The budget is a test in `scripts/test-rules.sh` with a generated 200-file corpus; a regression over 20% fails CI.

## Non-goals of the MVP

- No database connection, no schema snapshot, no `EXPLAIN`. Rules that need them are listed as candidates.
- No MySQL, no application code, no Java/Go rules.
- No auto-fix commits.
- No GitHub App, no hosted service, no dashboard, no account.
- No comments on PRs from forks (read-only token). Documented; opt-in pattern later.
- No Windows or macOS runner testing; the action runs there (pure JavaScript and WASM) but CI tests Linux only.
- No PostgreSQL major below 15.
- The LLM layer is not required for any rule, and when the key is missing nothing degrades except the plain-words explanation. The LLM-only checks (`extra_checks`) are post-MVP.

## Acceptance criteria

Each item is a test or a CI check.

1. `bash scripts/validate.sh` passes: 21 rule folders with ids PG001 to PG021, each with `RULE.md`, `rule.ts`, `rule.test.ts`, at least one `bad` and one `good` fixture, frontmatter complete, evidence paths resolving at the pinned db-skills commit.
2. `bash scripts/test-rules.sh` passes: every fixture produces exactly the findings its `-- expect:` markers declare; the second run's SARIF and comments are byte-identical to the first.
3. For every rule with the "existing table" exemption, a `good` fixture creates the table in the same file and another creates it in a second added file of the same PR; both produce zero findings.
4. For PG003, fixtures under Flyway, Rails, Django, Prisma and dbmate paths trigger the rule without the opt-out and do not trigger it with the opt-out (except Prisma, which has none).
5. For PG004, a fixture with `SET lock_timeout` before the DDL and one with `lock_timeout_set_by_runner: true` in the config produce zero findings.
6. For PG007, the PG 15 path (validated `CHECK` first) and the PG 18 path (`NOT NULL ... NOT VALID` then `VALIDATE`, with `postgres_version: 18`) produce zero findings; the bare `SET NOT NULL` produces one.
7. A suppression with a reason removes the finding and appears in the summary; without a reason it produces `PGS01` and the finding stays; an unused suppression produces `PGS02`.
8. The SARIF file validates against the SARIF 2.1.0 schema and uploads to a test repository's code scanning without error; a finding that moves by three lines between two commits is one alert.
9. The config is read from the base branch: a PR that sets `rules: {PG001: off}` still gets PG001 findings and a notice.
10. An unknown config key, an unknown rule id or an invalid severity fails the run with the key named in the message.
11. A file that does not parse produces one `info` finding naming the position and does not affect the exit code.
12. On a PR from a fork, the action completes with exit code reflecting the findings, writes the summary, and logs that comments and SARIF were skipped because the token is read-only.
13. The performance budget holds on the 200-file corpus.
14. The action runs with `permissions: {contents: read, pull-requests: write, security-events: write}` and nothing else; a workflow with `permissions: contents: read` alone still completes (summary and annotations only).
15. Without `anthropic_api_key`, no network call leaves the runner except to `api.github.com`; the test runs the action under a deny-all egress proxy with an allowlist of that host.
16. With `anthropic_api_key`, the only additional host contacted is `api.anthropic.com`, the request carries the skills context with `cache_control`, and `usage.cache_read_input_tokens` is non-zero from the second finding onward in the same run.
17. `README.md` and `README.pt-BR.md` list all 21 rules with the same ids and severities as `rules/`.
18. With no config, a PR with `error` findings exits `0` and the summary says the run is report-only; with `fail_on: error` in the base-branch config the same PR exits `1`; with `fail_on: warning` a PR with only warnings exits `1` ([ADR 0007](adr/0007-report-only-default.md)).
