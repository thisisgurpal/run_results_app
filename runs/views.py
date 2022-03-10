from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import Run
from .serializers.common import RunSerializer
from .serializers.populated import PopulatedRunSerializer
# Create your views here.
class RunListView(APIView):

    def get(self, _request):
        runs = Run.objects.all()
        serialized_runs = PopulatedRunSerializer(runs, many = True)

        print('runs', runs)
        print('serialised_runs', serialized_runs)
        return Response(serialized_runs.data, status=status.HTTP_200_OK)