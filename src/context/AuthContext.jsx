import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          await fetchUserProfile(token);
        } catch (error) {
          console.error('Failed to initialize authentication:', error);
          logout();
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://sandbox.academiadevelopers.com/api-auth/', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Guarda el token en localStorage
      setUser({ token }); // Guarda el token en el estado
      await fetchUserProfile(token); // Obtén los datos del perfil
      navigate('/profile'); // Redirige al usuario a la página de perfil
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
        headers: { Authorization: `Token ${token}` },
      });
      setUser((prev) => ({ ...prev, ...response.data })); // Guarda los datos del perfil en el estado
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
