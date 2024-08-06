//IMPORTACIONES
//Importa React desde la biblioteca react, necesario para crear componentes React.
import React from 'react';

/*Definición del Componente: SongCard es un componente funcional que recibe title, 
artists, genres, y songFile como propiedades (props).*/
const SongCard = ({ title, artists, genres, songFile }) => {
  /*Contenedor Principal: Un div con clases de Tailwind CSS para establecer el estilo.
  max-w-sm: Ancho máximo pequeño.
  rounded: Bordes redondeados.
  overflow-hidden: Oculta contenido que desborda.
  shadow-lg: Sombra grande.
  m-4: Margen.
  bg-white: Fondo blanco.*/
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {artists.length ? `Artist: ${artists.join(', ')}` : 'Unknown Artist'}
        </p>
        <p className="text-gray-700 text-base">
          {genres.length ? `Genre: ${genres.join(', ')}` : 'Unknown Genre'}
        </p>
        {songFile && (
          <audio controls controlsList="nodownload" className="w-full mt-4">
            <source src={songFile} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default SongCard;

/*EXPLICACION DEL ARCHIVO
Propósito: Mostrar la información de una canción en una tarjeta estilizada.
Datos Mostrados:
Título de la canción.
Lista de artistas.
Lista de géneros.
Reproductor de audio (si hay un archivo de canción disponible).
*/