import { describe, expect, it } from 'vitest';
import { defaultConfig } from '../config/index.js';
import { builtinCatalog } from '../engine/builtin.js';
import { catalog } from '../generated/rules-index.js';
import { classify } from './frameworks.js';
import { detectMigrations } from './index.js';
import { extractPython } from './python.js';
import { extractRuby } from './ruby.js';

const config = () => defaultConfig([...catalog, ...builtinCatalog()]);

describe('framework classification', () => {
  it.each([
    ['migrations/001_init.sql', '', 'sql', false],
    ['db/migrations/20261019_x.sql', '', 'sql', false],
    ['sql/migrations/a/b.sql', '', 'sql', false],
    ['db/migrations/20261019_x.sql', '-- migrate:up\nSELECT 1;\n', 'dbmate', true],
    ['src/main/resources/db/migration/V1__init.sql', '', 'flyway', true],
    ['db/migration/R__views.sql', '', 'flyway', true],
    ['src/changelog/002.sql', '--liquibase formatted sql\n--changeset a:1\n', 'liquibase', true],
    ['src/changelog/002.sql', 'SELECT 1;', undefined, undefined],
    ['db/migrate/20261019120000_add_index.rb', '', 'rails', true],
    ['app/migrations/0002_index.py', '', 'django', true],
    ['alembic/versions/0002_index.py', '', 'alembic', true],
    ['prisma/migrations/20261019_x/migration.sql', '', 'prisma', true],
    ['db/000002_x.up.sql', '', 'golang-migrate', false],
    ['db/000002_x.down.sql', '', 'golang-migrate', false],
    ['deploy/orders.sql', '', 'sqitch', true],
    ['src/queries/report.sql', '', undefined, undefined],
    ['README.md', '', undefined, undefined],
  ])('%s -> %s', (path, content, framework, wrapped) => {
    const def = classify(path, content, config());
    expect(def?.name).toBe(framework);
    if (wrapped !== undefined) expect(def?.wrapped).toBe(wrapped);
  });

  it.each([
    'target/classes/db/migration/V3__x.sql',
    'build/resources/main/db/migration/V3__x.sql',
    'app/out/db/migrate/20261019_x.rb',
    'dist/db/migration/V1__x.sql',
    'node_modules/pkg/db/migration/V1__x.sql',
    'vendor/pkg/db/migration/V1__x.sql',
    'bin/deploy/x.sql',
    'obj/deploy/x.sql',
    '.gradle/db/migration/V1__x.sql',
    '.venv/lib/app/migrations/0001_x.py',
  ])('build and dependency output is excluded by default: %s', (path) => {
    expect(classify(path, '', config())).toBeUndefined();
    const c = config();
    c.defaultExcludes = false;
    expect(classify(path, '', c)).toBeDefined();
  });

  it('config paths override the built-in globs; exclude always applies; framework can be forced', () => {
    const c = config();
    c.paths = ['services/*/schema/**/*.sql'];
    expect(classify('services/a/schema/001.sql', '', c)?.name).toBe('sql');
    expect(classify('migrations/001.sql', '', c)).toBeUndefined();
    c.exclude = ['services/legacy/**'];
    expect(classify('services/legacy/schema/001.sql', '', c)).toBeUndefined();
    c.framework = 'flyway';
    expect(classify('services/a/schema/001.sql', '', c)?.name).toBe('flyway');
  });
});

