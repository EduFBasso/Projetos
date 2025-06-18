# apps\register\views.py

# from django.http import HttpResponse
from rest_framework.viewsets import ModelViewSet
from .models import Client, Professional
from .serializers import ClientSerializer, ProfessionalSerializer

# def index(request):
#     return HttpResponse("App Register funcionando!")


class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ProfessionalViewSet(ModelViewSet):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer
