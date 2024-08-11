import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Ruta ajustada

const AddSongForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year || '');
    formData.append('album', album || '');
    formData.append('artist', artist);
    if (file) {
      formData.append('song_file', file);
    }

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Token no encontrado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await axios.post('https://sandbox.academiadevelopers.com/harmonyhub/songs/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos
        },
      });
      console.log('Canción añadida con éxito:', response.data);
      setTitle('');
      setYear('');
      setAlbum('');
      setArtist('');
      setFile(null);
      setSuccess('Canción añadida con éxito.');
      setError(null);
    } catch (error) {
      console.error('Error al añadir la canción:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.detail : 'Error al añadir la canción.');
      if (error.response && error.response.status === 401) {
        setError('Token inválido. Por favor, vuelve a iniciar sesión.');
        localStorage.removeItem('authToken');
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
        <div>
          <label>Archivo de la canción:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="audio/*" // Limita la selección a archivos de audio
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
