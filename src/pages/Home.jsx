/*Importaciones:
React para usar JSX y componentes de React.
SongList es importado desde el componente SongList, que muestra la lista de canciones. */
import React from 'react';
import SongList from '../components/Music/SongList';


/*Componente Home:
Estructura: Un contenedor con margen automático (mx-auto) y padding (p-4).
Encabezado (h1): Título centrado con un tamaño de texto grande (text-2xl), negrita (font-bold), margen inferior (mb-6), y color de texto amarillo (text-yellow-700).
SongList: Se incluye el componente SongList, que mostrará la lista de canciones. */
const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">Home</h1>
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