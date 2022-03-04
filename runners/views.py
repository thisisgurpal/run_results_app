from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import Runner
from .serializers.common import RunnerSerializer
# Create your views here.
class RunnerListView(APIView):

    def get(self, _request):
        runners = Runner.objects.all()
        serialized_runners = RunnerSerializer(runners, many = True)

        print('runners', runners)
        print('serialised_runners', serialized_runners)
        return Response(serialized_runners.data, status=status.HTTP_200_OK)