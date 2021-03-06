# Generated by Django 4.0.3 on 2022-03-09 22:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='run',
            name='days',
            field=models.PositiveIntegerField(default=None),
        ),
        migrations.AddField(
            model_name='run',
            name='seconds',
            field=models.PositiveIntegerField(default=None, validators=[django.core.validators.MaxValueValidator(60, 'enter correct value for minutes')]),
        ),
    ]
