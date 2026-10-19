# lurie-guard

**English** | [Português](README.pt-BR.md)

**A GitHub Action that reviews pull requests for the mistakes that cause production incidents and cloud cost, with measured evidence behind every rule.**

> Status: **MVP in development, pre-release** (`0.1.0`, not yet tagged or published). The PostgreSQL pack is built and tested: 21 rules, the engine, the four outputs, the CLI. It has not run on a real repository yet; the pilots come next ([docs/ROADMAP.md](docs/ROADMAP.md)). The documents in [`docs/`](docs/) are the specification the code follows.

Most database incidents start with a migration that looked fine in review: a `CREATE INDEX` that holds a `SHARE` lock on the orders table for the whole build, an `ALTER TABLE` queued behind a long report while every new query queues behind it, a `SET NOT NULL` that scans a hundred million rows under `ACCESS EXCLUSIVE`. The PostgreSQL manual documents every one of them. The PR gets approved anyway.

lurie-guard parses the migrations in a PR with PostgreSQL's own parser, applies deterministic rules, and tells the developer what will happen, what to write instead, and when the rule does not apply. Every rule links to a test in [db-skills](https://github.com/rafapeixer/db-skills) that runs against real PostgreSQL 15 and 18 and shows the lock, the rewrite or the scan it prevents.

## What it does

```yaml
# .github/workflows/lurie-guard.yml
name: lurie-guard
on:
  pull_request:
permissions:
  contents: read          # read the diff and the config
  pull-requests: write    # post the review comments
  security-events: write  # upload the SARIF to code scanning
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7          # pin to a commit SHA in your repository
      - uses: lurielabs/lurie-guard@v1       # pin to a commit SHA in your repository
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}   # optional: plain-words explanations with your own key
```

- **Review comments** on the exact line, with a suggested change when the fix is one statement.
- **SARIF** uploaded to GitHub code scanning, with stable fingerprints and the rule's documentation.
- **A job summary** with every finding, every suppression and its reason.
- **Report-only by default.** Every finding is reported and the check passes. When you trust the findings, add `fail_on: error` to `.lurie-guard.yml` and errors block the merge; the file is read from the base branch so a PR cannot turn its own checks off ([ADR 0007](docs/adr/0007-report-only-default.md)).

  ```yaml
  # .lurie-guard.yml (optional)
  version: 1
  fail_on: error     # block merges on error findings; default is none (report-only)
  ```
- **Inline suppression with a reason**: `-- lurie-guard: ignore PG001 reason="orders is new in this release"`. A suppression without a reason is reported and suppresses nothing; an unused one is reported too.
- **No server, no telemetry.** Code never leaves the runner. The only host the action contacts is `api.github.com`; with your own Anthropic key, `api.anthropic.com` as well, from inside your runner under your API terms, and the explanation it adds never decides whether a finding exists.

### What works in the MVP

| Piece | State |
|---|---|
| Parser | PostgreSQL's own parser (`libpg_query` 18, WebAssembly), statements positioned in the host file; a file that does not parse gives one `info` finding and the run continues |
| Rules | The 21 rules below, each with `bad`/`good` fixtures, an evidence link into db-skills at a pinned commit, and (for `error` rules) a cost test that runs on PostgreSQL 15 and 18 |
| "Existing table" exemption | A table created by `CREATE TABLE` in any added migration file of the PR is new; rules PG001 to PG015 skip it |
| Frameworks | Transaction wrapper per framework (table below), Flyway `.conf`, Liquibase `runInTransaction`, Rails `disable_ddl_transaction!`, Django `atomic = False`, Alembic `autocommit_block()`, dbmate `transaction:false` |
| Host languages | Raw SQL from Rails `execute`, Django `RunSQL`, Alembic `op.execute`; the Rails helpers `add_index`, `add_column`, `add_foreign_key`, `change_column_null`, `change_column` (plus `create_table`, `drop_table`, `remove_column`, `rename_column`, `rename_table`) mapped to SQL; anything else listed as "not analyzed" |
| Config | `.lurie-guard.yml` read from the base branch; unknown keys, rule ids or severities fail the run naming the key |
| Outputs | One review per run with suggested changes and idempotent fingerprints; SARIF 2.1.0 validated against the schema, with `partialFingerprints` and in-source suppressions, uploaded by the action; job summary; annotations; outputs and exit code |
| Fork PRs | Summary, annotations and exit code; comments and upload skipped (the token is read-only) |
| Explainer | Optional, with your key, the rule's skill text as cached context, cost shown in the summary. Implemented and unit-tested with a fake client; not yet exercised against the live API |
| CLI | `node dist/cli.js` (soon `npx lurie-guard`): the same engine on a folder or a list of files, for history scans |
| Not yet | Django and Alembic DSL calls (`AddField`, `op.add_column`, ...) wait for the first pilot that asks ([ADR 0008](docs/adr/0008-host-language-migrations-mvp-scope.md)); the egress-proxy acceptance test runs only in CI once the repository is published |

