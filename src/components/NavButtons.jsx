import React from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavButtons = () => {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex align-items-center">
      <Link to="/">
        <Button variant="secondary" className="me-2">Home</Button>
      </Link>
      <DropdownButton id="dropdown-basic-button" title="Menu" className="me-2">
        <Dropdown.Item as={Link} to="/songs/new">Agregar Canción</Dropdown.Item>
        <Dropdown.Item as={Link} to="/songs/delete">Eliminar Canción</Dropdown.Item>
        <Dropdown.Item as={Link} to="/songs/enter-id">Editar Canción</Dropdown.Item>
        <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
      </DropdownButton>
      <div>
        {user ? (
          <Button variant="danger" onClick={logout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavButtons;