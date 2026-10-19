#!/usr/bin/env bash
# Runs the cost test of every `error` rule against real PostgreSQL 15 and 18 in
# Docker (RULES.md, "Fixtures"): rules/<pack>/<rule>/fixtures/cost/test.sql
# wraps the rule's bad statements in the same assertions the db-skills evidence
# uses (held_locks, pg_relation_filenode, xact_seq_scans, SQLSTATE). It also
# checks that every `-- expect:` statement of the rule's bad .sql fixtures
# appears in that cost test, so the fixture and the evidence stay tied.
#
#   bash scripts/test-fixtures.sh
#   PG_VERSIONS=18 ONLY=rules/pg/PG001-create-index-not-concurrently bash scripts/test-fixtures.sh
#
# Slow (two containers, ~1 minute each); weekly and on demand, not on every push.
set -uo pipefail
cd "$(dirname "$0")/.."
export MSYS_NO_PATHCONV=1

PG_VERSIONS=${PG_VERSIONS-"15 18"}
only=${ONLY:-rules/*/*}
run_id=$$
errors=0
fail() {
  echo "FAIL $1"
  errors=$((errors + 1))
}

normalize() { tr '[:upper:]' '[:lower:]' | tr -s '[:space:]' ' '; }

cost_tests=()
for dir in $only; do
  [ -f "$dir/fixtures/cost/test.sql" ] || continue
  cost_tests+=("$dir")
  normalized_cost=$(normalize <"$dir/fixtures/cost/test.sql")
  while IFS= read -r file; do
    while IFS= read -r line; do
      # The statement text without its comment and its terminating semicolon (the cost
      # test may run it inside assert_error or dblink, where it has none).
      stmt=$(printf '%s' "$line" | sed 's/--.*$//' | normalize | sed 's/^ *//; s/ *$//; s/;$//')
      [ -n "$stmt" ] || continue
      case "$normalized_cost" in
        *"$stmt"*) ;;
        *) fail "$(basename "$dir"): bad fixture statement is not in fixtures/cost/test.sql: $stmt" ;;
      esac
    done < <(grep -h -- '-- expect:' "$file")
  done < <(find "$dir/fixtures/bad" -name '*.sql' | sort)
done
[ ${#cost_tests[@]} -gt 0 ] || { echo "no cost tests under $only"; exit 1; }

wait_for() {
  local name=$1
  shift
  for _ in $(seq 1 90); do
    "$@" >/dev/null 2>&1 && return 0
    sleep 1
  done
  echo "FAIL $name never became ready"
  docker logs "$name" 2>&1 | tail -20
  return 1
}

for v in $PG_VERSIONS; do
  c=lurieguard-pg-$v-$run_id
  docker rm -f "$c" >/dev/null 2>&1
  docker run -d --name "$c" -e POSTGRES_PASSWORD=lurieguard "postgres:$v" -c shared_preload_libraries=pg_stat_statements >/dev/null
  wait_for "$c" docker exec "$c" psql -U postgres -h 127.0.0.1 -c 'select 1' || { errors=$((errors + 1)); continue; }
  for dir in "${cost_tests[@]}"; do
    db=cost_$RANDOM$RANDOM
    docker exec "$c" createdb -U postgres "$db"
    if cat scripts/lib/pg-helpers.sql "$dir/fixtures/cost/test.sql" | docker exec -i "$c" psql -q -v ON_ERROR_STOP=1 -U postgres -d "$db" >"/tmp/lurieguard-cost-$run_id.txt" 2>&1; then
      echo "ok   pg $v  $(basename "$dir")"
    else
      fail "pg $v  $(basename "$dir")"
      tail -15 "/tmp/lurieguard-cost-$run_id.txt"
    fi
    docker exec "$c" dropdb -U postgres "$db" >/dev/null 2>&1
  done
  docker rm -f "$c" >/dev/null
done

if [ "$errors" -gt 0 ]; then
  echo "$errors problem(s) found"
  exit 1
fi
echo "ok: ${#cost_tests[@]} cost tests on PostgreSQL $PG_VERSIONS"
