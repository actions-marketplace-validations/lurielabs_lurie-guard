# Roadmap

Phases with exit criteria. A phase ends when every criterion is met, not when the calendar says so. Dates are targets from 2026-10-19.

## Phase 0: MVP (week 1 to week 3)

Build what [SPEC-MVP.md](SPEC-MVP.md) describes: the PostgreSQL migration pack, deterministic, as a JavaScript action.

Order of work:

1. Engine skeleton: diff reader, migration detector, WASM parser, rule interface, fixture harness, determinism diff. The first rule (PG001) end to end, including the review comment, SARIF and summary.
2. Rules PG002 to PG012 (the lock and rewrite rules), fixtures copied from `pg-online-migrations`.
3. Rules PG013 to PG021 (the release and type rules), fixtures from `pg-keys-and-types` and `pg-vacuum-and-bloat`.
4. Framework wrappers for PG003 (Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate, golang-migrate).
5. Config, suppression, base-branch config reading, fork handling.
6. `scripts/test-fixtures.sh` against PostgreSQL 15 and 18 in Docker.
7. The action on itself and on db-skills' fixtures in CI. Release `v0.1.0`.

Exit criteria: all 17 acceptance criteria in SPEC-MVP.md pass in CI; the action is tagged `v0.1.0`; the performance budget holds; the README lists the 21 rules in both languages.

## Phase 1: pilots (week 3 to week 10)

Three to five companies run the action on real repositories, free, in exchange for numbers and a testimonial.

How to find them:

- Teams that already use db-skills, go-skills or java-skills (plugin installs, stars, issues).
- Companies whose public repositories contain migrations that trigger a rule today: run the action locally on a sample of public PostgreSQL projects with Flyway, Rails or Django migrations, and open an issue with the finding and the evidence link. Only where the finding is real and the fix is a one-line change.
- Brazilian companies on PostgreSQL and RDS, where the author has direct contacts (the internal plan lists them).
- Consultancies delivering into client repositories.

What a pilot commits to: install on at least one active repository for four weeks; forward every false positive within a day; a 30-minute call at the end; a testimonial with numbers if the numbers are good.

What to measure per pilot, from the job summaries (no telemetry; the pilot shares the numbers):

| Measure | Target |
|---|---|
| Migration files analyzed | more than 100 per pilot, more than 500 in total |
| Findings per PR with migrations | reported, no target |
| Findings confirmed as "would have reached production" | at least 1 per pilot |
| Confirmed false positives on `error` rules | 0 unresolved after 48 hours |
| Suppression rate (suppressed / findings) | under 20%; above that, the rule or the message needs work |
| Median run time per PR | under 10 s |
| PRs where the developer applied the suggested fix on the next commit | reported |

Testimonial template, filled with the pilot's own numbers:

> In N weeks lurie-guard reviewed M migration files in our repositories and flagged K statements. J of them would have locked a production table; the one on `<table>` would have blocked writes for the whole index build. Zero false positives on blocking rules. Our developers fixed findings from the comment without asking. — Name, role, company

Exit criteria: three pilots completed four weeks; the measures above met; at least three written testimonials; the false-positive procedure in [RULES.md](RULES.md) exercised at least once end to end; every rule's "When it does not apply" updated with what the pilots taught. Release `v1.0.0` and the `v1` tag.

## Phase 2: paid plan and LLM layer (month 3 to month 5)

- Private-repository plan. Public repositories stay free. Enforcement is a license check inside the action against a signed license file in the repository or an organization secret; no server call on the PR path. Pricing hypotheses are internal.
- LLM explainer generally available: plain-words explanation appended to deterministic findings, with the skills as cached context, cost shown in the summary. Default model `claude-sonnet-5-5`; `claude-haiku-5-5` for the cheapest configuration; `claude-opus-5-5` when the client sets it ([ARCHITECTURE.md](ARCHITECTURE.md), "LLM explainer").
- LLM-only checks (`extra_checks`) in beta: N+1 in application code next to the migration, `OFFSET` pagination, transactions around network calls, pool size against the connection budget. Each one has an eval with and without the skills context, following the sister repositories' `claude plugin eval` pattern, and ships only when the eval shows a measured gain and a measured false-positive rate.
- Audit service as early revenue: a read-only review of a company's migration history and schema with the db-skills `db-audit` workflow, delivered as a report with migrations to fix. It funds the work before the plan does and produces evidence for the rules.

Exit criteria: first paying customers; the explainer's measured cost per PR documented in the README; one LLM-only check released with its eval results published.

## Phase 3: rule packs from the sister repositories (month 4 to month 9)

Each pack is a folder under `rules/` with the same standard. The sister repository is the evidence.

| Pack | Source | First rules | Why this order |
|---|---|---|---|
| `mysql` | db-skills `mysql-online-ddl`, `mysql-keys-and-types`, `mysql-indexing` | `ALTER TABLE` without explicit `ALGORITHM` and `LOCK`; `INSTANT` row-version limit; metadata lock without `lock_wait_timeout`; drop without an invisible index first; `utf8` instead of `utf8mb4`; random `BINARY(16)` keys | Same parser work (migrations), second most used database, evidence already tested on MySQL 8.4 and 9.7 |
| `java` | java-skills `postgres-hikari-pool`, `sql-and-transactions`, `db-migrations`, `http-server` | pgJDBC below 42.7.14; `minimumIdle` equal to `maximumPoolSize`; a remote call inside `@Transactional`; Flyway `CREATE INDEX CONCURRENTLY` with the transactional lock on; no in-flight cap with virtual threads | Highest-value application-code rules with eval numbers (0/10 to 10/10 on the pool task); Java backends are the largest paying segment |
| `go` | go-skills `postgres-pgx-pool`, `sql-queries-and-transactions`, `db-migrations`, `overload-protection` | pgx below v5.9.2; `MaxConns` not derived from the budget; unbounded goroutine fan-out; bulkhead sized from an assumed average; `OFFSET` pagination | Evidence includes the 10,000 req/s benchmark and the cost tables |

