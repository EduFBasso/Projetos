// frontend\frontend-app\src\components\ClientList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientList() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/register/clients/')
      .then((response) => setClientes(response.data))
      .catch((error) => {
        console.error('Erro ao carregar clientes:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.name} — {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
