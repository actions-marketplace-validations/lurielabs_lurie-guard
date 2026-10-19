---
name: review-rule
description: Review one lurie-guard rule against docs/RULES.md, its fixtures and the sister-repository skill it enforces. Use before opening a PR for a new or changed rule.
argument-hint: <ID>
disable-model-invocation: true
---

# Review rule

Review the folder under `rules/` whose name starts with `$ARGUMENTS` against `CLAUDE.md` and `docs/RULES.md`. Report findings as a list, most severe first; do not edit unless asked.

Check:

1. **Scripts.** `bash scripts/validate.sh` and `bash scripts/test-rules.sh` pass, and the determinism diff is empty.
2. **One mistake.** The rule detects a single mistake with a single fix. If it covers two, say where to split.
3. **Position matches the skill.** Open the skill named in `skill:` in the sister repository. The rule's "what it detects", "the fix" and "when it does not apply" say what the skill says. Flag any exemption the skill lists that a parser could recognize and the detector does not implement.
4. **Evidence.** Each `evidence:` line resolves. At least one points to an assertion in a sister-repository test that measures the cost the rule claims (lock mode, filenode, scan count, SQLSTATE, size). The number quoted in "Why it matters" is the number that test asserts.
5. **Fixtures.** Every `bad` fixture marks each expected finding with `-- expect: <ID>` on the right line. Every exemption has a `good` fixture. Fixtures parse. Fixtures copied from the skill keep its `-- MISTAKE:` comments.
6. **Detector.** `rule.ts` matches on the parse tree only. No regular expressions over SQL text, no string search, no dependence on formatting or case. The "new table in the same migration set" exemption uses the engine's shared helper, not a local reimplementation.
7. **Message.** Three parts (what happens, the fix, the exception), names the table, ends with the id and the evidence link, interpolates only identifiers.
8. **Severity.** Matches the table in `docs/RULES.md`: `error` only with a measured fixture; `info` for opinions.
9. **Facts are current.** Every PostgreSQL behavior named in the rule holds on the versions the fixtures target (15 and 18). Rules whose fix differs by version carry the inline gate.
10. **Index.** The rule is in the index of both `README.md` and `README.pt-BR.md` with the same wording.
