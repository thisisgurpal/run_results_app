from rest_framework import serializers
from ..models import Distance

class DistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distance
        fields = '__all__'
