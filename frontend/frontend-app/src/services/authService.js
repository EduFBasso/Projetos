// src/services/authService.js
import api from './api';


export const login = async (email, password) => {
  const response = await api.post('/token/', { email, password });

  const { access, professional } = response.data;

  localStorage.setItem('access_token', access);
  localStorage.setItem('logged_professional', JSON.stringify(professional));

  return { access, professional };
};