# backend\teste.py
import requests

# Configurações
base_url = "http://127.0.0.1:8000"
login_url = f"{base_url}/token/"
clientes_url = f"{base_url}/register/clients/"

# Credenciais reais (ajuste conforme seu usuário no banco)
payload = {
    "email": "teste@example.com",
    "password": "senha123"
}

# 1. Login → Obtenção do token
resp_login = requests.post(login_url, json=payload)
if resp_login.status_code == 200:
    tokens = resp_login.json()
    access_token = tokens.get("access")
    print("✅ Token obtido com sucesso")
else:
    print("❌ Erro ao fazer login:", resp_login.status_code, resp_login.text)
    exit()

# 2. Acesso à rota protegida com o token
headers = {
    "Authorization": f"Bearer {access_token}"
}

resp_clientes = requests.get(clientes_url, headers=headers)

if resp_clientes.status_code == 200:
    print("📋 Lista de clientes:")
    print(resp_clientes.json())
else:
    print("🚫 Erro ao acessar clientes:", resp_clientes.status_code)
    print(resp_clientes.text)
    