from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.db import IntegrityError

from .models import Event
from .serializers.common import EventSerializer
from .serializers.populated import PopulatedEventSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class EventListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        events = Event.objects.all()
        serialized_events = PopulatedEventSerializer(events, many = True)

        print('events', events)
        print('serialised_events', serialized_events)
        return Response(serialized_events.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        serialized_data = EventSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(
                { "detail": "Unprocessable Entity" },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

class EventDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_event(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise NotFound(detail="Event not found")

    def get(self, _request, pk):
        event = self.get_event(pk)
        serialized_event = PopulatedEventSerializer(event)
        return Response(serialized_event.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            event_to_delete = self.get_event(pk=pk)
            if event_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            event_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Event.DoesNotExist:
            raise NotFound(detail="Event not found")
        except:
            return Response({
                "detail": "Failed to delete Event"
            }, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk):
        try:
            event_to_update = self.get_event(pk=pk)
            if event_to_update.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            serialized_event = EventSerializer(event_to_update, data=request.data)
            serialized_event.is_valid()
            serialized_event.save()
            return Response(serialized_event.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY) 