import React from 'react';
import { useNavigate } from 'react-router-dom';

const SongMenu = ({ onDeleteSong }) => {
  const navigate = useNavigate();

  const handleAddSong = () => {
    navigate('/songs/add'); // Redirige a la página de agregar canción
  };

  return (
    <div className="relative">
      <button className="bg-yellow-700 text-white px-4 py-2 rounded-full focus:outline-none">
        Menú
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
        <button
          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
          onClick={handleAddSong}
        >
          Agregar Canción
        </button>
        <button
          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
          onClick={onDeleteSong}
        >
          Eliminar Canción
        </button>
      </div>
    </div>
  );
};

export default SongMenu;
