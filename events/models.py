from django.db import models
# Create your models here.


class Event(models.Model):
    name = models.CharField(max_length=100, default=None)
    description = models.TextField(max_length=300, default=None)
    location = models.CharField(max_length=100, default=None)
    event_image = models.CharField(max_length=500, default=None)
    new_event_date = models.DateField(default=None)
    distance = models.ForeignKey(
        "distances.Distance",
        related_name = "events",
        on_delete = models.CASCADE,
        default = 1
    )
    requirement = models.ForeignKey(
        "requirements.Requirement",
        related_name = "events",
        on_delete = models.CASCADE,
        default = 1
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="events",
        on_delete = models.CASCADE,
        default = 1
    )


    def __str__(self):
        return f"{self.name} - {self.distance}"