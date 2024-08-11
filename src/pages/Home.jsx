import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import SongList from '../components/Music/SongList';
import logoG42 from '../assets/logog42.png';

const Home = () => {
  const { logout, user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">Canciones existentes</h1>
      <SongList />
    </div>
  );
};

export default Home;

/*RESUMEN DEL FUNCIONAMIENTO DEL ARCHIVO
Propósito: Mostrar la página de inicio que incluye un encabezado y la lista de canciones.
Características:
Contenedor con diseño centrado y padding.
Título de página con estilo.
Inclusión del componente SongList para mostrar las canciones. */