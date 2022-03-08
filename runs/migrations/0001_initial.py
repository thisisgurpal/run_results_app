# Generated by Django 4.0.3 on 2022-03-08 17:55

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
        ('runners', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Run',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hours', models.PositiveIntegerField(default=None)),
                ('minutes', models.PositiveIntegerField(default=None, validators=[django.core.validators.MaxValueValidator(60, 'enter correct value for minutes')])),
                ('position', models.CharField(max_length=300)),
                ('year', models.PositiveIntegerField(default=None)),
                ('event', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='runs', to='events.event')),
                ('runner', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='runs', to='runners.runner')),
            ],
        ),
    ]
