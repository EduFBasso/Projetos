# Importações locais do app
from .models import Client, Professional
from .serializers import ClientSerializer, ProfessionalSerializer

# Importações do Django REST Framework
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Módulo de autenticação do Django
from django.contrib.auth import authenticate

# --- ViewSets para API REST ---

class ClientViewSet(ModelViewSet):
    """
    API endpoint que permite visualizar ou editar clientes.
    """
    serializer_class = ClientSerializer

    def get_queryset(self):
        queryset = Client.objects.all()
        professional_id = self.request.query_params.get('professional_id')

        if professional_id:
            queryset = queryset.filter(prof_id=professional_id)

        return queryset
    

class ProfessionalViewSet(ModelViewSet):
    """
    API endpoint que permite visualizar ou editar profissionais.
    """
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer

# --- Autenticação de profissional via e-mail e senha ---

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
