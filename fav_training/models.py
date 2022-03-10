from django.db import models
# Create your models here.


class Fav_Training(models.Model):
    user = models.ForeignKey( # ManyToMany field
        "jwt_auth.User",
        related_name = "fav_training",
        on_delete = models.CASCADE,
        default = 1
    )
    training = models.ForeignKey( # ManyToMany field
        "training.Training",
        related_name = "fav_training",
        on_delete = models.CASCADE,
        default = 1
    )

    def __str__(self):
        return f"{self.user} - {self.training}"