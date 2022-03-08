from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from rest_framework.exceptions import NotFound, PermissionDenied
from .models import Fav_Training
from .serializers.common import Fav_TrainingSerializer
from .serializers.populated import PopulatedFav_TrainingSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.
class Fav_TrainingListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        fav_training = Fav_Training.objects.all()
        serialized_fav_training = Fav_TrainingSerializer(fav_training, many = True)

        print('fav_training', fav_training)
        print('serialised_fav_training', serialized_fav_training)
        return Response(serialized_fav_training.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["user"] = request.user.id
        serialized_data = Fav_TrainingSerializer(data=request.data)
        print(serialized_data)
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

class Fav_TrainingDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_fav_training(self, pk):
        try:
            return Fav_Training.objects.get(pk=pk)
        except Fav_Training.DoesNotExist:
            raise NotFound(detail="Favourite training not found")

    def get(self, _request, pk):
        fav_training = self.get_fav_training(pk)
        serialized_fav_training = PopulatedFav_TrainingSerializer(fav_training)
        return Response(serialized_fav_training.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            fav_training_to_delete = self.get_fav_training(pk=pk)
            if fav_training_to_delete.user != request.user:
                raise PermissionDenied(detail="Unauthorised")
            fav_training_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Fav_Training.DoesNotExist:
            raise NotFound(detail="Favourite training not found")
        except:
            return Response({
                "detail": "Failed to delete favourite training"
            }, status=status.HTTP_401_UNAUTHORIZED)