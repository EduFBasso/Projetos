// frontend\frontend-app\src\contexts\AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { isTokenValid } from '../utils/jwtUtils';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedProf = localStorage.getItem('logged_professional');

    const tokenOK = storedToken && storedToken !== 'undefined' && storedToken.length > 10 && isTokenValid(storedToken);

    if (tokenOK && storedProf && storedProf !== 'undefined') {
      try {
        setToken(storedToken);
        const parsedProf = JSON.parse(storedProf);
        setProfessional(parsedProf);
        console.log('📦 Sessão restaurada com token válido e profissional:', parsedProf);
      } catch (error) {
        console.error('🚨 Erro ao converter logged_professional:', error);
        logout();
      }
    } else {
      console.warn('⚠️ Sessão inválida ou expirada. Limpando localStorage.');
      logout();
    }

    setIsLoading(false);
  }, []);

  const login = ({ access, professional }) => {
    if (!access || access === 'undefined') {
      console.error('❌ Tentativa de login falhou: token inválido.');
      return;
    }

    localStorage.setItem('access_token', access);
    localStorage.setItem('logged_professional', JSON.stringify(professional));

    setToken(access);
    setProfessional(professional);

    console.log('✅ Login concluído com token:', access);
    console.log('✅ Profissional autenticado:', professional);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('logged_professional');
    setToken(null);
    setProfessional(null);
    console.log('🚪 Logout efetuado e sessão encerrada.');
  };

  const isAuthenticated = Boolean(token && professional);

  return (
    <AuthContext.Provider
      value={{
        token,
        professional,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}