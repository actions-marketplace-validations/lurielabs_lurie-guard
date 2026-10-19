# ADR 0011: The SARIF upload is opt-in; the review, the summary and the annotations are the default outputs

Status: accepted, 2026-10-19. Amends [ADR 0004](0004-outputs-review-comments-sarif-summary.md), which stays as written except for the default of the SARIF upload.

## Context

The first live run (`lurielabs/lurie-guard` pull request #1, five findings: PG001, PG006 and PG008 as errors, PG004 twice as a warning) worked end to end: the lurie-guard review with its five comments, the five code scanning alerts from the SARIF upload, the check green in report-only mode. It also showed every finding twice on the pull request. Besides lurie-guard's review (`github-actions[bot]`, five comments with the suggested change and the evidence link), code scanning posted its own review (`github-advanced-security[bot]`, five comments on the same lines, built from the SARIF `help.markdown`).

That second review is GitHub's behaviour for any SARIF uploaded for a pull request ref, and the documentation offers no way to keep the alerts and drop the review: "Code scanning posts a pull request review that shows each alert as an annotation on the lines of code", and "any new alerts on lines of code changed in the pull request are shown as annotations" ([triaging code scanning alerts in pull requests](https://docs.github.com/en/code-security/code-scanning/managing-code-scanning-alerts/triaging-code-scanning-alerts-in-pull-requests)). The only pull-request behaviour that page lets a repository configure is the severity at which the "Code scanning results" check fails. The upload documentation ([uploading a SARIF file to GitHub](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github)) and the REST endpoint ([upload an analysis as SARIF data](https://docs.github.com/en/rest/code-scanning/code-scanning#upload-an-analysis-as-sarif-data)) have no per-upload switch either; the endpoint's `ref` is `refs/heads/<branch>`, `refs/tags/<tag>`, `refs/pull/<number>/merge` or `refs/pull/<number>/head`, and the pull request review follows from uploading for a pull request ref.

Two outputs that say the same thing on the same lines is noise, and lurie-guard's own comment is the one that carries the suggested change, the evidence link at the pinned commit and the explanation; the code scanning comment carries the rule help and a link to the alert.

## Decision

1. **Default outputs on a pull request: the lurie-guard review, the job summary, the annotations, the outputs and the exit code.** The SARIF file is still written on every run (output `sarif_file`), validated against the 2.1.0 schema in the tests, so a workflow can do what it wants with it.
2. **The upload to code scanning is opt-in**: `outputs: {sarif: true}` in `.lurie-guard.yml` (read from the base branch, like everything else) or the action input `upload_sarif: true`. The documentation says what opting in buys and costs: the Security tab history with stable fingerprints and dismissals, and GitHub's own review comment on every finding of the pull request, next to lurie-guard's.
3. **Documented alternative for the Security tab without the duplicate**: upload only for the default branch. An upload with `ref: refs/heads/main` populates the Security tab and produces no pull request review. The action runs on `pull_request` only, so for now this is a workflow pattern (a job on `push` to the default branch that runs the CLI over the migrations and uploads the file with `github/codeql-action/upload-sarif`); running the action itself on `push` with the pushed commits' files as the diff is a candidate for a later release, not the MVP.

## Alternatives considered

- **Keep the upload on by default and drop lurie-guard's review.** Code scanning's review has no suggested change, no evidence link, no explanation, and it needs `security-events: write` plus, on private repositories, a GitHub Code Security license. Rejected: it inverts the product.
- **Upload with `refs/pull/N/merge` instead of `/head`.** The documentation ties the review to the pull request, not to the ref form. Not tried as a workaround; the behaviour is documented, not accidental.
- **Strip `help.markdown` or `locations` from the SARIF to make GitHub's comment useless.** It would still post the review, with less in it. Rejected.

## Consequences

- SPEC-MVP.md: the config default `outputs.sarif: false`, the "SARIF" section, acceptance criterion 8 (upload verified live on PR #1, opt-in in the default configuration).
- `permissions: security-events: write` is needed only when the upload is on; the README's workflow keeps it with that comment, because turning it on later should not need a workflow change.
- Pull request #1 stays as it is, as the record of the duplicate.
- The explainer's output stays in lurie-guard's review only; code scanning never sees it.
