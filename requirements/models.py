from django.db import models
from django.core.validators import MaxValueValidator 
# Create your models here.


class Requirement(models.Model):
    hours = models.PositiveIntegerField(default=None)
    minutes = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(60, 'enter correct value for minutes')])



    def __str__(self):
        return f"{self.hours} hours: {self.minutes} minutes"