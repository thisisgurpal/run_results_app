from .common import UserSerializer
from user_runners.serializers.populated import PopulatedUser_RunnerSerializer
from fav_training.serializers.populated import PopulatedFav_TrainingSerializer
from comments.serializers.common import CommentSerializer

# Serializers
class PopulatedUserSerializer(UserSerializer):
    user_runners = PopulatedUser_RunnerSerializer(many=True)
    fav_training = PopulatedFav_TrainingSerializer(many=True)
    comments = CommentSerializer(many=True)