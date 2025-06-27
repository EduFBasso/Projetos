// src/services/api.js
import axios from 'axios';

// Cria uma instância base do axios com URL do backend
const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Interceptor de requisição: inclui token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token && token !== 'undefined' && token.length > 10) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de resposta: trata erros como 401 (token inválido/expirado)
api.interceptors.response.use(
  (response) => response, // Requisição OK: apenas retorna
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('⚠️ Token expirado ou inválido. Fazendo logout automático...');

      localStorage.removeItem('access_token');

      // Recarrega a página para limpar estado visual
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;