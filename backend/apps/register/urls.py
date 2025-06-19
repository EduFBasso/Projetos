# backend\apps\register\urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, ProfessionalViewSet

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'professionals', ProfessionalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
