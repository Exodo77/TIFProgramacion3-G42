//IMPORTACIONES
//React y useContext: son importados desde react. useContext se usa para acceder al contexto de autenticación.
//Route y Redirect: son importados desde react-router-dom. Route se utiliza para 
//definir rutas en la aplicación, y Redirect se usa para redirigir a los usuarios no autenticados.
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const PrivateRoute = ({ element, ...rest }) => {
  const { user, logout, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
            headers: { Authorization: `Token ${token}` }
          });
          if (response.data) {
            setUser({ token, ...response.data }); // Actualiza el estado con el perfil del usuario
          } else {
            logout();
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          logout();
        }
      } else {
        logout();
      }
      setLoading(false);
    };

    if (!user) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [user, logout, setUser]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga mientras se verifica el usuario
  }

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;