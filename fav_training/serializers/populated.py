from .common import Fav_TrainingSerializer # import existing "generic" serializer, as we want to extend it
from training.serializers.common import TrainingSerializer # bring in review serializer as we want to use it as the value for the reviews field

# Serializers
class PopulatedFav_TrainingSerializer(Fav_TrainingSerializer):
    # No meta class this time as we're inheriting it from the FesitvalSerializer
    training = TrainingSerializer()