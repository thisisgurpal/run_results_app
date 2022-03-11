from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.db import IntegrityError

from .models import Event_Link
from .serializers.common import Event_LinkSerializer
from .serializers.populated import PopulatedEvent_LinkSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class Event_LinkListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        event_links = Event_Link.objects.all()
        serialized_event_links = PopulatedEvent_LinkSerializer(event_links, many = True)

        print('event_links', event_links)
        print('serialised_event_links', serialized_event_links)
        return Response(serialized_event_links.data, status=status.HTTP_200_OK)