### Frameworks

| Framework | Files | Wrapped in a transaction | Opt-out the detector recognizes | SQL analyzed |
|---|---|---|---|---|
| Plain SQL | `migrations/**/*.sql`, `db/migrations/**/*.sql`, `sql/migrations/**/*.sql` | No (or `transaction: always`) | `BEGIN`/`COMMIT` make the wrapped region explicit | All |
| Flyway | `**/db/migration/V*__*.sql`, `R*__*.sql` | Yes | `<file>.sql.conf` with `executeInTransaction=false` | All |
| Liquibase | `**/changelog/**/*.sql` with the `--liquibase formatted sql` header | Yes | `--changeset ... runInTransaction:false` | All |
| Rails | `db/migrate/*.rb` | Yes | `disable_ddl_transaction!` | `execute` strings and heredocs; the helpers above |
| Django | `**/migrations/[0-9]*.py` | Yes | `atomic = False` | `RunSQL` strings and lists |
| Alembic | `**/versions/*.py` | Yes | `autocommit_block()`, an explicit `COMMIT` | `op.execute` strings and `text()` |
| Prisma | `prisma/migrations/*/migration.sql` | Yes, no opt-out | - | All |
| golang-migrate | `**/*.up.sql`, `**/*.down.sql` | No | - | All |
| dbmate | `db/migrations/*.sql` with `-- migrate:up` | Yes | `-- migrate:up transaction:false` | All |
| Sqitch | `deploy/*.sql` | Yes | - | All |

`paths`, `exclude`, `framework` and `transaction` in `.lurie-guard.yml` override every built-in. Rails `datetime` maps to `timestamp(6)`, the framework default; an application that sets `datetime_type = :timestamptz` turns PG019 off.

### Run it locally

```sh
npm ci && npm run build
node dist/cli.js --root . db/migrate/20261019120000_add_index.rb   # one or more files
node dist/cli.js --root . --format sarif --out findings.sarif        # every migration under the root
node dist/cli.js --root . --fail-on error                            # exit 1 on errors
```

The CLI is the same bundle as the action and reads the same `.lurie-guard.yml`; it is how the pilots scan a repository's history.

## Rules (PostgreSQL pack, MVP)

Every rule maps to a tested db-skills skill. `error` means a measured fixture shows the lock, rewrite, scan or failure; `warning` means a documented cost with common exceptions; `info` is off by default.

