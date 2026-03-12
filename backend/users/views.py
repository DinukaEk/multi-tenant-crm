from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import RegisterUserSerializer


class RegisterUserView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        if request.user.role != "ADMIN":
            return Response(
                {"error": "Only admin can create users"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer