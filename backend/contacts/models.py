from django.db import models
from companies.models import Company
from organizations.models import Organization


class Contact(models.Model):

    full_name = models.CharField(max_length=255)

    email = models.EmailField()

    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    role = models.CharField(max_length=255)

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="contacts"
    )

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="contacts"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    is_deleted = models.BooleanField(default=False)

    class Meta:
        unique_together = ["email", "company"]

    def __str__(self):
        return self.full_name