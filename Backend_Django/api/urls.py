from django.urls import path
from accounts import views as Userviews

urlpatterns=[
    path('register/',Userviews.Registerview.as_view()),
]