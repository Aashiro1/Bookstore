from rest_framework import generics
from .models import Book, CustomUser
from .serializers import BookSerializer, CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group


class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
 


# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }





class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Assign user to a role group (default to "User")
            role = request.data.get("role", "User")  # Default role: "User"
            group, created = Group.objects.get_or_create(name=role)
            user.groups.add(group)

            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "role": role,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   





# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(username=username, password=password)
#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)

#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)

            # Determine user role
            role = "User"
            if user.groups.filter(name="Admin").exists():
                role = "Admin"

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": role,  # Include user role
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    



class UserRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = "User"

        if user.groups.filter(name="Admin").exists():
            role = "Admin"

        return Response({"role": role}, status=status.HTTP_200_OK)



