
from rest_framework import serializers

class StockSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=20, allow_blank=False, trim_whitespace=True)
