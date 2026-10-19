# pr-guard

**English** | [Português](README.pt-BR.md)

**A GitHub Action that reviews pull requests for the mistakes that cause production incidents and cloud cost, with measured evidence behind every rule.**

> Status: **in design**. No product code yet. The documents in [`docs/`](docs/) are the specification; the first release follows them.

Most database incidents start with a migration that looked fine in review: a `CREATE INDEX` that holds a `SHARE` lock on the orders table for the whole build, an `ALTER TABLE` queued behind a long report while every new query queues behind it, a `SET NOT NULL` that scans a hundred million rows under `ACCESS EXCLUSIVE`. The PostgreSQL manual documents every one of them. The PR gets approved anyway.

pr-guard parses the migrations in a PR with PostgreSQL's own parser, applies deterministic rules, and tells the developer what will happen, what to write instead, and when the rule does not apply. Every rule links to a test in [db-skills](https://github.com/rafapeixer/db-skills) that runs against real PostgreSQL 15 and 18 and shows the lock, the rewrite or the scan it prevents.

## What it will do

```yaml
# .github/workflows/pr-guard.yml
name: pr-guard
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
      - uses: rafapeixer/pr-guard@v1       # pin to a commit SHA in your repository
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}   # optional: plain-words explanations with your own key
```

- **Review comments** on the exact line, with a suggested change when the fix is one statement.
- **SARIF** uploaded to GitHub code scanning, with stable fingerprints and the rule's documentation.
- **A job summary** with every finding, every suppression and its reason.
- **Block merge** on errors (`fail_on: error`), configurable per rule in `.pr-guard.yml`, read from the base branch so a PR cannot turn its own checks off.
- **Inline suppression with a reason**: `-- pr-guard: ignore PG001 reason="orders is new in this release"`.
- **No server, no telemetry.** Code never leaves the runner. With your own Anthropic key, the optional explanation runs inside your runner under your API terms.

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
| PG011 | `ALTER COLUMN ... TYPE` that rewrites the table | error | pg-online-migrations |
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

[Squawk](https://github.com/sbdchd/squawk) already lints PostgreSQL migration SQL with 78 rules, is free, actively maintained, and covers most of the list above. If you want a SQL-file linter with a PR comment today, use it. pr-guard differs on evidence per rule, framework-aware transaction detection (Flyway, Rails, Django, Prisma), SARIF and suggested changes, the optional explanation layer, and the packs that come next (MySQL, Java, Go) from the sister repositories. The full comparison, including Atlas, Eugene, strong_migrations and the AI reviewers, is in [docs/COMPETITION.md](docs/COMPETITION.md).

## Documents

| Document | What it says |
|---|---|
| [docs/VISION.md](docs/VISION.md) | The problem, who pays, why now, what success looks like |
| [docs/SPEC-MVP.md](docs/SPEC-MVP.md) | The precise MVP: rules, config, suppression, outputs, acceptance criteria |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Components, runtime, data flow, security model, how packs plug in |
| [docs/RULES.md](docs/RULES.md) | The rule authoring standard: fixtures, evidence, severity, false positives |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phases with exit criteria, pilots, packs, the language-skills plan |
| [docs/COMPETITION.md](docs/COMPETITION.md) | What exists and where pr-guard does and does not compete |
| [docs/adr/](docs/adr/) | One decision record per key decision |
| [CLAUDE.md](CLAUDE.md) | How agents and contributors work in this repository |

## Sister repositories

- [db-skills](https://github.com/rafapeixer/db-skills): PostgreSQL and MySQL skills with examples tested on real databases. The evidence for this pack.
- [go-skills](https://github.com/rafapeixer/go-skills) and [java-skills](https://github.com/rafapeixer/java-skills): language skills with evals and load benchmarks. The evidence for the packs that come next.

## License

Apache-2.0. See [LICENSE](LICENSE) and [docs/adr/0006-license.md](docs/adr/0006-license.md).
