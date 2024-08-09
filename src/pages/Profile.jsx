import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import logoG42 from '../assets/logog42.png';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div style={{ backgroundColor: '#b3e5fc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-gray-700">No has iniciado sesión.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#b3e5fc', minHeight: '100vh', padding: '20px' }}>
      {/* Encabezado con Logo y Botones */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <img src={logoG42} alt="G42 Logo" style={{ width: '150px' }} />
        <div>
          <Link to="/home">
            <Button variant="secondary" className="me-2">Home</Button>
          </Link>
          <Button variant="danger" onClick={logout}>Logout</Button>
        </div>
      </div>

      {/* Contenido del Perfil */}
      <div className="d-flex flex-column align-items-center">
        <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4">Perfil de Usuario</h2>
          <p><strong>ID de usuario:</strong> {user.user_id || 'No disponible'}</p>
          <p><strong>Nombre de usuario:</strong> {user.username || 'No disponible'}</p>
          <p><strong>Nombre:</strong> {user.first_name || 'No disponible'}</p>
          <p><strong>Apellido:</strong> {user.last_name || 'No disponible'}</p>
          <p><strong>Email:</strong> {user.email || 'No disponible'}</p>
          {user.dob && <p><strong>Fecha de nacimiento:</strong> {user.dob}</p>}
          {user.bio && <p><strong>Biografía:</strong> {user.bio}</p>}
          {user.image && (
            <div className="text-center my-3">
              <img className="rounded-circle" src={user.image} alt="Profile" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          <p><strong>Estado:</strong> {user.state || 'No disponible'}</p>
          <p><strong>Fecha de alta:</strong> {user.created_at || 'No disponible'}</p>
          <p><strong>Fecha de modificación:</strong> {user.updated_at || 'No disponible'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
