from os import stat
from urllib import response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import PermissionDenied
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from .serializers.common import UserSerializer
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticated
from .serializers.populated import PopulatedUserSerializer
User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except:
            return Response("Failed to create user", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    def post(self, request):
        print(request.data)
        try:
            user_to_login = User.objects.get(email=request.data.get('email'))
        except User.DoesNotExist:
            return PermissionDenied(detail="Unauthorised")

        if not user_to_login.check_password(request.data.get('password')):
            return PermissionDenied(detail="Unauthorised")

        dt = datetime.now() + timedelta(days=7)

        print('DT--->', int(dt.strftime('%s')))

        token = jwt.encode({
            'sub': user_to_login.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, 'HS256')
        print('token --->', token)

        return Response({
            'token': token,
            'message': f"Welcome back {user_to_login.first_name}"
        }, status.HTTP_202_ACCEPTED)

class LoggedInProfileView(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

    def get(self, request):
        print('request', request.user)
        user = self.get_user(pk=request.user.id)
        serialized_user = PopulatedUserSerializer(user)
        print('userrrr', serialized_user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

class ProfileView(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user)
        print('user', serialized_user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user_to_update = self.get_user(pk=pk)
        print('user_to_update', user_to_update)
        serialized_user = UserSerializer(user_to_update, data=request.data, partial=True)
        print('serialized_user', serialized_user)
        print('request.data', request.data)
        try:
            serialized_user.is_valid()
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)