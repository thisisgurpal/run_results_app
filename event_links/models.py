from django.db import models
# Create your models here.


class Event_Link(models.Model):
    link1 = models.CharField(max_length=100, default=None)
    link2 = models.CharField(max_length=100, default=None)
    link3 = models.CharField(max_length=100, default=None)
    link4 = models.CharField(max_length=100, default=None)
    link5 = models.CharField(max_length=100, default=None)
    event = models.ForeignKey(
        "events.Event",
        related_name = "event_links",
        on_delete = models.CASCADE,
        default = 1
    )


    def __str__(self):
        return f"{self.event}"