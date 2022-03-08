from rest_framework import serializers
from ..models import Fav_Training

class Fav_TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fav_Training
        fields = '__all__'
