from .common import EventSerializer
from distances.serializers.common import DistanceSerializer
from requirements.serializers.common import RequirementSerializer
from runs.serializers.populated import PopulatedRunSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedEventSerializer(EventSerializer):
    distance = DistanceSerializer()
    requirement = RequirementSerializer()
    runs = PopulatedRunSerializer(many=True)
    owner = UserSerializer()