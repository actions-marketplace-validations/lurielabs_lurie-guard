from django.db import migrations


class Migration(migrations.Migration):
    atomic = False

    dependencies = [("app", "0001_initial")]

    operations = [
        migrations.RunSQL("CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);"),
    ]
