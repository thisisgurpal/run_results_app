# Generated by Django 4.0.3 on 2022-03-09 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(default=None, max_length=1000),
        ),
    ]
