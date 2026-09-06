from django.db import migrations
import os

def create_superuser(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

    if not User.objects.filter(username=username).exists():
        if username and email and password:
            print(f"Creating superuser: {username}")
            User.objects.create_superuser(username=username, email=email, password=password)
        else:
            print("Superuser environment variables not set. Skipping creation.")

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ] 