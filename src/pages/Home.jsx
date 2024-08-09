import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import SongList from '../components/Music/SongList';
import logoG42 from '../assets/logog42.png';

const Home = () => {
  const { logout, user } = useAuth();

  return (
    <div style={{ backgroundColor: '#b3e5fc', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0', padding: '0' }}>
      <img src={logoG42} alt="G42 Logo" className="my-4" style={{ width: '300px' }} />
      <div className="d-flex justify-content-end align-items-center mb-4" style={{ width: '100%', paddingRight: '20px' }}>
        <div>
          <Link to="/profile">
            <Button variant="secondary" className="me-2">Profile</Button>
          </Link>
          {user ? (
            <Button variant="danger" onClick={logout}>Logout</Button>
          ) : (
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </div>
      </div>
      <div style={{ width: '100%', flex: '1' }}>
        <SongList />
      </div>
    </div>
  );
};

export default Home;
