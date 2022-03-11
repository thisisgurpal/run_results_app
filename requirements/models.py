from django.db import models
from django.core.validators import MaxValueValidator 
# Create your models here.


class Requirement(models.Model):
    days = models.PositiveIntegerField(default=None)
    hours = models.PositiveIntegerField(default=None)
    minutes = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(60, 'enter correct value for minutes')])
    seconds = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(60, 'enter correct value for minutes')])
    age_group = models.CharField(max_length=100, default=None)
    gender = models.CharField(max_length=100, default=None, choices=[('male', 'male'), ('female', 'female')])



    def __str__(self):
        return f"{self.gender}, {self.days} days, {self.hours} hours, {self.minutes} minutes, {self.seconds} seconds ({self.age_group})"