| Id | Rule | Severity | Skill |
|---|---|---|---|
| PG001 | `CREATE INDEX` without `CONCURRENTLY` on an existing table | error | [pg-online-migrations](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-online-migrations/SKILL.md) |
| PG002 | `DROP INDEX` without `CONCURRENTLY` | error | pg-online-migrations |
| PG003 | `CONCURRENTLY` inside a transaction (explicit or a framework wrapper: Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate) | error | pg-online-migrations |
| PG004 | DDL that takes a heavy lock without `SET lock_timeout` | warning | pg-online-migrations |
| PG005 | `ADD COLUMN` that rewrites the table (volatile default, stored generated, identity) | error | pg-online-migrations |
| PG006 | `ADD COLUMN ... NOT NULL` without a default on an existing table | error | pg-online-migrations |
| PG007 | `SET NOT NULL` without a validated `CHECK (col IS NOT NULL)` (or the PG 18 `NOT VALID` path) | error | pg-online-migrations |
| PG008 | `ADD FOREIGN KEY` without `NOT VALID` | error | pg-online-migrations |
| PG009 | `ADD CHECK` without `NOT VALID` | error | pg-online-migrations |
| PG010 | `VALIDATE CONSTRAINT` in the same transaction as the `NOT VALID` add | error | pg-online-migrations |
| PG011 | `ALTER COLUMN ... TYPE` that rewrites the table | warning | pg-online-migrations |
| PG012 | `ADD UNIQUE` / `ADD PRIMARY KEY` without `USING INDEX` | error | pg-online-migrations |
| PG013 | `RENAME COLUMN` / `RENAME TABLE` in one step | warning | pg-online-migrations |
| PG014 | `DROP COLUMN` / `DROP TABLE` | warning | pg-online-migrations |
| PG015 | `VACUUM FULL`, `CLUSTER`, `REINDEX` without `CONCURRENTLY` | error | [pg-vacuum-and-bloat](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-vacuum-and-bloat/SKILL.md) |
| PG016 | `CREATE INDEX CONCURRENTLY IF NOT EXISTS` (skips an invalid index from a failed build) | warning | pg-online-migrations |
| PG017 | `serial` / `integer` primary key | warning | [pg-keys-and-types](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-keys-and-types/SKILL.md) |
| PG018 | Random UUID primary key (`gen_random_uuid()`, `uuid_generate_v4()`) | warning | pg-keys-and-types |
| PG019 | `timestamp` without time zone | warning | pg-keys-and-types |
| PG020 | `json` column instead of `jsonb` | warning | pg-keys-and-types |
| PG021 | `varchar(n)` / `char(n)` | info | pg-keys-and-types |

The full detection logic, messages, exemptions and fixtures are in [docs/SPEC-MVP.md](docs/SPEC-MVP.md).

## Honest comparison

[Squawk](https://github.com/sbdchd/squawk) already lints PostgreSQL migration SQL with 78 rules, is free, actively maintained, and covers most of the list above. If you want a SQL-file linter with a PR comment today, use it. lurie-guard differs on evidence per rule, framework-aware transaction detection (Flyway, Rails, Django, Prisma), SARIF and suggested changes, the optional explanation layer, and the packs that come next (MySQL, Java, Go) from the sister repositories. The full comparison, including Atlas, Eugene, strong_migrations and the AI reviewers, is in [docs/COMPETITION.md](docs/COMPETITION.md).

## Documents

| Document | What it says |
|---|---|
| [docs/VISION.md](docs/VISION.md) | The problem, who pays, why now, what success looks like |
| [docs/SPEC-MVP.md](docs/SPEC-MVP.md) | The precise MVP: rules, config, suppression, outputs, acceptance criteria |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Components, runtime, data flow, security model, how packs plug in |
| [docs/RULES.md](docs/RULES.md) | The rule authoring standard: fixtures, evidence, severity, false positives |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phases with exit criteria, pilots, packs, the language-skills plan |
| [docs/COMPETITION.md](docs/COMPETITION.md) | What exists and where lurie-guard does and does not compete |
| [docs/adr/](docs/adr/) | One decision record per key decision |
| [CLAUDE.md](CLAUDE.md) | How agents and contributors work in this repository |

## Sister repositories

- [db-skills](https://github.com/rafapeixer/db-skills): PostgreSQL and MySQL skills with examples tested on real databases. The evidence for this pack.
- [go-skills](https://github.com/rafapeixer/go-skills) and [java-skills](https://github.com/rafapeixer/java-skills): language skills with evals and load benchmarks. The evidence for the packs that come next.

## License

Apache-2.0. See [LICENSE](LICENSE) and [docs/adr/0006-license.md](docs/adr/0006-license.md).
