# ADR 0007: Report-only by default during v0.x; `fail_on: error` is opt-in

Status: accepted, 2026-10-19

## Context

[SPEC-MVP.md](../SPEC-MVP.md) and [RULES.md](../RULES.md) first said that an `error` finding fails the check by default (`fail_on: error`), so that branch protection blocks the merge. That is the right end state: a rule with measured evidence should stop a `CREATE INDEX` without `CONCURRENTLY` from reaching production.

It is the wrong first state. The pilots ([ROADMAP.md](../ROADMAP.md), Phase 1) are what measure the false-positive rate; before them it is unknown. A check that blocks merges from day one has two failure modes that end a pilot before it produces numbers:

- A false positive on an `error` rule blocks a merge the team needs now. The false-positive procedure in RULES.md demotes the rule within 48 hours, but the team's first experience is "the tool blocked us and was wrong", and the usual reaction is to remove the step from the workflow rather than wait.
- A correct finding on a legacy migration folder blocks a PR that merely moves or touches an old file. The team suppresses or disables the rule, and the suppression rate the pilots are supposed to measure is polluted by the onboarding noise.

The product's claim is proof, not enforcement. Enforcement is a configuration line once the proof is trusted.

## Decision

1. `fail_on` defaults to `none`. With the default, the action reports every finding (review comments, SARIF, job summary, annotations) and exits `0`. The summary header says the run is report-only and shows the one-line config that turns blocking on.
2. A customer opts in with `fail_on: error` (or `fail_on: warning`) in `.lurie-guard.yml` on the base branch. The exit-code semantics with a value set are unchanged: `1` when any finding at or above the threshold remains after suppression.
3. The default stays `none` through every `v0.x` release and the pilots. Promoting the default to `error` is a `v1.0.0` decision, taken only when the Phase 1 measures hold: more than 500 migration files reviewed across pilots, zero unresolved false positives on `error` rules after 48 hours, suppression rate under 20%. The promotion is its own ADR with the numbers.
4. Nothing else changes: severities, the evidence requirement for `error`, the SARIF `level`, and the false-positive procedure stay as RULES.md says. A rule is still `error` when its evidence supports it; `error` describes the cost, `fail_on` describes what the team wants done about it.

## Alternatives considered

- **Keep `fail_on: error` as the default** (the previous position). Rejected for the reasons above: it optimizes for the end state at the cost of the pilots that justify it.
- **Default `fail_on: warning`** or any threshold. Same problem, worse: warnings are the rules with common legitimate exceptions.
- **Blocking only on rules with a measured fixture.** That is every `error` rule already; it does not address the unknown false-positive rate of the detectors.
- **A grace period** (report-only for the first N runs, then block). Hidden state that surprises the team on run N+1. Rejected.

## Consequences

- SPEC-MVP.md: the config default, the exit-code paragraph, user story 2 and a new acceptance criterion (default exits `0` with findings; `fail_on: error` exits `1` on the same PR).
- README (both languages): the install snippet stays two lines; a second snippet shows `.lurie-guard.yml` with `fail_on: error` for teams that want to block.
- The job summary and the review body say "report-only" explicitly, so a team never believes it is protected when it is not.
- Pilot onboarding asks the team to turn on `fail_on: error` in week three if the first two weeks produced no false positive; that is itself a pilot measure.
