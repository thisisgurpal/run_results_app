from .common import UserSerializer
from user_runners.serializers.populated import PopulatedUser_RunnerSerializer

# Serializers
class PopulatedUserSerializer(UserSerializer):
    user_runners = PopulatedUser_RunnerSerializer(many=True)