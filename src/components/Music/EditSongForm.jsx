import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditSongForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSong = async () => {
      try {
        const response = await axios.get(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        const songData = response.data;
        setTitle(songData.title);
        setYear(songData.year || '');
        setAlbum(songData.album ? songData.album.toString() : '');
      } catch (error) {
        console.error('Error al obtener la canción:', error.response?.data || error.message);
        setError('Error al cargar la canción. Intenta de nuevo más tarde.');
      }
    };

    getSong();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedAlbum = null;
    if (album) {
      parsedAlbum = parseInt(album, 10);
      if (isNaN(parsedAlbum)) {
        setError('El álbum debe ser un número válido.');
        return;
      }
    }

    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    let parsedYear = null;
    if (year) {
      parsedYear = parseInt(year, 10);
      if (isNaN(parsedYear)) {
        setError('El año debe ser un número válido.');
        return;
      }
    }

    const songData = {
      title: title.trim(),
      year: parsedYear,
      album: parsedAlbum
    };

    try {
      await axios.put(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`, songData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Song updated successfully');
      navigate('/songs'); // Redirige a la lista de canciones tras actualizar
    } catch (error) {
      console.error('Error al actualizar la canción:', error.response?.data || error.message);
      setError('Error al actualizar la canción. Verifica los datos y vuelve a intentarlo.');
    }
  };

  return (
    <div>
      <h1>Edit Song</h1>
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
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default EditSongForm;
