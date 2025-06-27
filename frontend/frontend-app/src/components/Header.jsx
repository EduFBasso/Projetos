// frontend-app/src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { getProfessionals } from '../services/clientService';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

function Header({ title }) {
  // Acesso ao contexto de autenticação
  const { professional, login, logout, isAuthenticated } = useAuth();

  // Estado para exibir lista de profissionais no login (antes do login)
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('');
  const [password, setPassword] = useState('');

  // Carrega os profissionais assim que o componente é montado
  useEffect(() => {
    getProfessionals()
      .then(res => setProfessionals(res.data))
      .catch(err => console.error('Erro ao carregar profissionais:', err));
  }, []);

  // Envia o login ao backend quando o usuário escolhe um profissional e digita a senha
  const handleLogin = (e) => {
    e.preventDefault();

    const selected = professionals.find(
      (p) => p.id === parseInt(selectedProfessionalId)
    );
    if (!selected) return;

    loginService(selected.email, password)
      .then((data) => {
        login(data); // Envia dados ao contexto global
        setPassword(''); // Limpa o campo de senha
      })
      .catch((err) => {
        console.error('Erro no login:', err.response?.data || err.message);
        alert('Login inválido. Verifique os dados.');
      });
  };

  return (
    <header className="header">
      {/* Lado esquerdo fixo com título */}
      <div className="header-left">
        <h1>{title || 'Sistema da Clínica'}</h1>
      </div>

      {/* Lado direito: renderização condicional de login ou saudação */}
      <div className="header-right">
        {isAuthenticated ? (
          <>
            {/* Saudação com dados do profissional logado */}
            <p className="welcome-message">
              <strong>
                Olá, Dr(a). {professional.first_name} — CRM {professional.crm} — {professional.category || professional.specialty}
              </strong>
            </p>
            <button onClick={logout} className="button">Sair</button>
          </>
        ) : (
          <form onSubmit={handleLogin} className="login-box">
            {/* Dropdown para selecionar profissional */}
            <select
              value={selectedProfessionalId}
              onChange={e => setSelectedProfessionalId(e.target.value)}
              required
            >
              <option value="">Profissional</option>
              {professionals.map(prof => (
                <option key={prof.id} value={prof.id}>
                  Dr(a). {prof.first_name} — {prof.crm}
                </option>
              ))}
            </select>

            {/* Campo de senha */}
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {/* Botão de login */}
            <button
              type="submit"
              className="button"
              disabled={!selectedProfessionalId || !password}
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </header>
  );
}

export default Header;