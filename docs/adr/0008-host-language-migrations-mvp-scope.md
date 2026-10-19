# ADR 0008: Host-language migrations in the MVP: raw SQL everywhere, the Rails DSL helpers, Django and Alembic DSL after the first pilot that asks

Status: accepted, 2026-10-19

## Context

The migration detector ([ARCHITECTURE.md](../ARCHITECTURE.md), [SPEC-MVP.md](../SPEC-MVP.md), "Migration detection") classifies files by framework and extracts SQL from migrations written in a host language. Three frameworks in the MVP table are not SQL files: Rails (`db/migrate/*.rb`), Django (`**/migrations/[0-9]*.py`) and Alembic (`**/versions/*.py`). Each has two kinds of content:

- **Raw SQL in a string literal**: Rails `execute "..."` and `execute <<~SQL ... SQL`, Django `migrations.RunSQL("...")`, Alembic `op.execute("...")`. The parser sees the same SQL a `.sql` file would carry; the detector only has to find the literal and keep its line offset.
- **DSL calls that generate SQL**: Rails `add_index`, `add_column`, `add_foreign_key`, `change_column_null`, `change_column`; Django `migrations.AddField`, `AddIndex`, `AlterField`, `AddConstraint`; Alembic `op.add_column`, `op.create_index`, `op.create_foreign_key`, `op.alter_column`. Each call has to be mapped to the equivalent statement, with every option that changes the rule's answer (`algorithm: :concurrently`, `validate: false`, `null: false`, `default:`; Django's `AddIndexConcurrently` in `django.contrib.postgres`; Alembic's `postgresql_concurrently=True` and `postgresql_not_valid=True`) mapped correctly, and a fixture per option.

The first version of SPEC-MVP.md promised the DSL mapping for all three. The Django and Alembic DSLs have many more call shapes and option spellings than Rails, their migrations commonly hold the SQL-generating calls in operations lists that reference model classes the detector cannot see, and no pilot has asked for them yet. A wrong mapping is a false positive, which RULES.md treats as a bug with a 48-hour deadline; the way to avoid that is to map less and to say so.

## Decision

1. The MVP extracts **raw SQL string literals in every host-language framework**: Rails `execute` (string and heredoc), Django `RunSQL` (string, and the first element of a `(sql, reverse_sql)` tuple), Alembic `op.execute` (string and `text("...")`). The literal's line offset is preserved so findings point at the line inside the host file.
2. The MVP maps the **Rails DSL helpers** `add_index`, `add_column`, `add_foreign_key`, `change_column_null`, `change_column` to their statements, and recognizes `disable_ddl_transaction!` as the transaction opt-out. Options the detector does not understand make the call "not analyzed", never a guess. A table in the pack's README lists the exact mapping.
3. **Django and Alembic DSL extraction** (anything beyond `RunSQL` and `op.execute`) is scheduled for **after the first pilot that asks for it**. Until then those files are analyzed for their raw SQL only, and the job summary lists the DSL calls it skipped as "not analyzed", so a team knows what was and was not reviewed.
4. Host files are located with tree-sitter grammars for Ruby and Python compiled to WebAssembly (as ARCHITECTURE.md says), so adding the Django and Alembic mappings later is a matter of new call shapes, not a new parser.

## Alternatives considered

- **Map the Django and Alembic DSLs now.** Three times the surface for the detector with the least evidence of demand. Rejected until a pilot asks; the ask tells which call shapes matter first.
- **Map nothing in host languages; SQL files only.** Simplest, but Rails migrations almost never use `execute`, and Rails teams are a target segment (strong_migrations shows the demand). Rejected.
- **A line-based matcher instead of tree-sitter.** Smaller bundle; but multi-line calls, heredocs and comments make a line matcher guess, and guessing is what RULES.md forbids. Rejected.

## Consequences

- SPEC-MVP.md's "Migration detection" and ROADMAP.md's Phase 1 say exactly this.
- The bundle carries `web-tree-sitter` and the Ruby and Python grammars (about 2.8 MB of WebAssembly), loaded only when the PR contains a `.rb` or `.py` migration, so SQL-only repositories pay nothing for it.
- Fixtures: every Rails helper has a `bad` and a `good` fixture under `db/migrate/`; Django and Alembic have fixtures for `RunSQL`/`op.execute` and for the transaction opt-out only.
- The README's framework table has a "DSL coverage" column that says "raw SQL" for Django and Alembic, so nobody expects more than the detector does.
