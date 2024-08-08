import React, { useState } from 'react';
import axios from 'axios';

const AddSongForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar y parsear el campo album
    let parsedAlbum = null;
    if (album) {
      parsedAlbum = parseInt(album, 10);
      if (isNaN(parsedAlbum)) {
        setError('El álbum debe ser un número válido.');
        return;
      }
    }

    // Verificar si el título es válido
    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    // Verificar si el año es un número válido
    let parsedYear = null;
    if (year) {
      parsedYear = parseInt(year, 10);
      if (isNaN(parsedYear)) {
        setError('El año debe ser un número válido.');
        return;
      }
    }

    // Construir el objeto de datos
    const songData = {
      title: title.trim(),
      year: parsedYear,
      album: parsedAlbum // Enviamos null si el álbum no está presente
    };

    try {
      const response = await axios.post('https://sandbox.academiadevelopers.com/harmonyhub/songs/', songData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Song added successfully:', response.data);
      setError('');
    } catch (error) {
      console.error('Failed to add song:', error.response?.data || error.message);
      setError('Error al agregar la canción. Verifica los datos y vuelve a intentarlo.');
    }
  };

  return (
    <div>
      <h1>Add New Song</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label>Album ID:</label>
          <input
            type="text" // Cambiado a text para aceptar valores no numéricos y luego se validará
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default AddSongForm;