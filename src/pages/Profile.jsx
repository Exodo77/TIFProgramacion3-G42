import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">No has iniciado sesión.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Perfil de Usuario</h1>
        <p className="text-gray-700"><strong>ID de usuario:</strong> {user.user__id || 'No disponible'}</p>
        <p className="text-gray-700"><strong>Nombre de usuario:</strong> {user.username || 'No disponible'}</p>
        <p className="text-gray-700"><strong>Nombre:</strong> {user.first_name || 'No disponible'}</p>
        <p className="text-gray-700"><strong>Apellido:</strong> {user.last_name || 'No disponible'}</p>
        <p className="text-gray-700"><strong>Email:</strong> {user.email || 'No disponible'}</p>
        {user.dob && <p className="text-gray-700"><strong>Fecha de nacimiento:</strong> {user.dob}</p>}
        {user.bio && <p className="text-gray-700"><strong>Biografía:</strong> {user.bio}</p>}
        {user.image && <img className="mt-4 rounded-full" src={user.image} alt="Profile" />}
        <p className="text-gray-700"><strong>Estado:</strong> {user.state || 'No disponible'}</p>
        <p className="text-gray-700"><strong>Fecha de alta:</strong> {user.created_at || 'No disponible'}</p>
        <p className="text-gray-700"><strong>Fecha de modificación:</strong> {user.updated_at || 'No disponible'}</p>
        
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
