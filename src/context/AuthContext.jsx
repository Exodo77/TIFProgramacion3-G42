import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      // Aquí envías las credenciales al servidor
      const response = await axios.post('https://sandbox.academiadevelopers.com/api-auth/', {
        username,
        password
      });

      // Si las credenciales son válidas, el servidor responderá con un token
      const token = response.data.token;
      console.log ("TOKEN:",token);//imprime el token
      setUser({ token }); // Guarda el token en el estado
      await fetchUserProfile(token); // Obtén los datos del perfil
      navigate('/profile'); // Redirige al usuario a la página de perfil o a otra ruta protegida
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User profile:', response.data); // Verifica los datos recibidos
      setUser(prev => ({ ...prev, ...response.data })); // Guarda los datos del perfil en el estado
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
