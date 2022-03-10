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

class RunnerDetailView(APIView):

    def get_runner(self, pk):
        try:
            return Runner.objects.get(pk=pk)
        except Runner.DoesNotExist:
            raise NotFound(detail="Runner not found")

    def get(self, _request, pk):
        runner = self.get_runner(pk)
        serialized_runner = RunnerSerializer(runner)
        return Response(serialized_runner.data, status=status.HTTP_200_OK)