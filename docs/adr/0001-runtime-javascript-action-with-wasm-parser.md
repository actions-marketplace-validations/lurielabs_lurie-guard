# ADR 0001: JavaScript action on Node 24, with PostgreSQL's parser as WebAssembly

Status: accepted, 2026-10-19

## Context

The action must start fast on every PR, run on any GitHub-hosted runner, parse PostgreSQL SQL exactly, and ship as a single `uses:` line. GitHub documents three kinds of actions ([about custom actions](https://docs.github.com/en/actions/sharing-automations/creating-actions/about-custom-actions)):

- JavaScript actions "can run directly on a runner machine" and run "faster than a Docker container action"; to work on all runners the code should be "pure JavaScript and not rely on other binaries".
- Docker container actions "can only execute on runners with a Linux operating system" and are slower "because of the latency to build and retrieve the container".
- Composite actions combine steps; a binary would have to be downloaded at run time.

`runs.using` accepts `node20` and `node24` ([metadata syntax](https://docs.github.com/en/actions/reference/metadata-syntax-for-github-actions)). GitHub's changelog of 2026-09-23 states that Node 20 "is no longer available on GitHub Actions runners" and that maintainers must publish with `node24` ([changelog](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/)).

The parser options, from the projects' own pages:

| Binding | Language | License | Grammar (September 2026 releases) | Native build on the runner |
|---|---|---|---|---|
| `libpg-query` (npm 18.1.5) | Node | MIT | PostgreSQL 18 (13 to 18 supported) | No: "WASM-only build system ... without native compilation dependencies" ([repository](https://github.com/launchql/libpg-query-node)) |
| `pg_query.rs` 6.2.1 | Rust | MIT | PostgreSQL 17 (libpg_query 17-6.2.5) | Compiles C; ships as a binary |
| `pg_query_go` v6.2.5 | Go | BSD-3-Clause | PostgreSQL 17 | cgo, "first build up to 3 min" |

`libpg_query` itself is BSD-3-Clause ([pganalyze/libpg_query](https://github.com/pganalyze/libpg_query)).

## Decision

TypeScript, bundled to one JavaScript file, declared as `runs.using: node24`, with `libpg-query`'s WebAssembly build vendored into `dist/`. The same bundle is published as a CLI (`npx pr-guard`) for local runs and for the pilots' history scans.

## Alternatives considered

- **Rust binary (as Squawk) in a Docker action.** Fastest engine, but Linux-only runners, container pull on every run, and a second distribution path for the CLI. The engine is not the bottleneck: the budget is 10 s for 200 files and parsing is a small part of it.
- **Go binary via a composite action that downloads a release asset.** Adds a network dependency and a checksum step to the PR path; Marketplace users expect `uses:` alone. cgo build for the parser.
- **Hand-written SQL matcher.** Rejected: a regular expression over SQL text cannot tell `CREATE INDEX CONCURRENTLY` inside a `DO` block from a top-level statement, or a `CHECK` in a `CREATE TABLE` from one in `ALTER TABLE`. False positives are bugs with a deadline ([RULES.md](../RULES.md)).
- **Squawk as the engine** (its `squawk_wasm` crate exists). Rejected for the MVP because the product's rule standard (fixture plus evidence link, framework wrappers, the "new table across the PR" state) needs its own engine; kept as a possible adapter ([COMPETITION.md](../COMPETITION.md)).

## Consequences

- One runtime for the action, the CLI and the later GitHub App dispatcher.
- Later packs need parsers that run as WebAssembly too: tree-sitter grammars for Java, Go, Ruby and Python compile to WASM, which keeps the "pure JavaScript" property.
- The PostgreSQL 18 grammar accepts the newer syntax (for example `ADD CONSTRAINT ... NOT NULL ... NOT VALID`), so rules can detect both the 15 and the 18 forms of a fix.
- The WASM file adds 2 to 4 MB to the bundle; within the 10 MB budget.
- Node 24 only; older self-hosted runners that cannot run Node 24 are unsupported, which GitHub's own changelog already implies.
