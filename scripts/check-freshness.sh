#!/usr/bin/env bash
# Fails when a rule's `verified` date is older than six months (RULES.md): the
# facts in a rule are checked against the PostgreSQL manual and the db-skills
# tests at least twice a year.
#
#   bash scripts/check-freshness.sh
#   MAX_DAYS=90 bash scripts/check-freshness.sh
set -uo pipefail
cd "$(dirname "$0")/.."

MAX_DAYS=${MAX_DAYS:-183}
today=$(date +%s)
errors=0
for ruleMd in rules/*/*/RULE.md; do
  folder=$(basename "$(dirname "$ruleMd")")
  verified=$(awk 'NR == 1 { next } /^---$/ { exit } { print }' "$ruleMd" | sed -n 's/^verified: *//p' | head -1)
  if [[ ! "$verified" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "FAIL $folder: verified is missing or malformed"
    errors=$((errors + 1))
    continue
  fi
  then_s=$(date -d "$verified" +%s 2>/dev/null || date -j -f '%Y-%m-%d' "$verified" +%s)
  age=$(( (today - then_s) / 86400 ))
  if [ "$age" -gt "$MAX_DAYS" ]; then
    echo "FAIL $folder: verified $verified is $age days old (limit $MAX_DAYS)"
    errors=$((errors + 1))
  fi
done
if [ "$errors" -gt 0 ]; then
  echo "$errors rule(s) need re-verification"
  exit 1
fi
echo "ok: every rule verified within $MAX_DAYS days"
