'use client';

import axios from 'axios';

const API_URL = '/api/pesagens'; //// mude pra api do seu backend 

// criar uma nova pesagem
export const createPesagem = async (pesagemData) => {
  try {
    const response = await axios.post(API_URL, pesagemData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pesagem:', error);
    throw error;
  }
};

// listar todas as pesagens do dia 
export const getPesagens = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pesagens:', error);
    throw error;
  }
};

// filtrar pesagens por motorista , numero do veiculo , data, hora 
export const filterPesagens = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao filtrar pesagens:', error);
    throw error;
  }
};
