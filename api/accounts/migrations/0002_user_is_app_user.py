# Generated by Django 5.0.1 on 2024-02-02 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_app_user',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]