Application-code rules need a parser per language. Java and Go have tree-sitter grammars that compile to WebAssembly, which keeps the action pure JavaScript. The rule standard does not change: a fixture per rule, an evidence link to the sister repository's tested example.

Exit criteria per pack: at least eight rules, fixtures and evidence links complete, the pack run on two pilots for four weeks with the Phase 1 measures.

## Phase 4: GitHub App (month 8 to month 12)

The action stays the product; the App is the second installation path for organizations that want it on every repository without a workflow file, comments on PRs from forks, and Checks API annotations (write access to checks "is only available to GitHub Apps", [Checks API](https://docs.github.com/en/rest/checks/runs)). The App runs the same engine, in the organization's own runner or in a container the organization hosts; the privacy model does not change ([ARCHITECTURE.md](ARCHITECTURE.md), "GitHub App later").

Exit criteria: the App installed on one organization with more than 20 repositories; identical findings to the action on the same PRs.

## Language skills plan

The language packs need skills repositories with the same shape as go-skills and java-skills: one decision per skill, tested good and bad examples, `claude plugin eval` with and without the plugin, the `orders-api` benchmark at AWS t4g sizes with cost, and a reference service. Each repository feeds a lurie-guard pack. The order is decided by market size and by where agents make expensive mistakes with databases and runtime resources.

Market data, from the official survey pages. Stack Overflow 2026 ([survey.stackoverflow.co/2026/technology](https://survey.stackoverflow.co/2026/technology), all respondents, share who did extensive work in the past year): JavaScript 62.0%, SQL 58.4%, Python 58.0%, TypeScript 43.8%, Java 27.6%, C# 27.1%, Rust 18.0%, PHP 17.7%, Go 16.5%, Kotlin 10.8%, Ruby 5.8%. Databases: PostgreSQL 57.9%, SQLite 42.1%, MySQL 35.1%, MongoDB 19.0%. GitHub Octoverse 2025 ([github.blog](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/), ranking by monthly contributors): TypeScript first (+66% year over year), Python second (+49%), JavaScript third, Java fourth, C# fifth, PHP sixth, Go tenth; "developers are shifting toward typed languages that make agent-assisted coding more reliable in production".

| Order | Language | Repository | Why | What agents get wrong that costs money |
|---|---|---|---|---|
| Done | Go | go-skills | 24 skills, evals, 10,000 req/s benchmark | Pool sizing, goroutine fan-out, overload, container limits |
| Done | Java | java-skills | 24 skills, evals, benchmark, reference service | Hikari sizing, pgJDBC CVEs, heap in containers, transactions around network calls |
| Done | SQL | db-skills | PostgreSQL and MySQL, tested on real databases | Migrations, indexing, keys, connections |
| 1 | TypeScript / Node | ts-skills | Most used language on GitHub, fastest growth with AI, 43.8% in the survey; backend Node services use Prisma, Drizzle, TypeORM and Knex, whose migrations the MVP detector already reads | Prisma migrations with `CREATE INDEX` inside a transaction (no opt-out), connection pools per serverless instance, N+1 through ORM lazy relations, `OFFSET` pagination, unbounded `Promise.all`, no body limits, no timeouts on `fetch` |
| 2 | Python | python-skills | 58.0% in the survey, second on GitHub, dominant in AI services; Django and Alembic migrations already in the detector | Django `atomic` migrations with concurrent indexes, SQLAlchemy pool sizing with async workers, `psycopg` without timeouts, N+1 through ORM relations, Gunicorn workers × pool size over the connection budget, no request limits in FastAPI |
| 3 | C# / .NET | dotnet-skills | 27.1% in the survey, fifth on GitHub, enterprise segment that pays; EF Core migrations are a parser target | EF Core migrations that rebuild tables, `DbContext` pooling, `MaxPoolSize` defaults, `async` over sync, Kestrel limits |
| 4 | Kotlin | shares java-skills | 10.8% but the same JVM, Spring Boot, HikariCP and Flyway; most java-skills examples and evidence carry over with a Kotlin example per skill | Same as Java plus coroutine dispatchers over blocking JDBC |
| 5 | Rust | rust-skills | 18.0% and growing, but a small share of database-backed web services; later | `sqlx` pool sizing, blocking in async, migrations in a transaction |
| Detector only | Ruby / Rails, PHP / Laravel | none | Migration-heavy ecosystems (5.8% and 17.7%) already covered by the migration detector; strong_migrations exists for Rails | Rules come from the `pg` pack; no language pack planned |

Each new skills repository follows the pattern exactly: `CLAUDE.md` with the same rules, `skills/<decision>/SKILL.md` with examples that run in CI, `evals/` with and without the plugin, `benchmarks/orders-api/` in the go-skills harness at t4g sizes with cost tables, a reference service, bilingual README. Its skills become lurie-guard rules only after the evals show the gain and the benchmark shows the cost.
