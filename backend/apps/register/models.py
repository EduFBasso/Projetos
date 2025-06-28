# backend\apps\register\models.py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class Client(models.Model):
    first_name = models.CharField("Primeiro nome", max_length=100)
    last_name = models.CharField("Sobrenome", max_length=100)
    city = models.CharField("Cidade", max_length=100)
    state = models.CharField("Estado", max_length=2)
    phone = models.CharField("Telefone", max_length=20)
    email = models.EmailField("E-mail", unique=True)
    created_at = models.DateTimeField("Criado em", auto_now_add=True)
    prof_id = models.ForeignKey('Professional', on_delete=models.CASCADE, related_name='clients')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class ProfessionalManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('E-mail é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class Professional(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField("Nome", max_length=50)
    last_name = models.CharField("Sobrenome", max_length=50)
    crm = models.CharField("Registro Profissional", max_length=20, unique=True)
    specialty = models.CharField("Especialidade", max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = ProfessionalManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
