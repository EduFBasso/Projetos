# backend\apps\register\views.py

from rest_framework.viewsets import ModelViewSet
from .models import Client, Professional
from .serializers import ClientSerializer, ProfessionalSerializer


class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ProfessionalViewSet(ModelViewSet):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer
