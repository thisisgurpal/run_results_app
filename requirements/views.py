from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import Requirement
from .serializers.common import RequirementSerializer
# Create your views here.
class RequirementListView(APIView):

    def get(self, _request):
        requirements = Requirement.objects.all()
        serialized_requirements = RequirementSerializer(requirements, many = True)

        print('requirements', requirements)
        print('serialised_requirements', serialized_requirements)
        return Response(serialized_requirements.data, status=status.HTTP_200_OK)
