// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'https://sandbox.academiadevelopers.com/harmonyhub'; // URL base correcta

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Puedes añadir lógica de interceptores si es necesario, pero no usar hooks directamente aquí.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Obtener el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Token ${token}`; // Agregar el token a los encabezados
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
