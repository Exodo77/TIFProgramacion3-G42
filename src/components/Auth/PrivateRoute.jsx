//IMPORTACIONES
//React y useContext: son importados desde react. useContext se usa para acceder al contexto de autenticación.
//Route y Redirect: son importados desde react-router-dom. Route se utiliza para 
//definir rutas en la aplicación, y Redirect se usa para redirigir a los usuarios no autenticados.

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!user) {
      // Si el usuario no está autenticado, muestra el mensaje y redirige después de 5 segundos
      setIsRedirecting(true);
      setTimeout(() => {
        setIsRedirecting(false);
      }, 5000); // Esperar 5 segundos
    }
  }, [user]);

  if (!user && isRedirecting) {
    return (
      <div>
        <h1>Debes estar autenticado para acceder a esta página.</h1>
        <p>Redirigiendo a la página de inicio de sesión en 5 segundos...</p>
      </div>
    );
  }

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
