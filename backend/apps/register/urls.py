# urls do app register
# backend\apps\register\urls.py

from django.urls import path, include
from .views import login_professional
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, ProfessionalViewSet

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'professionals', ProfessionalViewSet)

urlpatterns = [
    path('login/', login_professional),
    path('', include(router.urls)),
]
