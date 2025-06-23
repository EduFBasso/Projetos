# --- Importações locais do app ---
from .models import Client, Professional
from .serializers import ClientSerializer, ProfessionalSerializer

# --- Importações do Django REST Framework ---
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# --- Módulos auxiliares do Django ---
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

# --- ViewSets para API REST ---

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Client.objects.filter(prof_id=user)

        nome = self.request.query_params.get('nome')
        if nome:
            queryset = queryset.filter(first_name__icontains=nome)

        return queryset

class ProfessionalViewSet(ModelViewSet):
    """Permite visualizar ou editar profissionais."""
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer
    permission_classes = [IsAuthenticated]

# --- Autenticação de profissional via e-mail e senha ---
@csrf_exempt
@api_view(['POST'])
def login_professional(request):
    """
    Realiza login do profissional via e-mail e senha.
    Retorna dados básicos se as credenciais forem válidas.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if user:
        return Response({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'crm': user.crm,
            'specialty': user.specialty
        })
    
    return Response({'error': 'Credenciais inválidas'}, status=401)
