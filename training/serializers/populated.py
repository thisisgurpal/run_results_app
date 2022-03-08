from .common import TrainingSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedTrainingSerializer(TrainingSerializer):
    owner = UserSerializer()