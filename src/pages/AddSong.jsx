// src/pages/AddSong.jsx
import React, { useState } from 'react';
import { useApi } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

const AddSong = () => {
  const [title, setTitle] = useState('');
  const { fetchData } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchData('/api/songs', {
        method: 'POST',
        body: JSON.stringify({ title })
      });
      navigate('/songs'); // Redirige a la lista de canciones
    } catch (err) {
      console.error('Error al agregar canción:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <button type="submit">Agregar Canción</button>
    </form>
  );
};

export default AddSong;
