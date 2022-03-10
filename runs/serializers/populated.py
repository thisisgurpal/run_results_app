from .common import RunSerializer
from runners.serializers.common import RunnerSerializer
from events.serializers.common import EventSerializer

class PopulatedRunSerializer(RunSerializer):
    runner = RunnerSerializer()
    event = EventSerializer()