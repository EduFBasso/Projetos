// frontend-app/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { getClients, getClientsByName } from '../services/clientService';

function HomePage() {
  const { professional: loggedProfessional, token, isLoading } = useAuth();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('clientes');

  const isLoggedIn = Boolean(loggedProfessional && token);

  useEffect(() => {
    // Evita buscar se ainda estiver carregando ou não autenticado
    if (isLoading || !isLoggedIn || activeTab !== 'clientes') return;

    getClients(token)
      .then(data => setClients(data))
      .catch(err => console.error('Erro ao buscar clientes:', err));
  }, [isLoggedIn, activeTab, token, isLoading]);

  // Filtro de clientes conforme texto digitado na busca
  const filteredClients = clients.filter(client =>
    client.first_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header com login embutido */}
      <Header title="Sistema da Clínica" />

      {/* Área principal da página */}
      <main className="container">
        {/* Menu de navegação das abas */}
        <nav className="menu">
          <button onClick={() => setActiveTab('clientes')} disabled={!isLoggedIn}>
            Clientes
          </button>
          <button onClick={() => setActiveTab('agendar')} disabled={!isLoggedIn}>
            Agendar
          </button>
          <button onClick={() => setActiveTab('consultas')} disabled={!isLoggedIn}>
            Consultas
          </button>
        </nav>

        {/* Aba: Clientes */}
        {activeTab === 'clientes' && isLoggedIn && (
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
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <li key={client.id} className="client-card">
                    <p><strong>👤 {client.first_name} {client.last_name}</strong></p>
                    <p>📞 {client.phone}</p>
                    <p>✉️ <a href={`mailto:${client.email}`}>{client.email}</a></p>
                    <p>🟢 <a href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></p>
                    <p>📍 {client.city} / {client.state}</p>
                  </li>
                ))
              ) : (
                <li>Nenhum cliente encontrado.</li>
              )}
            </ul>
          </div>
        )}

        {/* Aba: Agendar */}
        {activeTab === 'agendar' && isLoggedIn && (
          <section>
            <h2>📅 Agendar Consulta</h2>
            <p>(Funcionalidade em construção)</p>
          </section>
        )}

        {/* Aba: Consultas */}
        {activeTab === 'consultas' && isLoggedIn && (
          <section>
            <h2>📋 Consultas</h2>
            <p>(Funcionalidade em construção)</p>
          </section>
        )}
      </main>
    </>
  );
}

export default HomePage;