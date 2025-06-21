import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Estado que armazena todos os clientes cadastrados
  const [clients, setClients] = useState([]);

  // Estado com a lista de profissionais cadastrados
  const [professionals, setProfessionals] = useState([]);

  // Termo digitado na busca de clientes
  const [search, setSearch] = useState('');

  // Define se o profissional está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Nome do profissional selecionado
  const [professionalName, setProfessionalName] = useState('');

  // Senha digitada no campo de login
  const [password, setPassword] = useState('');

  // Busca lista de clientes e profissionais assim que o componente é montado
  useEffect(() => {
    axios.get('http://localhost:8000/register/clients/')
      .then(res => setClients(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8000/register/professionals/')
      .then(res => setProfessionals(res.data))
      .catch(err => console.error(err));
  }, []);

  // Lista de profissionais ordenada alfabeticamente pelo primeiro nome
  const sortedProfessionals = [...professionals].sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  // Lista de clientes filtrada pelo nome digitado
  const filteredClients = clients.filter(client =>
    client.first_name.toLowerCase().includes(search.toLowerCase())
  );

  // Função de login: busca o e-mail pelo nome selecionado e envia senha ao backend
  function handleLogin() {
    const selectedProfessional = professionals.find(
      prof => prof.first_name === professionalName
    );

    axios.post('http://localhost:8000/register/login/', {
      email: selectedProfessional?.email,
      password: password
    })
      .then(res => {
        setIsLoggedIn(true);
        setProfessionalName(res.data.first_name);
        console.log('Login realizado com sucesso!', res.data);
      })
      .catch(err => {
        console.error('Erro no login:', err.response?.data);
        alert('Login inválido. Verifique os dados e tente novamente.');
      });
  }

  return (
    <>
      <header className="header">
        <h1>Sistema da Clínica</h1>

        {/* Exibe formulário de login enquanto não estiver autenticado */}
        {!isLoggedIn ? (
          <div className="login-box">
            <label htmlFor="select-profissional" className="login-label">
              <span className="prof-label">👩‍⚕️ Profissionais da Clínica</span>
            </label>

            <select
              id="select-profissional"
              value={professionalName}
              onChange={e => setProfessionalName(e.target.value)}
            >
              <option value="">Selecione o profissional</option>
              {sortedProfessionals.map(prof => (
                <option key={prof.id} value={prof.first_name}>
                  {prof.first_name} {prof.last_name}
                </option>
              ))}
            </select>

            <input
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
            />

            <button
              disabled={!professionalName || !password}
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>
        ) : (
          <p className="welcome-message">Olá, Dr(a). {professionalName}</p>
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