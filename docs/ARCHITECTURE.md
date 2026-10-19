# Architecture

Status: design, 2026-10-19. The code follows this document; when they disagree, the code is wrong or this document gets a new ADR.

## Components

```
GitHub event (pull_request)
        │
        ▼
┌─────────────────┐   GET /pulls/{n}/files    ┌──────────────────────┐
│  diff reader    │ ─────────────────────────▶│  migration detector  │  globs + framework rules
└─────────────────┘   checkout at head        └──────────┬───────────┘  transaction wrapper, DSL extraction
                                                         │  list of (file, framework, wrapped?, sql[])
                                                         ▼
                                              ┌──────────────────────┐
                                              │  SQL parser (WASM)   │  libpg_query, PostgreSQL's own grammar
                                              └──────────┬───────────┘
                                                         │  parse tree per statement, with positions
                                                         ▼
┌─────────────────┐   .lurie-guard.yml (base)    ┌──────────────────────┐
│  config loader  │ ─────────────────────────▶│  rule engine         │  per-file state, "new table" set,
└─────────────────┘                           │  rules/pg/*          │  transaction cursor, lock_timeout,
                                              └──────────┬───────────┘  NOT VALID constraints
                                                         │  findings (rule, file, range, message, fix, fingerprint)
                                                         ▼
                                              ┌──────────────────────┐
                                              │  suppressions        │  inline comments with reasons
                                              └──────────┬───────────┘
                                                         │
                       ┌──────────────┬──────────────────┼──────────────────┬──────────────┐
                       ▼              ▼                  ▼                  ▼              ▼
                 review comments    SARIF 2.1.0       job summary       annotations    exit code
                 (one review)       (code scanning)   ($GITHUB_STEP_SUMMARY)
                                                         ▲
                                                         │ optional, same findings
                                              ┌──────────┴───────────┐
                                              │  LLM explainer       │  client's key, client's runner,
                                              │  (Anthropic API)     │  skills as cached context
                                              └──────────────────────┘
```

### Diff reader

Lists the PR's files through the REST API (paginated, 100 per page) and reads the content of added and modified files from the checkout at the head commit (`actions/checkout` with `ref: ${{ github.event.pull_request.head.sha }}` is the documented default for `pull_request`). It also fetches the base branch's `.lurie-guard.yml` through the contents API, so the PR cannot change its own rules. It never reads files outside the diff except the config. No `git` subprocess; the API and the filesystem are enough.

### Migration detector

Classifies each file by path glob and framework, decides whether the framework wraps the file in a transaction and whether the file opts out, and extracts SQL from host-language migrations (Rails `execute`, Django `RunSQL`, Alembic `op.execute`). For Rails it also maps the common DSL calls to their SQL (`add_index` to `CREATE INDEX`, with `algorithm: :concurrently` to `CONCURRENTLY`). The host-language extraction is deliberately narrow: string literals and a fixed list of DSL calls, located with a tree-sitter grammar for Ruby and Python compiled to WebAssembly; anything dynamic is skipped and listed in the summary as "not analyzed", never guessed. In the MVP the DSL list is the Rails helpers only; Django and Alembic are raw SQL until a pilot asks ([ADR 0008](adr/0008-host-language-migrations-mvp-scope.md)). The table of frameworks is in [SPEC-MVP.md](SPEC-MVP.md).

### SQL parser

`libpg_query` is the PostgreSQL server's parser extracted as a C library (BSD-3-Clause, [pganalyze/libpg_query](https://github.com/pganalyze/libpg_query)). The Node binding `libpg-query` (MIT) ships a pure WebAssembly build: "WASM-only build system for true cross-platform compatibility without native compilation dependencies"; the current npm release (18.1.5) uses the PostgreSQL 18 grammar and returns the parse tree as JSON ([libpg-query on npm](https://registry.npmjs.org/libpg-query/latest), [repository](https://github.com/launchql/libpg-query-node)). lurie-guard pins the package to an exact version and vendors the `.wasm` file into `dist/`, so the action has no install step and no native build on the runner. The parse tree exposes statement positions (`stmt_location`, `stmt_len`), which the engine maps to line ranges for comments and SARIF.

Why PostgreSQL's own parser and not a hand-written one: a rule that matches on `RangeVar`, `IndexStmt.concurrent`, `AlterTableCmd.subtype` and `Constraint.skip_validation` is exact. A regular expression over SQL text is not, and false positives are bugs with a deadline ([RULES.md](RULES.md)). The cost is the parse tree's verbosity and a 2 to 4 MB WASM file; both are acceptable within the performance budget.

