from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from .models import Professional

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = Professional.USERNAME_FIELD

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed("Credenciais inválidas")
        if not user.is_active:
            raise AuthenticationFailed("Usuário inativo")

        refresh = self.get_token(user)

        print("Usuário autenticado:", user.email)  # 👈 Diagnóstico opcional

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "crm": user.crm,
            "specialty": user.specialty,
        }

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer