import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';
import Home from './pages/Home';
import SongsList from './pages/SongsList';
import AddSong from './pages/AddSong';
import EditSong from './pages/EditSong';
import DeleteSong from './pages/DeleteSong';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/songs" element={<PrivateRoute element={<SongsList />} />} />
<<<<<<< HEAD
            <Route path="/songs/add" element={<PrivateRoute element={<AddSong />} />} />
=======
            <Route path="/songs/new" element={<PrivateRoute element={<AddSong />} />} /> 
>>>>>>> main
            <Route path="/songs/edit/:id" element={<PrivateRoute element={<EditSong />} />} />
            <Route path="/songs/delete" element={<PrivateRoute element={<DeleteSong />} />} />
          </Routes>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

