from django.db import models
from django.conf import settings


class ActivityLog(models.Model):

    ACTION_CHOICES = [
        ("CREATE", "Create"),
        ("UPDATE", "Update"),
        ("DELETE", "Delete"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=10,
        choices=ACTION_CHOICES
    )

    model_name = models.CharField(max_length=100)

    object_id = models.IntegerField()

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action}"