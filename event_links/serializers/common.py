from rest_framework import serializers
from ..models import Event_Link

class Event_LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Link
        fields = '__all__'
