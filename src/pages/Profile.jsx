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
        <p className="text-gray-700">Nombre de usuario: {user.username || 'No disponible'}</p>
        <p className="text-gray-700">Email: {user.email || 'No disponible'}</p>
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
