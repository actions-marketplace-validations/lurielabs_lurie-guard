# ADR 0006: Apache-2.0 for the action and the rules

Status: accepted, 2026-10-19

## Context

The sister repositories are MIT. lurie-guard is a product that will have a paid plan for private repositories and, later, paid packs and a GitHub App. The public repository must be usable by anyone (pilots, CodeRabbit-style integrators, the Marketplace), must protect users and the author from patent claims by contributors, and must not confuse "open source" with "source available".

Options, from the official texts:

- **MIT** ([OSI](https://opensource.org/license/mit)): "A short and simple permissive license with conditions only requiring preservation of copyright and license notices" ([choosealicense](https://choosealicense.com/licenses/mit/)). No patent language.
- **Apache-2.0** ([text](https://www.apache.org/licenses/LICENSE-2.0), [OSI](https://opensource.org/license/apache-2-0)): permissive, with an explicit patent grant from each contributor (section 3), redistribution conditions (section 4: keep the license, mark changed files, keep notices, keep the NOTICE file), and a trademark exclusion. "Contributors provide an express grant of patent rights" ([choosealicense](https://choosealicense.com/licenses/apache-2.0/)). Used by Atlas, pgroll and most infrastructure tooling.
- **Business Source License 1.1** ([text](https://mariadb.com/bsl11/)): production use needs a commercial license unless an Additional Use Grant allows it; converts to an open license on the Change Date (at most four years). Not on the OSI approved list; the Open Source Definition's criterion 6 says "the license must not restrict anyone from making use of the program in a specific field of endeavor" ([OSD](https://opensource.org/osd)). A BSL action would not be "open source" on the Marketplace and would stop integrators from bundling it.
- **Elastic License 2.0** ([text](https://www.elastic.co/licensing/elastic-license)): forbids providing the software "as a hosted or managed service" and tampering with license keys. Same non-OSI status as BSL.

## Decision

The public repository, the action, the engine, every rule, every fixture and the CLI are **Apache-2.0**, with a `NOTICE` file carrying the copyright line. Paid features live in a separate private repository under a commercial license and are delivered as a signed license file the public action verifies offline; the verification code is public and Apache-2.0 too. No BSL, no Elastic License, no dual licensing of the public code.

Open-core line: anything that decides whether a PR is safe is open. Paid is the right to use it on private repositories at scale, the packs that need a hosted component (the App dispatcher), the audit service and support.

## Alternatives considered

- **MIT, to match the sister repositories.** Fine for skills; for a product with outside contributors and a paid plan, the explicit patent grant is worth the longer license. The sister repositories stay MIT; nothing changes there.
- **BSL or Elastic for the whole repository.** Rejected: it would remove the action from the "open source" category, make CodeRabbit-style bundling impossible, and give pilots a reason to say no.
- **AGPL-3.0 for the public code.** Strong copyleft protects against a hosted clone, but it makes integrators (and some pilots' legal teams) refuse the action. The hosted-clone risk is low for a tool whose value is the evidence corpus and the packs, not the engine.

## Consequences

- `LICENSE` is the verbatim Apache-2.0 text; `NOTICE` has the copyright line; source files carry no header (the repository-level license is enough under section 4).
- Contributions are accepted under Apache-2.0 by the act of contributing (the PR template states it); no separate CLA for now.
- The private paid repository and the license-file format are designed in Phase 2 ([ROADMAP.md](../ROADMAP.md)), with their own ADR.
