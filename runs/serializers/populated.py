from .common import RunSerializer
from runners.serializers.common import RunnerSerializer

class PopulatedRunSerializer(RunSerializer):
    runner = RunnerSerializer()