### Rule engine

Walks each file's statements in order with a per-file state and a per-PR state:

- `newTables`: tables created by `CREATE TABLE` in any added migration file of the PR (first pass over all files, then the rule pass), so "existing table" means "not created in this migration set".
- `inTransaction`: true inside an explicit `BEGIN` ... `COMMIT`/`ROLLBACK`, or for the whole file when the framework wraps it and the file does not opt out.
- `lockTimeout`: the last `SET lock_timeout` / `SET LOCAL lock_timeout` value seen, or the config's `lock_timeout_set_by_runner`.
- `notValidConstraints`: constraints added `NOT VALID`, with the transaction they were added in, for PG007 and PG010.
- `postgresVersion` from the config.

A rule is a function from (statement, state, context) to zero or more findings. Rules do not mutate state; the engine updates state after each statement using a fixed list of state transitions, so two rules cannot disagree about the state. Rules are loaded from `rules/<pack>/*/rule.ts` by the build and listed in a generated index; the engine does not scan the filesystem at run time.

A finding carries: rule id, file, start and end line, the message (three parts), an optional fix as a replacement text for a suggested change, and a fingerprint (rule id plus the normalized statement text plus the table name; the line number is deliberately excluded so a moved statement keeps its fingerprint). SARIF's `partialFingerprints.primaryLocationLineHash` is computed separately, the way GitHub documents it.

### Suppressions

A pass over the findings with the comment lines of each file. See [SPEC-MVP.md](SPEC-MVP.md), "Suppression". A suppression is itself a record (rule, reason, line) that the reporters show.

### Reporters

Four reporters consume the same list of findings. Each one fails independently and never blocks the others: a 403 from the reviews API (fork PR, read-only token) is logged and the SARIF and summary still happen. The exit code depends only on the findings and `fail_on`.

- **Review comments**: one `POST /pulls/{n}/reviews` with the `comments` array, `event: COMMENT`, a body with the counts and the hidden fingerprint list for idempotence. Comments outside the diff fall back to the summary.
- **SARIF**: one `run`, the full rule catalog in `tool.driver.rules`, one result per finding, suppressions as `suppressions[]`. Written to disk (output `sarif_file`) and uploaded with `POST /repos/{owner}/{repo}/code-scanning/sarifs` (gzip, base64) when `security-events: write` is available, otherwise left for `github/codeql-action/upload-sarif`.
- **Summary**: Markdown appended to `$GITHUB_STEP_SUMMARY`, under 1 MiB.
- **Annotations**: `::error`/`::warning` commands, first 10 of each.

### LLM explainer (optional)

Runs only when the `anthropic_api_key` input is set. For each deterministic finding (or for the whole PR in one request when there are more than five), it sends: a system prompt with the relevant skill's text (`SKILL.md` of the rule's `skill`), marked with `cache_control` so the second request in the run reads it from cache; the statement; the finding's message. It asks for a two-sentence explanation in the developer's terms and, when the fix needs several steps, the ordered steps. The response is appended to the comment under "Explanation", clearly separated from the deterministic message. The explainer cannot add, remove or re-rank deterministic findings.

Model and cost, from the official model page ([platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview)) and the prompt caching page ([platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)):

| Model | Input $/MTok | Output $/MTok | 5-minute cache write | Cache read | Default in lurie-guard |
|---|---|---|---|---|---|
| `claude-opus-5-5` | 4.00 | 20.00 | 5.00 | 0.20 | when the client sets `llm.model: claude-opus-5-5` |
| `claude-sonnet-5-5` | 2.00 | 10.00 | 2.50 | 0.10 | **default** |
| `claude-haiku-5-5` | 0.10 (prompts up to 100K tokens) | 0.50 | 0.125 | 0.01 | `llm.model: claude-haiku-5-5` |

Estimate per PR with three findings, skills context of about 6,000 tokens (one skill), 400 input tokens per finding, 200 output tokens per explanation, on `claude-sonnet-5-5`: first request writes the cache (6,000 × 2.50 / 1M = $0.015), the three requests read it (3 × 6,000 × 0.10 / 1M = $0.002), statements and output (3 × 400 × 2 / 1M + 3 × 200 × 10 / 1M = $0.008); about **$0.025 per PR**, under $0.005 on Haiku 5.5 and about $0.05 on Opus 5.5. The minimum cacheable prefix on these models is 512 tokens, so the skill text always qualifies. `llm.max_cost_usd_per_run` stops the explainer when the estimate from `usage` exceeds it; the summary shows tokens and dollars. Requests use adaptive thinking at `low` effort (explanations are short) and the official TypeScript SDK (`@anthropic-ai/sdk`).

