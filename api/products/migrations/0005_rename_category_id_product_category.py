# Generated by Django 5.0.1 on 2024-02-27 17:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_rename_product_id_image_product_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='category_id',
            new_name='category',
        ),
    ]