describe('transaction wrappers', () => {
  it('reads the Flyway script config, the dbmate section flag and the Liquibase changeset flag', async () => {
    const c = config();
    const files = [
      { path: 'db/migration/V2__a.sql', status: 'added' as const, content: 'SELECT 1;' },
      { path: 'db/migration/V3__b.sql', status: 'added' as const, content: 'SELECT 1;' },
      { path: 'db/migrations/1_x.sql', status: 'added' as const, content: '-- migrate:up transaction:false\nSELECT 1;\n-- migrate:down\nSELECT 2;\n' },
      { path: 'changelog/1.sql', status: 'added' as const, content: '--liquibase formatted sql\n--changeset a:1 runInTransaction:false\nSELECT 1;\n--changeset a:2\nSELECT 2;\n' },
    ];
    const sibling = new Map([['db/migration/V3__b.sql.conf', 'executeInTransaction=false\n']]);
    const out = await detectMigrations(files, { config: c, readSibling: (p) => sibling.get(p) });
    const by = new Map(out.map((m) => [m.path, m]));
    expect(by.get('db/migration/V2__a.sql')?.wrapped).toBe(true);
    expect(by.get('db/migration/V3__b.sql')?.wrapped).toBe(false);
    const dbmate = by.get('db/migrations/1_x.sql');
    expect(dbmate?.framework).toBe('dbmate');
    expect(dbmate?.segments.map((s) => [s.line, s.transactionOptOut ?? false])).toEqual([
      [1, true],
      [3, false],
    ]);
    const lb = by.get('changelog/1.sql');
    expect(lb?.segments.map((s) => [s.line, s.transactionOptOut ?? false])).toEqual([
      [1, false],
      [2, true],
      [4, false],
    ]);
    c.transaction = 'never';
    const never = await detectMigrations(files.slice(0, 1), { config: c });
    expect(never[0].wrapped).toBe(false);
  });
});

describe('Rails extraction', () => {
  const sqlOf = async (body: string) => {
    const x = await extractRuby(`class M < ActiveRecord::Migration[7.1]\n  def change\n${body}\n  end\nend\n`);
    return x;
  };

  it('maps add_index with its options', async () => {
    const x = await sqlOf(`    add_index :orders, [:account_id, :created_at], unique: true, algorithm: :concurrently, name: "orders_acc_idx", where: "deleted_at IS NULL", using: :btree`);
    expect(x.segments.map((s) => s.sql)).toEqual([
      'CREATE UNIQUE INDEX CONCURRENTLY orders_acc_idx ON orders USING btree (account_id, created_at) WHERE deleted_at IS NULL',
    ]);
    expect(x.segments[0].line).toBe(3);
    expect(x.segments[0].synthesized?.call).toBe('add_index');
  });

  it('maps add_column types and options, change_column_null, change_column, add_foreign_key', async () => {
    const x = await sqlOf(
      [
        `    add_column :orders, :note, :string, limit: 50, null: false, default: "none"`,
        `    add_column :orders, :placed_at, :datetime`,
        `    add_column :orders, :total, :decimal, precision: 12, scale: 2`,
        `    add_column :orders, :tags, :text, array: true`,
        `    add_column :orders, :created_at, :datetime, default: -> { "now()" }`,
        `    change_column_null :orders, :amount, false`,
        `    change_column :orders, :amount, :bigint, null: false`,
        `    add_foreign_key :orders, :accounts, column: :account_id, validate: false, on_delete: :cascade`,
        `    add_foreign_key :orders, :categories`,
      ].join('\n'),
    );
    expect(x.segments.map((s) => s.sql)).toEqual([
      "ALTER TABLE orders ADD COLUMN note varchar(50) DEFAULT 'none' NOT NULL",
      'ALTER TABLE orders ADD COLUMN placed_at timestamp(6)',
      'ALTER TABLE orders ADD COLUMN total numeric(12, 2)',
      'ALTER TABLE orders ADD COLUMN tags text[]',
      'ALTER TABLE orders ADD COLUMN created_at timestamp(6) DEFAULT now()',
      'ALTER TABLE orders ALTER COLUMN amount SET NOT NULL',
      'ALTER TABLE orders ALTER COLUMN amount TYPE bigint, ALTER COLUMN amount SET NOT NULL',
      'ALTER TABLE orders ADD CONSTRAINT fk_rails_orders_account_id FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE NOT VALID',
      'ALTER TABLE orders ADD CONSTRAINT fk_rails_orders_category_id FOREIGN KEY (category_id) REFERENCES categories (id)',
    ]);
    expect(x.notAnalyzed).toEqual([]);
  });

  it('never guesses: unknown options, dynamic arguments and other helpers are listed as not analyzed', async () => {
    const x = await sqlOf(
      [
        `    add_index :orders, :a, algorithm: :inplace`,
        `    add_column :orders, :b, :geometry`,
        `    add_column :orders, :c, :string, default: Time.now`,
        `    add_index table_name, :d`,
        `    add_reference :orders, :account, index: true`,
        `    remove_index :orders, :e`,
      ].join('\n'),
    );
    expect(x.segments).toEqual([]);
    expect(x.notAnalyzed.map((n) => n.line)).toEqual([3, 4, 5, 6, 7, 8]);
    expect(x.notAnalyzed[0].reason).toMatch(/algorithm/);
    expect(x.notAnalyzed[4].reason).toMatch(/add_reference/);
  });

  it('extracts execute strings and heredocs with their lines, skips interpolation, registers create_table', async () => {
    const src = `class M < ActiveRecord::Migration[7.1]
  disable_ddl_transaction!

  def up
    create_table :order_events do |t|
      t.bigint :order_id
    end
    execute "CREATE INDEX a ON orders (a)"
    execute <<~SQL
      CREATE INDEX b ON orders (b);
      CREATE INDEX c ON orders (c);
    SQL
    execute "CREATE INDEX #{name} ON orders (d)"
  end
end
`;
    const x = await extractRuby(src);
    expect(x.transactionOptOut).toBe(true);
    expect(x.segments.map((s) => [s.line, s.sql.trim().split('\n')[0]])).toEqual([
      [5, 'CREATE TABLE order_events ()'],
      [8, 'CREATE INDEX a ON orders (a)'],
      [10, 'CREATE INDEX b ON orders (b);'],
    ]);
    expect(x.notAnalyzed.map((n) => n.line)).toEqual([13]);
    expect(x.comments).toEqual([]);
  });
});

