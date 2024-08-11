import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAlbum = () => {
  const navigate = useNavigate();
  const [albumId, setAlbumId] = React.useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${albumId}/`);
      navigate('/albums'); // Redirige a la lista de álbumes después de eliminar
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div>
      <h1>Delete Album</h1>
      <input
        type="text"
        placeholder="Enter album ID"
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Album</button>
    </div>
  );
};

export default DeleteAlbum;
