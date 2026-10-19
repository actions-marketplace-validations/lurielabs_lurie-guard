# Competition and prior art

Facts below come from each product's own repository, documentation or pricing page, fetched on 2026-10-19. Where a page did not state something, it says "not found". The conclusion at the end says where lurie-guard competes and where it does not.

## Summary table

| Product | What it is | PostgreSQL migration rules | License | Pricing | GitHub integration | LLM | Measured evidence per rule |
|---|---|---|---|---|---|---|---|
| [Squawk](https://github.com/sbdchd/squawk) | Linter for PostgreSQL migration SQL files | 78 rules, covers almost all of lurie-guard's MVP list | MIT or Apache-2.0 | Free | Action posts a PR comment; CLI upload; App identity for other CIs. No SARIF, no annotations | None | None (rule pages explain, do not measure) |
| [strong_migrations](https://github.com/ankane/strong_migrations) | Rails gem that raises on dangerous migrations at run time | 24 checks (PostgreSQL, MySQL, MariaDB) | MIT | Free | None (runs inside Rails) | None | None |
| [Atlas](https://atlasgo.io) `migrate lint` | Schema management platform with a lint analyzer | The most detailed PostgreSQL lock and rewrite checks (PG101 to PG320), most marked Pro | Apache-2.0 source; the binary under the Ariga EULA | Pro $9 per developer per month; `migrate lint` requires Pro as of v0.38 | Action posts a comment with the lint results; needs a dev database URL | None | None |
| [Eugene](https://github.com/kaaveland/eugene) | Lint plus **trace**: runs the script in a temporary PostgreSQL and records the locks taken | 15 hints (E1 to E11, E15, W12 to W14) | MIT | Free | No official Action; example workflows post Markdown with `gh pr comment` | None | Trace mode measures the real locks of the script under review |
| [sqlfluff](https://github.com/sqlfluff/sqlfluff) | SQL style linter and formatter | None (layout and style) | MIT | Free | Not found | None | n/a |
| [Bytebase](https://www.bytebase.com) SQL review | Database change platform with a review engine | Concurrent index, NOT VALID checks, volatile defaults, type changes, and more; no `lock_timeout` rule found | MIT except `enterprise/` | Community free; Pro $20 per user per month | Needs a Bytebase server | Not found | None |
| [pgroll](https://github.com/xataio/pgroll) | Executes zero-downtime migrations with versioned views | Not a linter | Apache-2.0 | Free | n/a | n/a | n/a |
| [safe-pg-migrations](https://github.com/doctolib/safe-pg-migrations) | Rails gem that rewrites migrations to the safe form at run time | Concurrent indexes, NOT VALID, timeouts, volatile defaults | MIT | Free | None | None | None |
| [safe-migrate](https://github.com/marketplace/actions/safe-migrate) (Marketplace) | Action: checks PostgreSQL migrations offline against a synchronized baseline (locks, rewrites, destructive changes, missing timeouts) | Not enumerated on the listing | Not checked | Free | Action | Not found | Not found |
| [Migration Guard](https://github.com/marketplace/actions/migration-guard), [DB Guard](https://github.com/marketplace?type=actions&query=db+guard) (Marketplace) | Small actions (0 stars) for migration safety on PostgreSQL, MySQL, SQLite | 12 PostgreSQL rules (Migration Guard) | Not checked | Free | Action | Not found | Not found |
| [CodeRabbit](https://www.coderabbit.ai/pricing) | AI PR reviewer | Runs Squawk and sqlfluff as integrated tools, plus LLM review | Proprietary | Free for public repos; Essentials $24, Team $48, Advanced $72 per developer per month (annual) | App | Yes; code is "shared with OpenAI and/or Anthropic for reviewing purposes only", never used for training | None |
| [GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) | AI PR reviewer | None deterministic (rules-based analysis is the separate Code Quality / CodeQL product) | Proprietary | Included in Pro and above; billed in AI credits per review | Native | Yes; "not guaranteed to spot all problems" | None |
| [Greptile](https://www.greptile.com/pricing) | AI PR reviewer with codebase context | Natural-language custom rules only | Proprietary | Starter free (1 developer); Pro $30 per seat per month | App | Yes; code stored on Greptile servers; self-host on Enterprise | None |

## Squawk, in detail

Squawk is the direct prior art and the honest comparison starts there.

- 78 rules ([rules page](https://squawkhq.com/docs/rules)); the ones that overlap with the MVP: `require-concurrent-index-creation`, `require-concurrent-index-deletion`, `ban-concurrent-index-creation-in-transaction`, `require-lock-timeout` (and `require-statement-timeout`), `adding-field-with-default` (volatile defaults and generated columns), `adding-required-field`, `adding-not-nullable-field`, `adding-foreign-key-constraint`, `constraint-missing-not-valid`, `changing-column-type`, `disallowed-unique-constraint`, `adding-serial-primary-key-field` (which is about `ADD PRIMARY KEY` on an existing table), `renaming-column`, `renaming-table`, `ban-drop-column`, `ban-drop-table`, `prefer-repack` (`VACUUM FULL`, `CLUSTER`), `prefer-identity`, `prefer-bigint-over-int`, `prefer-timestamptz`, `prefer-text-field`, `ban-char-field`, `prefer-robust-stmts`.
- Not in Squawk: random UUID primary keys, `json` versus `jsonb`, `CREATE INDEX CONCURRENTLY IF NOT EXISTS` after a failed build, `VALIDATE CONSTRAINT` in the same transaction as the `NOT VALID` add. (Eugene has E3 for `json` and E15 for a missing foreign-key index, in trace mode.)
- Own parser since v2.0.0 (based on rust-analyzer's parser, with error recovery; "we've removed the dependency on libpg_query", [changelog](https://raw.githubusercontent.com/sbdchd/squawk/master/CHANGELOG.md)).
- Plain SQL files only; `--assume-in-transaction` and a per-file comment to opt out; `--pg-version`; reporters `tty`, `gcc`, `json`, `gitlab`. No SARIF, no GitHub annotations, no framework detection (Rails, Django, Flyway).
- Actively maintained: v2.70.0 on 2026-10-15, 1,184 commits. CodeRabbit runs it as one of its integrated tools ([CodeRabbit tools list](https://docs.coderabbit.ai/tools/list)).

What this means: **lurie-guard cannot and should not compete with Squawk on the number of PostgreSQL rules.** A team that wants a PostgreSQL SQL-file linter with PR comments, today, free, should use Squawk, and lurie-guard's README says so.

## Where lurie-guard differs

1. **Evidence per rule.** Every lurie-guard rule links to a test in db-skills that runs against PostgreSQL 15 and 18 in CI and asserts the cost: the lock mode in `pg_locks`, the changed `relfilenode`, the sequential scan, the SQLSTATE, the index size. The message quotes the number. No competitor does this; Eugene's trace mode is the closest (it measures the script under review, which is better for that script and needs a PostgreSQL in the runner).
2. **Framework awareness.** Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate and golang-migrate decide whether a file runs in a transaction, and Rails and Django migrations are not SQL files. Squawk and Eugene lint SQL files; strong_migrations and safe-pg-migrations are Rails-only and run at migration time, not in the PR.
3. **GitHub-native outputs.** SARIF to code scanning with stable fingerprints (free on public repositories), suggested changes in review comments, a job summary, annotations. Squawk posts one comment; Atlas posts a comment and links to its cloud; Eugene uses `gh pr comment`.
4. **The "new table" exemption across the whole PR**, not only within one file, and the config read from the base branch so a PR cannot disable its own checks.
5. **The optional LLM layer**, with the client's key, inside the client's runner, using the skills as context: an explanation a developer or an agent acts on, and later the checks a parser cannot do. CodeRabbit, Copilot and Greptile are LLM-first and send code to a vendor; the linters have no explanation layer.
6. **Packs beyond SQL.** The same engine, standard and reporters will carry Java and Go rules from java-skills and go-skills (pool sizing, transactions around network calls, dependency floors with CVEs), with the same evidence requirement. No migration linter goes there, and no AI reviewer has rules with measured proof.

## Where lurie-guard does not compete

- **Executing migrations** (pgroll, Atlas apply, Bytebase): lurie-guard reviews, it does not run.
- **Schema-aware linting with a dev database** (Atlas): lurie-guard's MVP reads the diff; rules that need the schema come later and read-only.
- **Tracing locks of the script under review** (Eugene trace): a different, complementary approach. The README recommends Eugene for teams that can run PostgreSQL in the runner and want the exact locks of their own script.
- **Style and formatting** (sqlfluff).
- **General AI code review** (CodeRabbit, Copilot, Greptile): lurie-guard's LLM layer is scoped to its findings and its skills. A team can run both; CodeRabbit already runs Squawk, and could run lurie-guard the same way.
- **The "Lurie Guard" name space**: at least seven Marketplace actions carry "Lurie Guard" in the name, all AI code review or PR quality gates ([ADR 0005](adr/0005-name.md)).

## Decision

Build lurie-guard's own rules on PostgreSQL's parser rather than wrapping Squawk, because the product's promise (fixture plus evidence per rule, framework wrappers, cross-pack engine) needs its own rule standard, and because the rules are a small part of the work next to the engine, the reporters and the packs. Cite Squawk on every overlapping rule page ("Squawk: `require-concurrent-index-creation`") so a team already on Squawk can map its config. Keep an adapter that ingests Squawk's JSON output as a considered option for a later release, not for the MVP.

The two rules Squawk lacks (random UUID keys, `json`) and the two it does not express (concurrent `IF NOT EXISTS` after a failed build, `VALIDATE` in the same transaction) are lurie-guard's visible additions on day one; the evidence links, SARIF and framework detection are the reasons to switch.
