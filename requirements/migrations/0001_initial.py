# Generated by Django 4.0.3 on 2022-03-06 21:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Requirement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hours', models.PositiveIntegerField(default=None)),
                ('minutes', models.PositiveIntegerField(default=None, validators=[django.core.validators.MaxValueValidator(60, 'enter correct value for minutes')])),
            ],
        ),
    ]
