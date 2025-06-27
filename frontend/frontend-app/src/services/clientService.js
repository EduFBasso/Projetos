// frontend\frontend-app\src\services\clientService.js
import api from './api';

// 🔍 Busca a lista de profissionais
export const getProfessionals = async () => {
  try {
    console.log('📡 Buscando profissionais...');
    const res = await api.get('/register/professionals/');
    console.log(`✅ ${res.data.length} profissionais recebidos.`);
    return res.data;
  } catch (err) {
    console.error('❌ Falha ao obter profissionais:', err);
    throw err;
  }
};

// 👥 Busca todos os clientes vinculados
export const getClients = async () => {
  try {
    console.log('📡 Buscando clientes do profissional autenticado...');
    const res = await api.get('/register/clients/');
    console.log(`✅ ${res.data.length} clientes recebidos.`);
    return res.data;
  } catch (err) {
    console.error('❌ Falha ao obter clientes:', err);
    throw err;
  }
};

// 🔎 Busca clientes com filtro de nome (busca dinâmica)
export const getClientsByName = async (nome) => {
  try {
    console.log(`🔎 Buscando clientes com nome contendo: "${nome}"`);
    const res = await api.get(`/register/clients/?nome=${encodeURIComponent(nome)}`);
    console.log(`✅ ${res.data.length} clientes encontrados com filtro.`);
    return res.data;
  } catch (err) {
    console.error('❌ Falha na busca dinâmica de clientes:', err);
    throw err;
  }
};

// 📝 Cadastra um novo cliente
export const registerClient = async (data) => {
  try {
    console.log('📨 Enviando dados para cadastro de cliente:', data);
    const res = await api.post('/register/clients/', data);
    console.log('✅ Cliente cadastrado com sucesso:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Falha ao cadastrar cliente:', err);
    throw err;
  }
};