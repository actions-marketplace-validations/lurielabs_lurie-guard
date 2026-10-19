---
name: new-rule
description: Scaffold a new pr-guard rule from the template, with its fixtures copied from the sister-repository skill, then validate it. Use when adding a rule to this repository.
argument-hint: <ID> <slug>
disable-model-invocation: true
---

# New rule

Create the rule `$ARGUMENTS` in this repository. The first argument is the id (`PG001`), the second the slug (`create-index-not-concurrently`).

1. Stop if a folder for that id already exists under `rules/`, if the id is not `<PACK><three digits>`, or if the slug is not lowercase kebab-case.
2. Read `CLAUDE.md`, `docs/RULES.md` and `templates/RULE.template.md`. Check that the rule is listed in `docs/SPEC-MVP.md` or `docs/ROADMAP.md` with this id; if not, say so and stop.
3. Open the skill the spec names for this rule in the sister repository (for `pg` rules, `../db-skills/skills/<skill>/SKILL.md` and its `examples/good/test.sql` and `examples/bad/test.sql`). Find the statements and the assertions the spec's evidence column points to.
4. Create `rules/<pack>/<ID>-<slug>/` with:
   - `RULE.md` from the template, frontmatter filled from the spec row (id, name, severity, pack, skill, evidence line ranges, `verified` set to today);
   - `fixtures/bad/` with the skill's bad statements for this mistake, trimmed, each finding marked `-- expect: <ID>` on its line;
   - `fixtures/good/` with the skill's good form and one file per exemption listed in the spec row;
   - `rule.ts` exporting `rule` with a matcher over the parse tree (no regular expressions over SQL text);
   - `rule.test.ts` that runs the fixtures through the engine harness.
5. Write the six sections of `RULE.md` following `docs/RULES.md`: what it detects, why it matters with the measured number from the evidence, the fix, when it does not apply, the three-part message, and the fixture list. When a fact is uncertain, check the PostgreSQL manual for the version the fixture targets before writing it.
6. Add the rule to the index in both `README.md` and `README.pt-BR.md`.
7. Run `bash scripts/validate.sh` and `bash scripts/test-rules.sh` and fix everything they report.
