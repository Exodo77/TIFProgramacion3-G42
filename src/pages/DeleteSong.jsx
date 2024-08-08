// src/pages/DeleteSong.jsx
import React from 'react';
import { useApi } from '../context/ApiContext';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteSong = () => {
  const { id } = useParams();
  const { fetchData } = useApi();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await fetchData(`/api/songs/${id}`, { method: 'DELETE' });
      navigate('/songs'); // Redirige a la lista de canciones
    } catch (err) {
      console.error('Error al eliminar canción:', err.message);
    }
  };

  return (
    <div>
      <p>¿Estás seguro de que quieres eliminar esta canción?</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default DeleteSong;
