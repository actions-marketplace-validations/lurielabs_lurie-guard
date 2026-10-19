# ADR 0003: Bring your own Anthropic key; no pr-guard server sees code

Status: accepted, 2026-10-19

## Context

The LLM layer needs a model. Three ways to pay for it:

1. pr-guard runs a service with its own key and bills the client (the CodeRabbit and Greptile model). Code then transits a pr-guard server, which needs security attestations, a data processing agreement, retention policies and an on-call rotation before the first pilot.
2. The client provides their own Anthropic key as a repository or organization secret; the action calls the API from inside the runner.
3. Both, with the service as the default.

Facts about option 2, from the official pages: Anthropic's commercial terms state "Anthropic may not train models on Customer Content from Services" ([commercial terms](https://www.anthropic.com/legal/commercial-terms)); API inputs and outputs are deleted from the backend within 30 days by default, and zero data retention is available per organization ([privacy center](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data), [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)). `claude-opus-5-5`, `claude-sonnet-5-5` and `claude-haiku-5-5` are not in the list of models that require 30-day retention. On a PR from a fork, GitHub does not pass secrets to the runner ([events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)), so the key is never exposed to a fork.

Cost with prompt caching on `claude-sonnet-5-5` is about $0.025 per PR with three findings ([ARCHITECTURE.md](../ARCHITECTURE.md), "LLM explainer"); the client sees it in the job summary.

## Decision

Bring your own key. The action reads `anthropic_api_key` from an input, calls `api.anthropic.com` from the runner with the official TypeScript SDK, sends only the statements that produced findings plus the skill text, and reports tokens and cost. There is no pr-guard server, no telemetry, no proxy. Without the key the action is complete; only the explanation is missing.

## Alternatives considered

- **Hosted service with pr-guard's key.** Rejected for now: it breaks "code never leaves the runner", which is the simplest security story a pilot can approve, and it needs infrastructure before there is revenue. It can be added later as an opt-in for clients who do not want to manage a key, with the same inside-the-runner guarantee impossible to keep; that trade-off would be its own ADR.
- **Other providers or local models.** The explainer's quality depends on the skills context and prompt caching; the SDK and pricing in this design are Anthropic's. The interface is small enough to add a second provider if a pilot requires it, but the MVP does not promise it.

## Consequences

- The privacy model is one sentence: the runner is the boundary; with a key, the client's own API terms apply.
- Pricing cannot bundle model cost; the paid plan charges for the rules, the packs and private repositories, not for tokens ([ROADMAP.md](../ROADMAP.md), Phase 2).
- The egress acceptance test ([SPEC-MVP.md](../SPEC-MVP.md), criteria 15 and 16) is what proves the claim.
