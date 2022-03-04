from django.db import models
# Create your models here.


class Runner(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=300)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"