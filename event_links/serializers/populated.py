from .common import Event_LinkSerializer
from events.serializers.common import EventSerializer

class PopulatedEvent_LinkSerializer(Event_LinkSerializer):
    event = EventSerializer()