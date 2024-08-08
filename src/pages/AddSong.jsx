// src/pages/AddSong.jsx
import React from 'react';
import AddSongForm from '../components/Music/AddSongForm';

const AddSong = () => {
<<<<<<< HEAD
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores
  const { fetchData, loading } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetear error antes de hacer la solicitud
    try {
      await fetchData('/api/songs', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      navigate('/songs'); // Redirige a la lista de canciones tras el éxito
    } catch (err) {
      setError('Error al agregar canción. Intenta de nuevo más tarde.'); // Establece el mensaje de error
      console.error('Error al agregar canción:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nueva Canción</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Muestra el mensaje de error si existe */}
      <label className="block mb-2">
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded"
          placeholder="Título de la canción"
          required
        />
      </label>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded mt-4 ${loading ? 'bg-gray-500' : 'bg-yellow-700'} text-white`}
        disabled={loading} // Deshabilita el botón mientras se está cargando
      >
        {loading ? 'Agregando...' : 'Agregar Canción'}
      </button>
    </form>
=======
  return (
    <div>
      <AddSongForm />
    </div>
>>>>>>> main
  );
};

export default AddSong;
