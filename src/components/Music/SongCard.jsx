import React from 'react';

const SongCard = ({ title, artists, genres, songFile, album, year, viewCount }) => {
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

        {album && (
          <p className="text-gray-700 text-base">
            {`Album: ${album}`}
          </p>
        )}

        {year && (
          <p className="text-gray-700 text-base">
            {`Year: ${year}`}
          </p>
        )}

        <p className="text-gray-700 text-base">
          {`Views: ${viewCount || 0}`}
        </p>

        {songFile && (
          <audio controls controlsList="nodownload" className="w-full mt-4">
            <source src={songFile} type="audio/mp3" />
            Su navegador no soporta el elemento de audio.
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