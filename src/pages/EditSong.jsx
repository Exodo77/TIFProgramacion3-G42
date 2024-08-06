// src/pages/EditSong.jsx
import React, { useEffect, useState } from 'react';
import { useApi } from '../context/ApiContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditSong = () => {
  const { id } = useParams();
  const { fetchData } = useApi();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSong = async () => {
      try {
        const data = await fetchData(`/api/songs/${id}`);
        setTitle(data.title);
      } catch (err) {
        console.error('Error al obtener canción:', err.message);
      }
    };
    getSong();
  }, [id, fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchData(`/api/songs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title })
      });
      navigate('/songs'); // Redirige a la lista de canciones
    } catch (err) {
      console.error('Error al actualizar canción:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <button type="submit">Actualizar Canción</button>
    </form>
  );
};

export default EditSong;
