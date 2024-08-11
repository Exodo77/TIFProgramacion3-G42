import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({ title: '', artist: '', year: '' });

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };

    fetchAlbum();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, album);
      navigate('/albums'); // Redirige a la lista de álbumes después de la edición
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  return (
    <div>
      <h1>Edit Album</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={album.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            value={album.artist}
            onChange={handleChange}
          />
        </label>
        <label>
          Year:
          <input
            type="text"
            name="year"
            value={album.year}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Album</button>
      </form>
    </div>
  );
};

export default EditAlbum;
