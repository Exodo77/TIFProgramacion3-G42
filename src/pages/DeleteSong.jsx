import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';

const DeleteSong = () => {
  const { user } = useAuth();
  const { deleteSong } = useApi();
  const navigate = useNavigate();
  const [songId, setSongId] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!songId) {
      setError('Por favor, ingresa un ID de canción.');
      return;
    }

    try {
      await deleteSong(songId, user.token);
      navigate('/songs'); // Redirige a la lista de canciones o a donde prefieras
    } catch (error) {
      console.error('Failed to delete song:', error);
      setError('No se pudo eliminar la canción. Intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Eliminar Canción</h1>
        <input
          type="text"
          placeholder="Ingresa el ID de la canción"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DeleteSong;