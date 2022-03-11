from django.db import models
from django.core.validators import MaxValueValidator 
# Create your models here.


class Comment(models.Model):
    description = models.TextField(max_length=300, default=None)
    comment_image = models.CharField(max_length=500, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name = "comments",
        on_delete = models.CASCADE,
        default = 1
    )
    event = models.ForeignKey(
        "events.Event",
        related_name = "comments",
        on_delete = models.CASCADE,
        default = 1
    )

    def __str__(self):
        return f"{self.user} ({self.event})"