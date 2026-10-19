# ADR 0010: ESM bundle, a fetch-based GitHub client, vendored skill text

Status: accepted, 2026-10-19. Amends [ADR 0009](0009-build-toolchain.md), which stays as written; this record carries the three implementation facts found while building the MVP.

## Context

ADR 0009 decided esbuild, vitest, ESLint and a committed `dist/`, and described the bundle as CommonJS with `@actions/github` for the API calls. Building the MVP showed three things that document did not know:

1. `@actions/core` 3 is ESM-only (`"type": "module"`, an `exports` map with `import` only). A CommonJS bundle cannot load it.
2. `@actions/github` 9 wraps Octokit around its own copy of `undici`. Bundling it adds a second HTTP stack (about 2 MB) for seven REST calls that Node's own `fetch` makes directly.
3. The explainer ([ADR 0002](0002-deterministic-core-optional-llm.md), [ADR 0003](0003-bring-your-own-key.md)) sends the rule's `SKILL.md` as cached context. The runner has no copy of db-skills, and the context must be identical across runs for the prompt cache to hit, so the text has to ship with the action at the pinned commit.

## Decision

- **The bundle is ESM.** `dist/main.js` and `dist/cli.js` are ES modules (`package.json` has `"type": "module"`; `runs.main: dist/main.js` relies on it). CommonJS dependencies (libpg-query's loader, `yaml`, `picomatch`, the Anthropic SDK) still reference `require`, `__filename` and `__dirname`, so `scripts/build.mjs` adds a banner that defines them from `import.meta.url`. The emscripten loaders find the `.wasm` files next to the bundle through `import.meta.url`.
- **No Octokit.** `src/github/client.ts` calls the seven documented endpoints (PR files, contents, reviews, review comments, replies, SARIF upload) through Node's `fetch`, with `Link`-header pagination and a 60 s timeout per request, and typed errors with the HTTP status. `@actions/github` is not a dependency. On a self-hosted runner behind a proxy, `NODE_USE_ENV_PROXY=1` makes Node's `fetch` honor `HTTPS_PROXY`; the README says so.
- **The skill text is vendored and generated.** The three skills the pack enforces are copied verbatim into `vendor/db-skills/skills/<skill>/SKILL.md` at the commit in `vendor/db-skills/REF` (the same commit `src/evidence.ts` pins), and `scripts/gen-rules-index.mjs` embeds them into `src/generated/skills.ts`. `scripts/validate.sh` compares the copies with the sister repository at that commit, so they cannot drift from the evidence.

## Alternatives considered

- **Stay on CommonJS with `@actions/core` 1.x.** Works, but on a major the toolkit no longer publishes, against the Node 24 runtime the action targets. Rejected.
- **Keep `@actions/github` and mark `undici` external.** The runner has no `node_modules`; an external cannot be resolved at run time. Rejected.
- **Fetch `SKILL.md` from GitHub at run time.** A network call on the PR path that the architecture forbids (nothing but `api.github.com` and, with a key, `api.anthropic.com`), and a prompt that changes whenever `main` moves. Rejected.

## Consequences

- The end-to-end test runs the built bundle against a fake GitHub API on localhost and exercises the same client the action uses; `dist/main.js` is 2.7 MB, the WebAssembly files 4.5 MB.
- Bumping the db-skills pin updates `src/evidence.ts`, `vendor/db-skills/REF` and the three vendored files in one PR, as ARCHITECTURE.md already requires for the evidence links.
- ADR 0009's text that mentions CommonJS and `@actions/github` is superseded by this record; everything else in it stands.