describe('Python extraction', () => {
  it('Django: RunSQL strings and lists, atomic = False, other operations not analyzed', async () => {
    const src = `from django.db import migrations


class Migration(migrations.Migration):
    atomic = False
    dependencies = [("app", "0001")]
    operations = [
        migrations.RunSQL("CREATE INDEX CONCURRENTLY a ON orders (a);", reverse_sql="DROP INDEX a;"),
        migrations.RunSQL(
            sql=[
                "CREATE INDEX b ON orders (b);",
                "CREATE INDEX c ON orders (c);",
            ],
        ),
        migrations.RunSQL(f"CREATE INDEX {name} ON orders (d);"),
        migrations.AddField(model_name="order", name="note", field=models.TextField()),
        migrations.RunPython(forward),
    ]
`;
    const x = await extractPython(src, 'django');
    expect(x.transactionOptOut).toBe(true);
    expect(x.segments.map((s) => [s.line, s.sql])).toEqual([
      [8, 'CREATE INDEX CONCURRENTLY a ON orders (a);'],
      [11, 'CREATE INDEX b ON orders (b);'],
      [12, 'CREATE INDEX c ON orders (c);'],
    ]);
    expect(x.notAnalyzed.map((n) => [n.line, n.reason])).toEqual([
      [15, '`RunSQL`: argument is not a plain string literal'],
      [16, '`migrations.AddField` is not mapped in this release (ADR 0008)'],
    ]);
  });

  it('Alembic: op.execute strings and text(), autocommit_block, COMMIT, other op calls not analyzed', async () => {
    const src = `"""x"""
from alembic import op
from sqlalchemy import text


def upgrade():
    op.add_column("orders", sa.Column("note", sa.Text()))
    op.execute(text("ALTER TABLE orders ADD COLUMN a int"))
    with op.get_context().autocommit_block():
        op.execute("CREATE INDEX CONCURRENTLY a ON orders (a)")
    op.get_bind().execute(text("COMMIT"))
    op.execute("CREATE INDEX CONCURRENTLY b ON orders (b)")
`;
    const x = await extractPython(src, 'alembic');
    expect(x.segments.map((s) => [s.line, s.transactionOptOut ?? false, s.sql])).toEqual([
      [8, false, 'ALTER TABLE orders ADD COLUMN a int'],
      [10, true, 'CREATE INDEX CONCURRENTLY a ON orders (a)'],
      [12, true, 'CREATE INDEX CONCURRENTLY b ON orders (b)'],
    ]);
    expect(x.notAnalyzed.map((n) => n.line)).toEqual([7]);
  });
});
