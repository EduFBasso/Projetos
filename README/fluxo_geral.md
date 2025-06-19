# 📍 Fluxo Geral: Da URL ao Navegador

Este documento descreve a rota completa da requisição até a renderização no navegador do sistema da clínica.

---

## 🔗 1. Rota de Backend (urls.py - Django)

Arquivo: `backend/core/urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path('register/clients/', views.register_client),
    path('register/clients/', views.list_clients),
]
```

- Rota exposta