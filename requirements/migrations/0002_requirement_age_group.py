# Generated by Django 4.0.3 on 2022-03-10 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requirements', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='requirement',
            name='age_group',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
