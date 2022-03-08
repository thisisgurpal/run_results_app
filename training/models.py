from django.db import models
# Create your models here.


class Training(models.Model):
    title = models.CharField(max_length=100, default=None)
    description = models.TextField(max_length=300, default=None)
    training_image = models.CharField(max_length=500, default=None)
    training_type = models.CharField(max_length=100, default=None, choices=[('strength', 'strength'), ('endurance', 'endurance'), ('nutrition', 'nutrition')])
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="training",
        on_delete = models.CASCADE,
        default = 1
    )


    def __str__(self):
        return f"{self.title} - {self.training_type}"