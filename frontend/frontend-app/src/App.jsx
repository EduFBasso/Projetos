// frontend\frontend-app\src\App.jsx
import React from 'react';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';

function App() {
  return (
    <main>
      <h1>Sistema da Clínica</h1>
      <ClientForm />
      <ClientList />
    </main>
  );
}