The LLM-only checks (`extra_checks`, post-MVP) use the same path with the application files next to the migration as input and the relevant skills as context, and report findings under their own ids (`LLM001`...) with `warning` severity at most, never `error`.

## Runtime and language

**TypeScript, compiled to a single JavaScript bundle, run as a JavaScript action on Node 24.** Full reasoning in [ADR 0001](adr/0001-runtime-javascript-action-with-wasm-parser.md). Short version from GitHub's own documentation ([about custom actions](https://docs.github.com/en/actions/sharing-automations/creating-actions/about-custom-actions)):

- JavaScript actions "can run directly on a runner machine" and run "faster than a Docker container action"; Docker actions "can only execute on runners with a Linux operating system" and pay "the latency to build and retrieve the container".
- `runs.using` accepts `node20` and `node24` ([metadata syntax](https://docs.github.com/en/actions/reference/metadata-syntax-for-github-actions)); GitHub's changelog of 2026-09-23 says "Node 20 is no longer available on GitHub Actions runners" and "runners now use Node 24 for JavaScript actions" ([changelog](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/)). So `node24`.
- The parser is available as pure WebAssembly for Node, so the action stays "pure JavaScript and not rely on other binaries", which the docs say is what makes an action work on every GitHub-hosted runner.

Alternatives considered: Rust or Go with `pg_query.rs` / `pg_query_go` (both track the PostgreSQL 17 grammar as of their September 2026 releases, Go needs cgo, and a native binary needs a Docker action or a release download step); a composite action downloading a binary (an extra network dependency on the PR path, and Marketplace users expect `uses:` to be enough). A CLI for local use will be built from the same bundle (`npx lurie-guard`), which is also how the pilots run it on history.

## Data flow and privacy

1. The runner checks out the head commit (the workflow's `actions/checkout`).
2. The action calls `api.github.com` to list PR files, read the base config, post the review, upload the SARIF. All with `GITHUB_TOKEN`.
3. Parsing and rules run in the runner's process. No file is written outside the workspace except the SARIF and summary.
4. If and only if `anthropic_api_key` is set, the action calls `api.anthropic.com` with the statements of the findings and the skill text. Under Anthropic's commercial terms "Anthropic may not train models on Customer Content from Services" ([commercial terms](https://www.anthropic.com/legal/commercial-terms)); API inputs and outputs are deleted from Anthropic's backend within 30 days by default, and zero-data-retention is available per organization ([data retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data), [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)). The client chooses the model and the terms; lurie-guard sends only the statements that produced findings, never whole files.
5. Nothing is sent to any lurie-guard server. There is none. No telemetry, no version check, no license call on the PR path.

The acceptance test runs the action behind an egress proxy that allows only `api.github.com` (and `api.anthropic.com` when the key is set) and fails on any other host.

## Security model

- **Trigger**: `pull_request`, never `pull_request_target`. GitHub Security Lab: "Combining `pull_request_target` workflow trigger with an explicit checkout of an untrusted PR is a dangerous practice"; "If you don't need a repository write access or secrets, just stick to the `pull_request` trigger" ([preventing pwn requests](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)). The action reads migration files as data; it never executes anything from the PR.
- **Permissions**: `contents: read`, `pull-requests: write`, `security-events: write` (plus `actions: read` on private repositories for SARIF upload, per [uploading a SARIF file](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github)). The docs: "you should grant the `GITHUB_TOKEN` the least required access" ([automatic token authentication](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication)). The README's workflow sets exactly these.
- **Forks**: on a PR from a fork `GITHUB_TOKEN` is read-only and secrets (the Anthropic key) are not passed ([events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)). The action detects this, skips comments and SARIF, and still writes the summary and the exit code. The documented opt-in for fork comments is the two-workflow pattern the Security Lab recommends: `pull_request` produces an artifact with the findings (no code), and a `workflow_run` workflow on the default branch posts them, treating the artifact as untrusted data (only rule ids, paths, lines, messages generated by the action from its own templates).
- **Untrusted input**: file paths, SQL text and comments from the PR never reach a shell. Messages interpolate identifiers only. The review body is Markdown built from templates with the identifiers escaped.
- **Supply chain**: every third-party action in this repository's workflows is pinned to a full commit SHA, as GitHub recommends ("Pin references to actions to a commit SHA", [security hardening](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)). Releases are immutable; the `v1` tag moves only to a released `v1.x.y` ([immutable releases for actions](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/using-immutable-releases-and-tags-to-manage-your-actions-releases)). Dependencies are pinned exactly and `dist/` is built in CI with a provenance attestation; the bundle has no runtime `npm install`.
- **Config**: read from the base branch. Unknown keys fail.
- **Secrets**: the Anthropic key is read from the input, used for the SDK client, never logged; GitHub masks it in logs.

## How rule packs plug in

A pack is a folder `rules/<pack>/` plus a **front end** that turns files into statements the engine can walk:

| Pack | Front end | Parser | State the rules need |
|---|---|---|---|
| `pg` | migration detector (SQL files, framework wrappers, Rails/Django/Alembic extraction) | libpg_query (WASM) | new tables, transaction, lock_timeout, NOT VALID constraints |
| `mysql` | same detector, MySQL dialect flag | a MySQL grammar (tree-sitter-sql or a dedicated parser; decided in its own ADR) | ALGORITHM/LOCK, row-version count, metadata locks |
| `java` | source files changed in the PR, matched by extension | tree-sitter-java (WASM) | dependency versions from `pom.xml`, annotations in scope, pool properties |
| `go` | same, `.go` and `go.mod` | tree-sitter-go (WASM) | module versions, pool config literals |

The engine, the reporters, the suppression syntax, the config schema and the rule standard are shared. A pack adds a front end, a parser and rules; nothing else changes. The config lists enabled packs (`packs: [pg]` by default; `mysql`, `java`, `go` when they ship). Each pack's rules have their own id prefix and their own evidence repository.

## How evidence and fixtures are versioned

- `scripts/validate.sh` pins each sister repository to a commit (`DB_SKILLS_REF`, later `JAVA_SKILLS_REF`, `GO_SKILLS_REF`). Evidence links in `RULE.md` are repository-relative paths with line ranges; validation resolves them at the pinned commit (a shallow fetch in CI) and fails if the file or range is gone.
- Bumping a pin is its own PR: it re-runs `test-fixtures.sh`, re-checks every evidence range, and updates `verified` on the rules whose evidence moved.
- Fixtures copied from a skill keep a header comment `-- from: db-skills/skills/<skill>/examples/<bad|good>/test.sql@<commit>` so a later diff can show whether the skill's example changed.
- The rendered rule pages (one per rule, generated from `RULE.md`) link to the evidence at the pinned commit, not to `main`, so a reader sees the test that was true when the rule shipped.

## GitHub App later

A GitHub App gives: installation on an organization without a workflow file, comments on fork PRs (the App has its own token), Checks API annotations (write access to checks "is only available to GitHub Apps", up to 50 annotations per request, [Checks API](https://docs.github.com/en/rest/checks/runs)), higher rate limits. It costs a server that receives webhooks, which breaks "no lurie-guard server sees code" unless the App only dispatches a `repository_dispatch` or `workflow_dispatch` to the client's own runner and reads the results back. That design (App as a thin dispatcher, engine still in the client's runner) is the one the roadmap plans; it is not needed for the MVP or the pilots ([ROADMAP.md](ROADMAP.md), Phase 4).

## ADRs

| ADR | Decision |
|---|---|
| [0001](adr/0001-runtime-javascript-action-with-wasm-parser.md) | JavaScript action on Node 24; libpg_query as WebAssembly |
| [0002](adr/0002-deterministic-core-optional-llm.md) | Deterministic core; the LLM explains and extends, never decides |
| [0003](adr/0003-bring-your-own-key.md) | Bring your own Anthropic key; no lurie-guard server |
| [0004](adr/0004-outputs-review-comments-sarif-summary.md) | Review comments, SARIF and job summary as the outputs |
| [0005](adr/0005-name.md) | The name |
| [0006](adr/0006-license.md) | Apache-2.0 |
| [0007](adr/0007-report-only-default.md) | Report-only by default through v0.x; `fail_on: error` is opt-in |
| [0008](adr/0008-host-language-migrations-mvp-scope.md) | Host-language migrations: raw SQL everywhere, Rails DSL helpers; Django and Alembic DSL later |
| [0009](adr/0009-build-toolchain.md) | esbuild bundle, vitest, ESLint, `dist/` committed |
| [0010](adr/0010-bundle-format-http-client-vendored-skills.md) | Amends 0009: ESM bundle, a fetch-based GitHub client (no Octokit), vendored skill text |
