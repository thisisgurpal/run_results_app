from rest_framework import serializers
from ..models import User_Runner

class User_RunnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Runner
        fields = '__all__'
