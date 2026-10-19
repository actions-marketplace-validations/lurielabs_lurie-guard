# ADR 0004: Review comments, SARIF and a job summary as the outputs

Status: accepted, 2026-10-19

## Context

A finding is useful where the developer and the reviewer look. GitHub offers four places from an action with `GITHUB_TOKEN`:

- **Pull request review comments**, inline on the diff, with suggested changes. One review with many comments is one content-generating request; secondary rate limits allow "no more than 80 content-generating requests per minute" and `GITHUB_TOKEN` gets 1,000 requests per hour per repository ([rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)). Comments need the line to be in the diff ([create a review comment](https://docs.github.com/en/rest/pulls/comments)). Needs `pull-requests: write`; unavailable on fork PRs.
- **Code scanning via SARIF 2.1.0**: alerts with history, fingerprints across commits, rule help, dismissals; free on public repositories, needs a GitHub Code Security license on private ones ([SARIF support](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning), [about code scanning](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning)). Needs `security-events: write`.
- **Job summary**: Markdown, 1 MiB per step, always available ([workflow commands](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions)).
- **Annotations**: `::error`/`::warning` commands, limited to 10 of each per step ([Checks API](https://docs.github.com/en/rest/checks/runs)); always available.
- **Checks API annotations** (50 per request): write access "is only available to GitHub Apps". Not available to an action.

## Decision

All four from one list of findings, each reporter independent:

1. One review per run with inline comments (`event: COMMENT`, never `REQUEST_CHANGES`), suggested changes where the fix is a one-statement replacement, idempotent across runs through a hidden fingerprint list.
2. One SARIF 2.1.0 file per run, category `lurie-guard/<pack>`, with the rule catalog, `help.markdown`, `partialFingerprints`, and in-source suppressions; uploaded by the action when permitted.
3. A job summary with every finding, every suppression and its reason, the files skipped, and the LLM cost.
4. Annotations for the first 10 errors and 10 warnings.

The exit code depends only on findings and `fail_on`; reporter failures are warnings.

## Alternatives considered

- **Comments only (Squawk, Atlas).** No history, no fingerprint, nothing on fork PRs, and a reviewer on the security side never sees it.
- **SARIF only.** Invisible to a developer who does not open the code scanning tab; unavailable on private repositories without the license.
- **A lurie-guard dashboard.** Needs a server and accounts; contradicts [ADR 0003](0003-bring-your-own-key.md).
- **`REQUEST_CHANGES` reviews to block merge.** Interferes with the team's review rules and cannot be resolved by a bot cleanly; the exit code with branch protection is the documented way to block.

## Consequences

- The workflow needs `pull-requests: write` and `security-events: write`; the README explains each.
- On fork PRs only the summary, annotations and exit code work; the two-workflow pattern is the opt-in ([ARCHITECTURE.md](../ARCHITECTURE.md), "Security model").
- The SARIF rule catalog is generated from `RULE.md`, so the rule pages and the code scanning help never drift.
