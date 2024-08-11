import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://sandbox.academiadevelopers.com/harmonyhub/albums/');
        setAlbums(response.data.results);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.title} - {album.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Asegúrate de que la siguiente línea esté presente
export default AlbumsList;
