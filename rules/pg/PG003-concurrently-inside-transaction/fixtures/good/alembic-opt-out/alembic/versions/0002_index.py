"""add index"""
from alembic import op

revision = "0002"
down_revision = "0001"


def upgrade():
    with op.get_context().autocommit_block():
        op.execute("CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at)")


def downgrade():
    with op.get_context().autocommit_block():
        op.execute("DROP INDEX CONCURRENTLY orders_created_at_idx")
