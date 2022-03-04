from django.db import models
# Create your models here.


class Distance(models.Model):
    distance = models.CharField(max_length=100, default=None)
    measurement = models.CharField(max_length=100, default=None, choices=[('km', 'km'), ('miles', 'miles')])



    def __str__(self):
        return f"{self.distance} {self.measurement}"