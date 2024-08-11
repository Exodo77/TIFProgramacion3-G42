import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import SongList from '../components/Music/SongList';
import logoG42 from '../assets/logog42.png';

const Home = () => {
  const { logout, user } = useAuth();

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
      <Row className="my-4">
        <Col className="text-center">
          <img src={logoG42} alt="G42 Logo" className="img-fluid" style={{ maxWidth: '300px' }} />
        </Col>
      </Row>
      <Row className="w-100">
        <Col className="d-flex justify-content-end pe-4 mb-4">
          <DropdownButton id="dropdown-basic-button" title="Menu" className="me-2">
            <Dropdown.Item as={Link} to="/songs/new">Agregar Canción</Dropdown.Item>
            <Dropdown.Item as={Link} to="/songs/delete">Eliminar Canción</Dropdown.Item>
            <Dropdown.Item as={Link} to="/songs/edit/:id">Editar Canción</Dropdown.Item>
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
        </Col>
      </Row>
      <Row className="flex-grow-1 w-100">
        <Col className="text-center">
          <h1 className="fw-bold mb-6">Canciones existentes</h1>
          <SongList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
