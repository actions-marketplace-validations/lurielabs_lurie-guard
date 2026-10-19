# ADR 0013: goose in the framework table; rollback sections are not analyzed by default

Status: accepted, 2026-10-19

## Context

The self-pilot over go-skills (`skills/db-migrations/examples/*/migrations/*.sql`, goose files) missed one deliberate mistake and reported three good examples:

- `bad/00003_index_users_display_name.sql` runs `CREATE INDEX CONCURRENTLY` in a file goose wraps in a transaction (its mistake is the missing `-- +goose NO TRANSACTION`). goose was not in the framework table, so the file was a plain SQL folder, "not wrapped", and PG003 stayed silent.
- `good/00001`, `good/00002` and `good/00004` got PG014 on the `DROP TABLE` / `DROP COLUMN` of their `-- +goose Down` sections: the reversal of the Up, drops by nature.

goose's own README ([pressly/goose](https://github.com/pressly/goose)) says: "Each migration file must have exactly one `-- +goose Up` annotation"; `-- +goose Down` is optional and its statements run as the rollback; "more complex statements (PL/pgSQL) that have semicolons within them must be annotated with" `-- +goose StatementBegin` / `-- +goose StatementEnd`; migrations run inside a transaction by default, and "you may optionally add `-- +goose NO TRANSACTION` to the top of your migration file" to run it outside one (Up and Down alike). The default directory is the current one (`-dir`), so the file name and location say nothing; the annotation does.

The same "reversal" exists in other frameworks the detector knows: dbmate's `-- migrate:down` section, golang-migrate's `.down.sql` file, Rails `def down`, Alembic `downgrade()`. Django's `reverse_sql` was already ignored.

## Decision

1. **goose is a framework**: any `.sql` file containing `-- +goose Up` (content marker, any path), wrapped in a transaction by default, opt-out `-- +goose NO TRANSACTION`; the `StatementBegin/End` annotations are comments to the parser and need no handling. PG003 now reports go-skills' `bad/00003`.
2. **Rollback sections are not analyzed by default**: goose `-- +goose Down`, dbmate `-- migrate:down`, golang-migrate `*.down.sql`, Rails `def down`, Alembic `downgrade()`. A rollback is the reversal of the migration and its drops are by nature; reporting them is noise on every file. The job summary still lists the file and its statements.
3. **`analyze_down: true`** in `.lurie-guard.yml` turns the rollback sections back on. A rollback does run in production sometimes, and a team that rehearses rollbacks may want `CREATE INDEX CONCURRENTLY` inside a wrapped Down section (PG003) or a `VACUUM FULL` in a down file caught too; the price is the PG014 warnings on every drop that reverses an add.

## Alternatives considered

- **Analyze Down sections and exempt only PG014 there.** Half-measures: PG013 on the reversing rename, PG001 on the reversing index would still report. Rejected.
- **Treat goose files as plain SQL with a `transaction: always` hint.** The user would have to know; the annotation is in the file. Rejected.

## Consequences

- SPEC-MVP.md: the goose row in the framework table, the "Rollback sections" paragraph, the `analyze_down` config key; both READMEs' framework tables.
- Fixtures: PG003 gains goose cases (wrapped, `NO TRANSACTION`, Down-only `CONCURRENTLY` with a `StatementBegin/End` body); the dbmate and Alembic bad fixtures no longer expect findings in their down parts.
- The three PG014 reports on go-skills' good examples go away except `good/00004`, whose `DROP COLUMN name` is in the Up section: the documented contract step, the case the rule's message asks to suppress with the release name.
