// frontend\frontend-app\src\pages\LoginPage.jsx
import React, { useEffect, useState } from 'react';
import { getProfessionals } from '../services/clientService';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getProfessionals()
      .then(data => setProfessionals(data))
      .catch(err => console.error('Erro ao carregar profissionais:', err));
  }, []);

  function handleSubmit(e) {
  e.preventDefault();

  const selected = professionals.find(
    (p) => p.id === parseInt(selectedProfessionalId)
  );
  if (!selected) return;

  loginService(selected.email, password)
    .then((data) => {
      console.log('🔑 Dados recebidos do backend:', data);
      console.log('🧾 access recebido do backend:', data.access);
      console.log('🧾 professional recebido do backend:', data.professional);

      login(data); // Garante { access, professional }
      window.location.reload(); // Só depois dos logs
    })
    .catch((err) => {
      console.error('❌ Erro no login:', err.response?.data || err.message);
      alert('Login inválido. Verifique os dados e tente novamente.');
    });
  }

  return (
    <div className="login-page">
      <h2>🔐 Acesso Profissional</h2>
      <form onSubmit={handleSubmit} className="login-box">
        <label>
          Profissional:
          <select
            value={selectedProfessionalId}
            onChange={e => setSelectedProfessionalId(e.target.value)}
          >
            <option value="">Selecione</option>
            {Array.isArray(professionals)&&professionals.map(prof => (
              <option key={prof.id} value={prof.id}>
                Dr(a). {prof.first_name} — CRM/COP {prof.crm} — {prof.category || prof.specialty}
              </option>
            ))}
          </select>
        </label>

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={!selectedProfessionalId || !password}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;