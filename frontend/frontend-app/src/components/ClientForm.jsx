// frontend\frontend-app\src\components\ClientList.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ClientForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/register/clients/', {
      name,
      email
    })
    .then(() => {
      alert('Cliente cadastrado com sucesso!');
      setName('');
      setEmail('');
    })
    .catch((error) => {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Algo deu errado. Verifique os campos.');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Cliente</h2>

      <div>
        <label>Nome:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default ClientForm;
