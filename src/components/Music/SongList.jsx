import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import axios from 'axios';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const songsPerPage = 6;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://sandbox.academiadevelopers.com/harmonyhub/songs/', {
          params: {
            page: currentPage,
            page_size: songsPerPage,
          }
        });
        if (response.data.results) {
          setSongs(response.data.results);
          setTotalPages(Math.ceil(response.data.count / songsPerPage));
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, [currentPage]);

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
              album={song.album ? song.album.name : 'Unknown Album'} // Assuming album is an object
              year={song.year}
              viewCount={song.view_count}
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
