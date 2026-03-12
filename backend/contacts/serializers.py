from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ["organization", "created_at"]

    def validate_phone(self, value):

        if value and not value.isdigit():
            raise serializers.ValidationError(
                "Phone must contain only numbers."
            )

        if value and not (8 <= len(value) <= 15):
            raise serializers.ValidationError(
                "Phone must be between 8 and 15 digits."
            )

        return value