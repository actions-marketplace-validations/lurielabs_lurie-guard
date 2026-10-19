# ADR 0002: Deterministic core; the LLM explains and extends, never decides

Status: accepted, 2026-10-19

## Context

The AI reviewers on the market (CodeRabbit, GitHub Copilot code review, Greptile) are LLM-first. GitHub's own documentation says Copilot code review is "not guaranteed to spot all problems" and that its evaluation uses multiple runs "to account for nondeterminism in model outputs" ([responsible use of code review](https://docs.github.com/en/copilot/responsible-use/code-review)). A migration check that sometimes misses `CREATE INDEX` without `CONCURRENTLY` is not a check.

The mistakes the MVP targets are all visible in the parse tree. The ones that are not (N+1 in application code, a transaction around an HTTP call, a pool sized for the wrong replica count) need context and judgment.

The sister repositories already show, with evals, that giving the model the skills as context changes what it writes (db-skills: 175/190 to 190/190; java-skills: 58/110 to 107/110). The same context makes an explanation accurate.

## Decision

1. Every rule in a pack is deterministic: a function over the parse tree and a small explicit state. Same input, same output, no network, no database. CI runs every fixture twice and fails on any difference.
2. The LLM layer is optional and additive. It runs only with the client's key. It may (a) append a plain-words explanation to a deterministic finding, using the rule's skill as cached context, and (b) later, report its own findings under its own ids (`LLM001`...) with at most `warning` severity. It may never add, remove, reorder or change the severity of a deterministic finding.
3. Every LLM-only check ships with an eval (the `claude plugin eval` pattern from the sister repositories) that measures the detection rate and the false-positive rate with and without the skills context, and the numbers are published in the README.

## Alternatives considered

- **LLM-first with a few hard rules.** Cheaper to build, matches the market. Rejected: the product's promise is proof, and proof needs repeatability.
- **Deterministic only, no LLM.** Simpler, but a parser cannot see N+1 or a network call in a transaction, and the explanation layer is what makes an agent apply the fix without a human. The option stays open: the action is complete without the key.
- **LLM as a verifier that filters deterministic findings to reduce false positives.** Rejected: that turns a bug with a deadline into a dice roll. False positives are fixed in the detector with a fixture ([RULES.md](../RULES.md)).

## Consequences

- The MVP is useful and testable without any model. Pilots can run it with no key and no cost.
- The explainer's output is marked as such in the comment, separate from the deterministic message, so a reader knows which part is proof and which is prose.
- Rule authors need to express every exemption as code; the skills' "When not to apply" sections are the checklist.
- LLM-only checks are a later phase with their own bar ([ROADMAP.md](../ROADMAP.md), Phase 2).
