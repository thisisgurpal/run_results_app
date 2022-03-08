from ast import Try
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import Comment
from .serializers.common import CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied

# Create your views here.
class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        comments = Comment.objects.all()
        serialized_comments = CommentSerializer(comments, many = True)

        print('comments', comments)
        print('serialised_comments', serialized_comments)
        return Response(serialized_comments.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["user"] = request.user.id
        serialized_data = CommentSerializer(data=request.data)
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

class CommentDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")

    def get(self, _request, pk):
        comment = self.get_comment(pk)
        serialized_comment = CommentSerializer(comment)
        return Response(serialized_comment.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            comment_to_delete = self.get_comment(pk=pk)
            if comment_to_delete.user != request.user:
                raise PermissionDenied(detail="Unauthorised")
            comment_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")
        except:
            return Response({
                "detail": "Failed to delete Comment"
            }, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk):
        try:
            comment_to_update = self.get_comment(pk=pk)
            if comment_to_update.user != request.user:
                raise PermissionDenied(detail="Unauthorised")
            serialized_comment = CommentSerializer(comment_to_update, data=request.data)
            serialized_comment.is_valid()
            serialized_comment.save()
            return Response(serialized_comment.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY) 