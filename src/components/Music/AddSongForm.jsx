import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Ruta ajustada

const AddSongForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data to be sent in the request
    const songData = {
      title,
      year: year || null,  // Optional field
      album: album || null, // Optional field
    };

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Token no encontrado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await axios.post('https://sandbox.academiadevelopers.com/harmonyhub/songs/', songData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log('Song added successfully:', response.data);
      setTitle('');
      setYear('');
      setAlbum('');
      setArtist('');
      setSuccess('Canción añadida con éxito.');
      setError(null); // Limpiar el error si la solicitud es exitosa
    } catch (error) {
      console.error('Failed to add song:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.detail : 'Error al añadir la canción.');
      if (error.response && error.response.status === 401) {
        // Si el error es un 401, forzar al usuario a reiniciar sesión
        setError('Token inválido. Por favor, vuelve a iniciar sesión.');
        localStorage.removeItem('authToken'); // Limpiar el token inválido
        // Aquí puedes redirigir al usuario al login si es necesario
      }
    }
  };

  return (
    <div>
      <h1>Nueva Canción</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título de la canción:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength="255"
            minLength="1"
          />
        </div>
        <div>
          <label>Año de lanzamiento:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Opcional"
            max="2147483647"
            min="-2147483648"
          />
        </div>
        <div>
          <label>Álbum:</label>
          <input
            type="number"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Opcional"
          />
        </div>
        <div>
          <label>Artista:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <button type="submit">Añadir canción</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddSongForm;