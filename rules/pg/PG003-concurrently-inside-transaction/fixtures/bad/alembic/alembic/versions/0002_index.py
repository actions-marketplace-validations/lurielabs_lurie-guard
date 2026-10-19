"""add index"""
from alembic import op

revision = "0002"
down_revision = "0001"


def upgrade():
    op.execute("CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at)")  # expect: PG003


def downgrade():
    op.execute("DROP INDEX CONCURRENTLY orders_created_at_idx")  # expect: PG003
