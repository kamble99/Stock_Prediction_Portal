from django.urls import path
from accounts import views as Userviews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import StockPredictionAPIView

urlpatterns=[
    path('register/',Userviews.Registerview.as_view()),
    #tokens
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected-view/',Userviews.ProtectedView.as_view()),
    #API Prediction 
    path('predict/', StockPredictionAPIView.as_view(), name='stock_prediction')


]