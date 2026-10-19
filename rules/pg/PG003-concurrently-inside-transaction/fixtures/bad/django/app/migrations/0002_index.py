from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("app", "0001_initial")]

    operations = [
        migrations.RunSQL(
            "CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);",  # expect: PG003
            reverse_sql="DROP INDEX CONCURRENTLY orders_created_at_idx;",
        ),
    ]
