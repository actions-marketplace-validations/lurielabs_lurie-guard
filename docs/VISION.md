# Vision

## The problem

Most database incidents are not caused by hard problems. They are caused by a migration that looked fine in review: a `CREATE INDEX` that holds a `SHARE` lock on the orders table for twenty minutes, an `ALTER TABLE` queued behind a long report while every new query queues behind it, a `SET NOT NULL` that scans a hundred million rows under `ACCESS EXCLUSIVE`, an `int` key that stops at 2,147,483,647 on a Friday. The PostgreSQL manual documents every one of these; the person opening the PR has not read that page, and the reviewer approves because the SQL is syntactically correct and the tests pass on an empty database.

Coding agents make this worse in two ways. They write more migrations, faster, and they write the textbook form (`CREATE INDEX`, `ADD FOREIGN KEY`) because it is the most common form in their training data. In the db-skills evaluation, the agent without the skills wrote a plain `CREATE INDEX` on a live table and missed a dangerous global `work_mem` twice in ten runs ([db-skills README](https://github.com/rafapeixer/db-skills#does-it-change-what-agents-write)). The same mistakes also cost money every month without an incident: random UUID keys that make the primary key index 30% larger, `OFFSET` pagination, N+1 queries that need four times the connections, pools that need a bigger instance than the workload does ([db-skills benchmarks](https://github.com/rafapeixer/db-skills#more-volume-fewer-connections-no-lock-waits)).

The place to catch all of this is the pull request, before merge, with a message that says what will happen and what to write instead.

## What lurie-guard is

A GitHub Action that reviews pull requests for the mistakes that cause production incidents and cloud cost, and backs every finding with measured evidence. It installs in two minutes and needs no account, no server and no database connection.

Three things make it different from what exists:

1. **Every rule has proof.** Each rule maps to a skill in the sister repositories whose examples run against real PostgreSQL 15 and 18 in CI and assert the cost: the lock mode in `pg_locks`, the changed `relfilenode`, the sequential scan, the SQLSTATE, the index size. The rule's message quotes that number. A reviewer who disagrees can run the fixture.
2. **Deterministic first, LLM second.** The core parses SQL with PostgreSQL's own parser and applies rules as code. It produces the same result on every run and needs no network. The optional LLM layer uses the client's own Anthropic key, runs inside the client's runner, explains findings in plain words and catches what a parser cannot (N+1 in application code, a transaction wrapped around an HTTP call). It never decides whether a deterministic finding exists.
3. **Rules come from measured skills, not from opinions.** The go-skills, java-skills and db-skills repositories already show, with evals and load benchmarks, that their rules change what agents write and what the result costs on AWS. lurie-guard is the enforcement side of the same evidence: the skills teach the agent, the action checks the PR.

## Who pays

- **Engineering teams running PostgreSQL in production from pull requests**, with 5 to 200 engineers, where one bad migration costs more than a year of the tool. The buyer is the platform or infrastructure lead who owns the incident postmortems; the user is every developer who opens a PR.
- **Teams adopting coding agents**, who need a review step that does not depend on the agent having read the right documentation.
- **Consultancies and agencies** that deliver code into clients' repositories and want proof that migrations were checked.

Public repositories are free forever. Private repositories pay per repository or per organization once the pilots have shown the numbers ([ROADMAP.md](ROADMAP.md)).

## Why now

- PostgreSQL is the most used database among developers for the fourth year: 57.9% of respondents in the 2026 Stack Overflow survey, ahead of SQLite (42.1%) and MySQL (35.1%) ([survey.stackoverflow.co/2026/technology](https://survey.stackoverflow.co/2026/technology)).
- Coding agents write a growing share of code. GitHub's Octoverse 2025 reports a new developer joining every second, TypeScript becoming the most used language on GitHub driven by AI-assisted coding, and teams moving toward typed languages "that make agent-assisted coding more reliable in production" ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)). Review capacity does not grow at that pace; deterministic checks do.
- GitHub code scanning accepts SARIF from any tool, is free on public repositories, and shows findings in the same place as security alerts ([SARIF support](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)). A linter can be a first-class citizen of the PR without a dashboard of its own.
- PostgreSQL's parser is available as a library (`libpg_query`) with bindings that compile to WebAssembly, so a JavaScript action can parse SQL exactly as the server does, with no native build on the runner.
- The AI reviewers that exist (CodeRabbit, Copilot code review, Greptile) send code to a vendor and give opinions. The migration linters that exist (Squawk, strong_migrations, Atlas) give rules without measured evidence and without an explanation layer. The gap between the two is where lurie-guard sits ([COMPETITION.md](COMPETITION.md)).

## What success looks like

**3 months.** The PostgreSQL pack is released (`v1`), with 21 rules, each with fixtures and evidence links. Three to five companies have run it on real repositories for at least four weeks. The pilot corpus has more than 500 migration files, no unresolved false positive on an `error` rule, and at least one finding per pilot that the team confirmed would have reached production. Three testimonials with numbers (findings, incidents avoided, minutes of lock time prevented). The action runs on the sister repositories' own fixtures.

**6 months.** A paid plan for private repositories with the first paying customers. The LLM explainer is generally available with a measured cost per PR. The MySQL pack ships from db-skills (`mysql-online-ddl`, `mysql-keys-and-types`). The first language pack (Java from java-skills: pool sizing, transactions around network calls, Flyway transactional lock) is in pilots. A public page lists every rule with its evidence, and a public corpus of real-world migration findings, anonymized, shows the false-positive rate.

**12 months.** Packs for PostgreSQL, MySQL, Java, Go, TypeScript and Python. A GitHub App for organizations that want installation without a workflow file and comments on fork PRs. Revenue covers the work. The sister repositories feed the packs on a fixed cadence: a new skill in go-skills or java-skills becomes a rule in lurie-guard within one release. The action is cited in at least one postmortem as the thing that would have caught it.

## What it will not become

- Not a general code reviewer. It checks things that have evidence. A style opinion without a measured cost is not a rule.
- Not a hosted service that sees code. The runner is the boundary.
- Not a tool that needs the client's database to be useful. Rules that need the schema or statistics are a later, explicit addition, read-only, opt-in.
- Not an agent that pushes fixes. It suggests; the developer or their agent applies.
