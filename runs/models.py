from django.db import models
from django.core.validators import MaxValueValidator 
# Create your models here.


class Run(models.Model):
    days = models.PositiveIntegerField(default=None)
    hours = models.PositiveIntegerField(default=None)
    minutes = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(60, 'enter correct value for minutes')])
    seconds = models.PositiveIntegerField(default=None, validators=[MaxValueValidator(60, 'enter correct value for minutes')])
    position = models.CharField(max_length=300)
    country = models.CharField(max_length=300)
    year = models.PositiveIntegerField(default=None)
    runner = models.ForeignKey(
        "runners.Runner",
        related_name = "runs",
        on_delete = models.CASCADE,
        default = 1
    )
    event = models.ForeignKey(
        "events.Event",
        related_name = "runs",
        on_delete = models.CASCADE,
        default = 1
    )

    def __str__(self):
        return f"{self.runner} ({self.event}) => {self.position}th"