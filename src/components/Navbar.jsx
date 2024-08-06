/*act y useContext desde react.
Link desde react-router-dom para navegación dentro de la aplicación.
AuthContext desde ../context/AuthContext para acceder al contexto de autenticación. */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/*Uso del Contexto:
user: Información del usuario actual (si está autenticado).
logout: Función para cerrar sesión, proporcionada por el contexto. */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  /*Renderizado:
Siempre Visible:
Un enlace a la página de inicio (/) con el texto "Inicio".
Si el Usuario Está Autenticado (user existe):
Enlace a la página del perfil (/profile) con el texto "Perfil".
Botón que llama a la función logout para cerrar sesión.
Si el Usuario No Está Autenticado:
Enlace a la página de inicio de sesión (/login) con el texto "Iniciar Sesión". */
  return (
    <nav>
      <Link to="/">Inicio</Link>
      {user ? (
        <>
          <Link to="/profile">Perfil</Link>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link to="/login">Iniciar Sesión</Link>
      )}
    </nav>
  );
};

export default Navbar;

//explicacion del archivo
/*Resumen del Componente Navbar
Propósito: Proporcionar una barra de navegación con enlaces y un botón de cierre de sesión.
Características:
Muestra enlaces a diferentes páginas basados en el estado de autenticación del usuario.
Permite a los usuarios cerrar sesión si están autenticados. */

