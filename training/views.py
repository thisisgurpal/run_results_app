from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.db import IntegrityError

from .models import Training
from .serializers.common import TrainingSerializer
from .serializers.populated import PopulatedTrainingSerializer

# Create your views here.
class TrainingListView(APIView):

    def get(self, _request):
        training = Training.objects.all()
        serialized_training = PopulatedTrainingSerializer(training, many = True)

        print('training', training)
        print('serialised_training', serialized_training)
        return Response(serialized_training.data, status=status.HTTP_200_OK)

class TrainingDetailView(APIView):

    def get_training(self, pk):
        try:
            return Training.objects.get(pk=pk)
        except Training.DoesNotExist:
            raise NotFound(detail="Training not found")

    def get(self, _request, pk):
        training = self.get_training(pk)
        serialized_training = PopulatedTrainingSerializer(training)
        return Response(serialized_training.data, status=status.HTTP_200_OK)