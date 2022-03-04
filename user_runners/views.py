from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import User_Runner
from .serializers.common import User_RunnerSerializer
from .serializers.populated import PopulatedUser_RunnerSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.
class User_RunnerListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        user_runner = User_Runner.objects.all()
        serialized_user_runner = User_RunnerSerializer(user_runner, many = True)

        print('user_runner', user_runner)
        print('serialised_user_runner', serialized_user_runner)
        return Response(serialized_user_runner.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["users"] = request.user.id
        serialized_data = User_RunnerSerializer(data=request.data)
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