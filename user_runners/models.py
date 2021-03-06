from django.db import models
# Create your models here.


class User_Runner(models.Model):
    users = models.ForeignKey( # ManyToMany field
        "jwt_auth.User",
        related_name = "user_runners",
        on_delete = models.CASCADE,
        default = 1
    )
    runners = models.ForeignKey( # ManyToMany field
        "runners.Runner",
        related_name = "user_runners",
        on_delete = models.CASCADE,
        default = 1
    )

    def __str__(self):
        return f"{self.users} - {self.runners}"