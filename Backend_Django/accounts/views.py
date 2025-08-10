from django.shortcuts import render
from django.http import HttpResponse
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class Registerview(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated] #when pass the isAuthenticated inside the permission classes the view will only be accessible to authenticated users

    def get(self,request):
        response={
            'status':'Request was permitted'
        }
        return Response(response)
# Create your views here.
