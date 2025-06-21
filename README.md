## 📁 Estrutura do Backend (Django)

```
backend/
├── apps/
│   └── register/
│       ├── migrations/
│       │   └── __init__.py
│       ├── admin.py           # Configuração do Django Admin
│       ├── apps.py            # Registro da app
│       ├── models.py          # Modelos de dados
│       ├── serializers.py     # Serialização para API REST
│       ├── tests.py           # Testes automatizados
│       ├── urls.py            # Rotas da app
│       └── views.py           # Lógica de requisição e resposta
├── clinic_project/
│   ├── __init__.py
│   ├── settings.py            # Configurações globais do Django
│   ├── urls.py                # Rotas raiz do projeto
│   ├── wsgi.py                # Interface WSGI para produção
│   └── asgi.py                # Interface ASGI para deploy assíncrono
├── venv/                      # Ambiente virtual (🔒 ignorado pelo Git)
├── manage.py                  # Comando de gerenciamento do Django
├── .gitignore                 # Ignora arquivos como venv, .env, etc.
└── README.md                  # Documentação local do backend
```


📌 **Observações**:
- O `apps/register/` é a principal app da clínica com controle de clientes e profissionais.
- A pasta `clinic_project/` representa o núcleo das configurações do Django.
- A `venv/` está dentro de `backend/`.

✨ Tudo isso integrado com o `frontend/`, usando APIs e Axios para conectar o React ao Django.



## 💻 Estrutura do Frontend (React + Vite)

```
frontend/
└── frontend-app/
    ├── public/
    │   └── index.html           # Estrutura HTML base da aplicação
    ├── src/
    │   ├── assets/              # Imagens, ícones e estilos globais
    │   ├── components/          # Componentes reutilizáveis
    │   │   ├── ClientForm.jsx   # Formulário para registro de cliente
    │   │   ├── ClientList.jsx   # Listagem de clientes
    │   ├── App.jsx              # Componente principal da aplicação
    │   ├── main.jsx             # Ponto de entrada que monta o React na DOM
    │   ├── App.css              # Estilo principal da aplicação
    │   ├── index.css            # Estilo base/global
    ├── .gitignore               # Ignora node_modules, .env e outros
    ├── eslint.config.js        # Regras de lint (qualidade de código)
    ├── package.json             # Dependências e scripts NPM
    ├── package-lock.json        # Versões exatas das dependências
    └── vite.config.js           # Configurações do Vite (inclui proxy)
```

📌 **Observações**:
- O projeto é gerenciado com **Vite**: inicialização mais rápida, proxy para o backend e suporte nativo a React.
- A pasta `src/components/` armazena os elementos visuais conectados à API Django via Axios.
- As rotas e lógica de API ficam encapsuladas dentro dos próprios componentes (`ClientForm.jsx`, `ClientList.jsx`).

🔌 O `vite.config.js` garante que chamadas para `/register/` sejam redirecionadas para `localhost:8000`, fazendo a ponte com o backend sem CORS:

```js
server: {
  proxy: {
    '/register': 'http://localhost:8000'
  }
}
```

## frontend/
└── frontend-app/
    ├── public/
    │   └── index.html           # Estrutura HTML base da aplicação
    ├── src/
    │   ├── assets/              # Ícones, imagens e estilos visuais
    │   ├── components/          # Componentes React reutilizáveis
    │   │   ├── ClientForm.jsx   # Formulário de criação de clientes
    │   │   └── ClientList.jsx   # Lista dinâmica de clientes
    │   ├── App.jsx              # Componente raiz (layout e rotas)
    │   ├── App.css              # Estilos principais do app
    │   ├── index.css            # Estilos base e resets
    │   └── main.jsx             # Ponto de entrada do React DOM
    ├── .gitignore               # Ignora node_modules, .env, etc.
    ├── eslint.config.js         # Regras de qualidade e lint
    ├── package.json             # Dependências e scripts NPM
    ├── package-lock.json        # Lockfile com versões exatas
    └── vite.config.js           # Configurações do Vite (inclui proxy para backend)
