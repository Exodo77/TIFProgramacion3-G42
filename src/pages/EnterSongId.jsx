// src/pages/EnterSongId.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterSongId = () => {
  const [songId, setSongId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirige al formulario de edición de la canción con el ID ingresado
    if (songId) {
      navigate(`/songs/edit/${songId}`);
    } else {
      alert('Por favor, ingresa un ID válido.');
    }
  };

  return (
    <div>
      <h2>Ingrese el ID de la Canción</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID de la Canción:
          <input
            type="text"
            value={songId}
            onChange={(e) => setSongId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Editar Canción</button>
      </form>
    </div>
  );
};

export default EnterSongId;
