from django.urls import path
from accounts import views as Userview

urlpatterns=[
    path('register/',Userview.RegisterView.as_view()),
]