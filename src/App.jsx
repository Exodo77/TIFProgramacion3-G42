import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';
import Home from './pages/Home';
import AddSong from './pages/AddSong';
import EditSong from './pages/EditSong';
import DeleteSong from './pages/DeleteSong';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PrivateRoute from './components/Auth/PrivateRoute';


// Importa el componente AddAlbum
import AddAlbum from './pages/AddAlbum';
import AlbumsList from './pages/AlbumsList';
import EditAlbum from './pages/EditAlbum';
import DeleteAlbum from './pages/DeleteAlbum';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ApiProvider>
          <Routes>
            {/* RUTAS DE ALBUNES */}
            <Route path="/albums" element={<PrivateRoute element={<AlbumsList />} />} />
            <Route path="/albums/new" element={<PrivateRoute element={<AddAlbum />} />} />
            <Route path="/albums/edit/:id" element={<PrivateRoute element={<EditAlbum />} />} />
            <Route path="/albums/delete/:id" element={<PrivateRoute element={<DeleteAlbum />} />} />


            {/* RUTAS DE SONGS */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/songs/new" element={<PrivateRoute element={<AddSong />} />} /> 
            <Route path="/songs/edit/:id" element={<PrivateRoute element={<EditSong />} />} />
            <Route path="/songs/delete" element={<PrivateRoute element={<DeleteSong />} />} />
          </Routes>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
