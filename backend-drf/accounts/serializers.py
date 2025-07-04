from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,style={'input_type':'password'})
    class Meta:
        model = User
        fields = ['username','first_name','last_name', 'email','password']

        #member function
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user
