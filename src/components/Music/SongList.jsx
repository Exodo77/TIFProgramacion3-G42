/*Importaciones:
React, useState, y useEffect desde react.
SongCard desde el archivo SongCard.jsx.
api desde el archivo api.js */
import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import api from '../../api/api';

/*Estado del Componente:
songs: Almacena la lista de canciones.
currentPage: Página actual de las canciones.
totalPages: Total de páginas disponibles.
songsPerPage: Número de canciones por página. */
const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const songsPerPage = 6; // Número de canciones por página


  /*useEffect: Ejecuta fetchSongs cada vez que currentPage cambie.
fetchSongs: Función asíncrona para obtener datos de canciones desde la API.
Realiza una solicitud GET a /songs/ con los parámetros de página y tamaño de página.
Actualiza el estado songs con los resultados obtenidos.
Calcula y actualiza totalPages basado en el total de canciones disponibles.
Maneja errores en la solicitud con un catch y muestra el error en la consola. */
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Ajusta los parámetros según la API
        const response = await api.get(`/songs/?page=${currentPage}&page_size=${songsPerPage}`);
        if (response.data.results) {
          setSongs(response.data.results); // Asegúrate de que `results` contenga las canciones actuales
          setTotalPages(Math.ceil(response.data.total / songsPerPage)); // Ajusta según cómo se maneja el total en la respuesta
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, [currentPage]);


  /*Controladores de Página:
handleNextPage: Incrementa currentPage si no se ha alcanzado la última página.
handlePreviousPage: Decrementa currentPage si no se está en la primera página.*/
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /*Renderizado:
Contenedor Principal: flex flex-col min-h-screen para flexibilidad vertical.
Contenedor de Canciones: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 para una cuadrícula de tarjetas de canciones que cambia según el tamaño de pantalla.
{songs.map(song => ( ... ))}: Mapea sobre el estado songs para renderizar un SongCard para cada canción.
Controles de Paginación:
Botón "Previous": Llama a handlePreviousPage y está deshabilitado en la primera página.
Botón "Next": Llama a handleNextPage y está deshabilitado en la última página. */
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {songs.map(song => (
            <SongCard
              key={song.id}
              title={song.title}
              artists={song.artists}
              genres={song.genres}
              songFile={song.song_file}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SongList;

/*EXPLICACION DEL ARCHIVO: 
Propósito: Mostrar una lista paginada de canciones.
Características:
Obtiene y muestra canciones desde una API.
Soporta paginación con botones para navegar entre páginas.
Muestra cada canción usando el componente SongCard.*/