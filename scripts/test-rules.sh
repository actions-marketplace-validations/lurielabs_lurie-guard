#!/usr/bin/env bash
# Runs every fixture through the whole pipeline (parse, detect, rules,
# reporters) and checks three things (CLAUDE.md, "Testing and CI expectations"):
#   1. every fixture produces exactly the findings its `-- expect:` markers declare
#      (the per-rule vitest harness);
#   2. two runs of the built action on the same input are byte-identical
#      (findings, SARIF, review payloads: the determinism diff);
#   3. the performance budget holds on the generated 200-file corpus.
#
#   bash scripts/test-rules.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== build"
npm run build --silent

echo "== fixtures: expected findings per rule"
npx vitest run rules --silent

echo "== determinism: two runs, byte for byte"
mkdir -p test/tmp
node dist/cli.js --fixtures rules --out test/tmp/fixtures-run-1.json
node dist/cli.js --fixtures rules --out test/tmp/fixtures-run-2.json
if ! cmp -s test/tmp/fixtures-run-1.json test/tmp/fixtures-run-2.json; then
  echo "FAIL: the two runs differ"
  diff <(head -c 4000 test/tmp/fixtures-run-1.json) <(head -c 4000 test/tmp/fixtures-run-2.json) | head -40
  exit 1
fi
echo "ok: $(wc -c <test/tmp/fixtures-run-1.json | tr -d ' ') bytes, identical"

echo "== performance budget (200 files x 20 statements, all rules)"
npx vitest run test/perf.test.ts --silent=false 2>&1 | grep -E "parser boot|corpus:|rss after|Tests " || true
npx vitest run test/perf.test.ts --silent

echo "ok"
