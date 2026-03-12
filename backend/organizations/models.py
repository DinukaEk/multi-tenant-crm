from django.db import models


class Organization(models.Model):

    PLAN_CHOICES = [
        ("BASIC", "Basic"),
        ("PRO", "Pro"),
    ]

    name = models.CharField(max_length=255, unique=True)

    subscription_plan = models.CharField(
        max_length=10,
        choices=PLAN_CHOICES,
        default="BASIC"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name