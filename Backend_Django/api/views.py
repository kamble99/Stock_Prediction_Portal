from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import StockSerializer
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
from sklearn.metrics import mean_squared_error,r2_score


@method_decorator(csrf_exempt, name="dispatch")
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            #fetch the data from yfinance
            now = datetime.now()

            start = datetime(now.year-10,now.month,now.day)
            end = now
            df = yf.download(ticker, start, end)
            print(df)
            if df.empty:
                return Response({"error":"No data found for the given ticker",'status':status.HTTP_404_NOT_FOUND})
            df=df.reset_index()
            #generate plot's
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close)
            plt.title(f"Closing price of {ticker}")
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            #save plot to file
            plot_img_path=f'{ticker}_plot.png'
            plot_image=save_plot(plot_img_path)
            # 100 days moving average
            ma100= df['MA_100'] = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close)
            plt.plot(ma100,'r',label='100 DMA')
            plt.title(f"100 days of {ticker}")
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            plot_img_path=f'{ticker}_100_DMA_plot.png'
            plot_100_DMA=save_plot(plot_img_path)

            # 200 dma
            ma200= df['MA_200']=df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close)
            plt.plot(ma100,'r',label='200 DMA')
            plt.title(f"200 days of {ticker}")
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            plot_img_path=f'{ticker}_200_DMA_plot.png'
            plot_200_DMA=save_plot(plot_img_path)

            #splitting data into training & testing datasets
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[0:int(len(df)*0.7) : int(len(df))])

            #Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))  # you can adjust the range

            #load ml model
            model=load_model('Stock_Prediction_model.keras')

            #preparing test data
            past_100_days=data_training.tail(100)
            final_df=pd.concat([past_100_days,data_testing],ignore_index=True)
            input_data= scaler.fit_transform(final_df)
            x_test=[]
            y_test=[]
            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i,0])
            x_test,y_test=np.array(x_test),np.array(y_test)

            # Making prediction
            y_predict = model.predict(x_test)

            # Revert scaled price to original
            y_predict = scaler.inverse_transform(y_predict.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            # Plot final prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(y_test, 'b', label='Original Price')
            plt.plot(y_predict, 'r', label='Predicted Price')
            plt.title(f"Final prediction {ticker}")
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction_plot.png'
            plot_prediction = save_plot(plot_img_path)

            #Model evalution
            #Mean Square Error(MSE)
            mse=mean_squared_error(y_test,y_predict)

            #Root Mean Squared Error(RMSE)
            rmse=np.sqrt(mse)

            #R-squared
            r2=r2_score(y_test,y_predict)



        return Response({
                    "status": "success",
                    "plot_image": plot_image,
                    "plot_100_DMA": plot_100_DMA,
                    "plot_200_DMA": plot_200_DMA,
                    "plot_prediction":plot_prediction,
                    "mse":mse,
                    "rmse":rmse,
                    "r2":r2,


                     
                        })

        return Response(serializer.errors, status=400)
