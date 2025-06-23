import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedProfessional, setLoggedProfessional] = useState(null);
  const [search, setSearch] = useState('');

  const sortedProfessionals = [...professionals].sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  const filteredClients = clients.filter(client =>
    client.first_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios.get('/register/professionals/')
      .then(res => setProfessionals(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (isLoggedIn && loggedProfessional) {
      axios.get(`/register/clients/?professional_id=${loggedProfessional.id}`)
        .then(res => setClients(res.data))
        .catch(err => console.error('Erro ao buscar clientes:', err));
    }
  }, [isLoggedIn, loggedProfessional]);

  function handleLogin() {
    const selectedProfessional = professionals.find(
      prof => prof.id === parseInt(selectedProfessionalId)
    );
    if (!selectedProfessional) return;

    axios.post('/register/login/', {
      email: selectedProfessional.email,
      password: password
    })
      .then(() => {
        setIsLoggedIn(true);
        setLoggedProfessional(selectedProfessional);
        setSelectedProfessionalId('');
        setPassword('');
      })
      .catch(err => {
        console.error('Erro no login:', err.response?.data);
        alert('Login inválido. Verifique os dados e tente novamente.');
      });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setLoggedProfessional(null);
    setClients([]);
    setPassword('');
    setSelectedProfessionalId('');
    setSearch('');
  }

  return (
    <>
      <header className="header">
        <h1>Sistema da Clínica</h1>

        {!isLoggedIn ? (
          <div className="login-box">
            <label htmlFor="select-profissional" className="login-label">
              <span className="prof-label">👩‍⚕️ Profissionais da Clínica</span>
            </label>

            <select
              id="select-profissional"
              value={selectedProfessionalId}
              onChange={e => setSelectedProfessionalId(e.target.value)}
            >
              <option value="">Selecione o profissional</option>
              {sortedProfessionals.map(prof => (
                <option key={prof.id} value={prof.id}>
                  Dr(a). {prof.first_name} — CRM/COP {prof.crm} — {prof.category || prof.specialty}
                </option>
              ))}
            </select>

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              disabled={!selectedProfessionalId || !password}
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>
        ) : (
          <div className="welcome-box">
            <p className="welcome-message">
              Olá, Dr(a). {loggedProfessional.first_name} — CRM/COP {loggedProfessional.crm} — {loggedProfessional.category || loggedProfessional.specialty}
            </p>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        )}
      </header>

      <main className="container">
        <nav className="menu">
          <button disabled={!isLoggedIn}>Clientes</button>
          <button disabled={!isLoggedIn}>Agendar</button>
          <button disabled={!isLoggedIn}>Consultas</button>
        </nav>

        <div className="search-section">
          <h2>👥 Clientes Cadastrados</h2>

          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-box"
          />

          <ul className="client-list">
            {filteredClients.map(client => (
              <li key={client.id}>
                <strong>{client.first_name}</strong> ({client.email}) — {client.city}/{client.state}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;