from .common import User_RunnerSerializer # import existing "generic" serializer, as we want to extend it
from jwt_auth.serializers.common import UserSerializer # bring in review serializer as we want to use it as the value for the reviews field
from runners.serializers.common import RunnerSerializer

# Serializers
class PopulatedUser_RunnerSerializer(User_RunnerSerializer):
    # No meta class this time as we're inheriting it from the FesitvalSerializer
    runners = RunnerSerializer()