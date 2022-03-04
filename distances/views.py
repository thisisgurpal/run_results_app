from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import Distance
from .serializers.common import DistanceSerializer
# Create your views here.
class DistanceListView(APIView):

    def get(self, _request):
        distances = Distance.objects.all()
        serialized_distances = DistanceSerializer(distances, many = True)

        print('distances', distances)
        print('serialised_distances', serialized_distances)
        return Response(serialized_distances.data, status=status.HTTP_200_OK)
