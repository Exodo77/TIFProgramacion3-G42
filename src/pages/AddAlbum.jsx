import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddAlbum = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState(''); //debe ser un artista que exista o q ya este cargado
  const [error, setError] = useState(null); // Estado para manejar errores
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    // Verifica que todos los campos requeridos estén completos
    if (!title || !artist) {
      setError('Se requieren título y artista.');
      return;
    }

    try {
      const response = await axios.post(
        'https://sandbox.academiadevelopers.com/harmonyhub/albums/',
        { 
          title, 
          year: year ? parseInt(year, 10) : null, // Si year es opcional, envíalo como null si no se proporciona
          artist 
        },
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      console.log('Album creado:', response.data);
    } catch (error) {
      // Manejo de errores detallado
      if (error.response) {
        // Error de respuesta de la API
        console.error('Error al crear el álbum:', error.response.data);
        setError(`Error: ${error.response.data.detail || 'No se pudo crear el álbum'}`);
      } else if (error.request) {
        // No se recibió respuesta
        console.error('Error al crear el álbum:', error.request);
        setError('No hay respuesta del servidor. Inténtalo de nuevo más tarde.');
      } else {
        // Error al configurar la solicitud
        console.error('Error al crear el álbum:', error.message);
        setError('Se produjo un error inesperado. Inténtalo nuevamente.');
      }
    }
  };

  return (
    <div>
      <h1>Add New Album</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </label>
        <label>
          Year:
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
          />
        </label>
        <label>
          Artist:
          <input 
            type="number" 
            value={artist} 
            onChange={(e) => setArtist(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Add Album</button>
      </form>
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default AddAlbum;
