#!/usr/bin/env bash
# Checks the rule format (CLAUDE.md, docs/RULES.md): one folder per rule with
# RULE.md, rule.ts, rule.test.ts, bad and good fixtures; complete frontmatter;
# unique ids; evidence paths that resolve at the pinned db-skills commit; the
# vendored skill text at that commit; the README index in both languages; and a
# fresh rules index.
#
#   bash scripts/validate.sh
#   DB_SKILLS_DIR=../db-skills bash scripts/validate.sh   # where the sister repo is (default ../db-skills)
set -uo pipefail
cd "$(dirname "$0")/.."

DB_SKILLS_REF=$(sed -n "s/^export const DB_SKILLS_REF = '\([0-9a-f]*\)';$/\1/p" src/evidence.ts)
DB_SKILLS_DIR=${DB_SKILLS_DIR:-../db-skills}
DB_SKILLS_URL=${DB_SKILLS_URL:-https://github.com/rafapeixer/db-skills.git}
SECTIONS=("What it detects" "Why it matters" "The fix" "When it does not apply" "Message" "Fixtures")

errors=0
fail() {
  echo "FAIL $1: $2"
  errors=$((errors + 1))
}

[ -n "$DB_SKILLS_REF" ] || { fail "src/evidence.ts" "DB_SKILLS_REF not found"; }

# The sister repository at the pinned commit: a local checkout, or a shallow fetch of that commit.
if ! git -C "$DB_SKILLS_DIR" cat-file -e "$DB_SKILLS_REF^{commit}" 2>/dev/null; then
  tmp=$(mktemp -d)
  echo "db-skills not at $DB_SKILLS_DIR with $DB_SKILLS_REF; fetching that commit into $tmp"
  git init -q "$tmp" && git -C "$tmp" fetch -q --depth 1 "$DB_SKILLS_URL" "$DB_SKILLS_REF" && DB_SKILLS_DIR=$tmp
  git -C "$DB_SKILLS_DIR" cat-file -e "$DB_SKILLS_REF^{commit}" 2>/dev/null || fail "db-skills" "cannot fetch commit $DB_SKILLS_REF"
fi

frontmatter() { awk 'NR == 1 { next } /^---$/ { exit } { print }' "$1"; }
fm_field() { printf '%s\n' "$1" | sed -n "s/^$2: *//p" | head -1; }

declare -A seen_ids
for pack_dir in rules/*/; do
  pack=$(basename "$pack_dir")
  for dir in "$pack_dir"*/; do
    folder=$(basename "$dir")
    [[ "$folder" =~ ^([A-Z]+[0-9]{3})-([a-z0-9-]+)$ ]] || { fail "$folder" "folder must be <ID>-<slug>"; continue; }
    id=${BASH_REMATCH[1]}
    slug=${BASH_REMATCH[2]}
    for f in RULE.md rule.ts rule.test.ts; do [ -f "$dir$f" ] || fail "$folder" "missing $f"; done
    [ -n "$(ls -A "${dir}fixtures/bad" 2>/dev/null)" ] || fail "$folder" "no bad fixture"
    [ -n "$(ls -A "${dir}fixtures/good" 2>/dev/null)" ] || fail "$folder" "no good fixture"
    [ -f "${dir}RULE.md" ] || continue
    [ "$(head -n 1 "${dir}RULE.md")" = "---" ] || fail "$folder" "RULE.md must start with frontmatter"
    fm=$(frontmatter "${dir}RULE.md")
    fid=$(fm_field "$fm" id)
    fname=$(fm_field "$fm" name)
    fsev=$(fm_field "$fm" severity)
    fpack=$(fm_field "$fm" pack)
    fstatus=$(fm_field "$fm" status)
    fskill=$(fm_field "$fm" skill)
    fverified=$(fm_field "$fm" verified)
    fsince=$(fm_field "$fm" since)
    [ "$fid" = "$id" ] || fail "$folder" "frontmatter id '$fid' != folder id"
    [ "$fname" = "$slug" ] || fail "$folder" "frontmatter name '$fname' != folder slug"
    [[ "$fsev" =~ ^(error|warning|info)$ ]] || fail "$folder" "severity must be error, warning or info"
    [ "$fpack" = "$pack" ] || fail "$folder" "frontmatter pack '$fpack' != folder pack"
    [[ "$fstatus" =~ ^(active|deprecated)$ ]] || fail "$folder" "status must be active or deprecated"
    [ -n "$fsince" ] || fail "$folder" "since is missing"
    [[ "$fskill" == db-skills/skills/* ]] || fail "$folder" "skill must name a db-skills skill"
    [[ "$fverified" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || fail "$folder" "verified must be YYYY-MM-DD"
    [ -z "${seen_ids[$id]:-}" ] || fail "$folder" "duplicate id $id"
    seen_ids[$id]=1

    # Evidence: at least one db-skills path (resolved at the pinned commit) and one primary source URL.
    measured=0
    primary=0
    while IFS= read -r ev; do
      [ -n "$ev" ] || continue
      if [[ "$ev" =~ ^https?:// ]]; then
        primary=$((primary + 1))
      elif [[ "$ev" =~ ^db-skills/([^#]+)(#L([0-9]+)(-L([0-9]+))?)?$ ]]; then
        measured=$((measured + 1))
        path=${BASH_REMATCH[1]}
        from=${BASH_REMATCH[3]:-1}
        to=${BASH_REMATCH[5]:-$from}
        if ! git -C "$DB_SKILLS_DIR" cat-file -e "$DB_SKILLS_REF:$path" 2>/dev/null; then
          fail "$folder" "evidence $path does not exist at db-skills $DB_SKILLS_REF"
        else
          lines=$(git -C "$DB_SKILLS_DIR" show "$DB_SKILLS_REF:$path" | wc -l | tr -d ' ')
          [ "$to" -le "$lines" ] || fail "$folder" "evidence $path#L$from-L$to is past the end of the file ($lines lines)"
        fi
      else
        fail "$folder" "evidence entry not understood: $ev"
      fi
    done < <(printf '%s\n' "$fm" | sed -n 's/^  - //p')
    [ "$measured" -ge 1 ] || fail "$folder" "evidence needs at least one db-skills path"
    [ "$primary" -ge 1 ] || fail "$folder" "evidence needs at least one primary-source URL"

    actual=$(grep '^## ' "${dir}RULE.md" | sed 's/^## //')
    expected=$(printf '%s\n' "${SECTIONS[@]}")
    [ "$actual" = "$expected" ] || fail "$folder" "RULE.md sections must be, in order: $(printf '%s, ' "${SECTIONS[@]}" | sed 's/, $//')"

    # rule.ts agrees with the frontmatter.
    if [ -f "${dir}rule.ts" ]; then
      grep -q "id: '$id'" "${dir}rule.ts" || fail "$folder" "rule.ts id != $id"
      grep -q "severity: '$fsev'" "${dir}rule.ts" || fail "$folder" "rule.ts severity != $fsev"
      grep -q "name: '$slug'" "${dir}rule.ts" || fail "$folder" "rule.ts name != $slug"
      if grep -qiE 'new RegExp|\.match\(|\.test\(' "${dir}rule.ts"; then
        grep -q 'stmt.text' "${dir}rule.ts" && fail "$folder" "rule.ts matches on statement text; use the parse tree (RULES.md)"
      fi
    fi
    # Every bad case carries a marker for this rule.
    for case_entry in "${dir}fixtures/bad/"*; do
      [ -e "$case_entry" ] || continue
      grep -rqE "expect:.*\b$id\b" "$case_entry" || fail "$folder" "bad fixture $(basename "$case_entry") has no 'expect: $id' marker"
    done
    # Error rules carry the cost test for scripts/test-fixtures.sh.
    if [ "$fsev" = error ] && [ ! -f "${dir}fixtures/cost/test.sql" ]; then
      fail "$folder" "severity error needs fixtures/cost/test.sql (the assertion test-fixtures.sh runs on PostgreSQL)"
    fi
    # README index, both languages, same severity.
    for readme in README.md README.pt-BR.md; do
      row=$(grep -E "^\| $id \|" "$readme" | head -1)
      [ -n "$row" ] || { fail "$folder" "not in the $readme index"; continue; }
      echo "$row" | grep -q "| $fsev |" || fail "$folder" "$readme lists a different severity than $fsev"
    done
    grep -q "| $id |" docs/SPEC-MVP.md || fail "$folder" "$id is not in the SPEC-MVP.md rule table"
  done
done

# The two READMEs list the same rule ids.
en=$(grep -oE '^\| PG[0-9]{3} \|' README.md | sort)
pt=$(grep -oE '^\| PG[0-9]{3} \|' README.pt-BR.md | sort)
[ "$en" = "$pt" ] || fail "README" "README.md and README.pt-BR.md list different rule ids"
for id in $(echo "$en" | grep -oE 'PG[0-9]{3}'); do
  [ -d "rules/pg/$id-"* ] 2>/dev/null || fail "README" "$id is in the README index but has no rule folder"
done

# Vendored skill text matches the pinned commit; the REF file matches src/evidence.ts.
[ "$(cat vendor/db-skills/REF 2>/dev/null | tr -d '[:space:]')" = "$DB_SKILLS_REF" ] || fail "vendor" "vendor/db-skills/REF != DB_SKILLS_REF in src/evidence.ts"
for skill_dir in vendor/db-skills/skills/*/; do
  skill=$(basename "$skill_dir")
  if git -C "$DB_SKILLS_DIR" cat-file -e "$DB_SKILLS_REF:skills/$skill/SKILL.md" 2>/dev/null; then
    if ! diff -q <(git -C "$DB_SKILLS_DIR" show "$DB_SKILLS_REF:skills/$skill/SKILL.md") <(tr -d '\r' <"$skill_dir/SKILL.md") >/dev/null; then
      fail "vendor" "vendor/db-skills/skills/$skill/SKILL.md differs from db-skills at $DB_SKILLS_REF"
    fi
  else
    fail "vendor" "skills/$skill/SKILL.md does not exist at db-skills $DB_SKILLS_REF"
  fi
done

# GitHub Marketplace rejects an action whose description is 125 characters or longer.
action_desc=$(sed -n "s/^description: '\(.*\)'$/\1/p" action.yml)
if [ -z "$action_desc" ] || [ ${#action_desc} -ge 125 ]; then
  fail "action.yml" "description must be set and shorter than 125 characters (has ${#action_desc})"
fi

# The generated rules index is current.
node scripts/gen-rules-index.mjs --check >/dev/null || fail "rules index" "src/generated is stale; run npm run gen:rules"

if [ "$errors" -gt 0 ]; then
  echo "$errors problem(s) found"
  exit 1
fi
echo "ok: $(ls -d rules/*/*/ | wc -l | tr -d ' ') rules validated against db-skills $DB_SKILLS_REF"
