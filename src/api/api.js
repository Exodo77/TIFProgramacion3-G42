// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'https://sandbox.academiadevelopers.com/harmonyhub'; // URL base correcta

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Puedes añadir lógica de interceptores si es necesario, pero no usar hooks directamente aquí.
api.interceptors.request.use((config) => {
  // Aquí puedes añadir headers o modificar la configuración de la solicitud si es necesario
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
