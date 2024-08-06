// src/pages/SongsList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api'; // Si api.js está en src/api
import { useAuth } from '../context/AuthContext';

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useAuth(); // Usa el hook aquí para obtener el usuario y el token

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get('/harmonyhub/songs/', {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Usa el token aquí
          },
        });
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    if (user) {
      fetchSongs();
    }
  }, [user]); // Asegúrate de que fetchSongs se llama cuando user cambie

  return (
    <div>
      <h1>Songs List</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
