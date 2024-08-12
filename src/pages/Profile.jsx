import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import logoG42 from '../assets/logog42.png';
import NavButtons from '../components/NavButtons';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
        <Card className="text-center p-4 shadow-lg">
          <Card.Body>
            <p>No has iniciado sesión.</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
      {/* Encabezado con Botones */}
      <Row className="w-100 mb-4">
        <Col className="d-flex justify-content-end align-items-center">
          <NavButtons />
        </Col>
      </Row>

      {/* Contenido del Perfil */}
      <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Col xs="auto">
          <Card className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
            <Card.Body className="p-5 text-center">
              <img src={logoG42} alt="G42 Logo" className="mb-4" style={{ width: '150px' }} />
              <h2 className="mb-4">Perfil de Usuario</h2>
              <p><strong>ID de usuario:</strong> {user.user_id || 'No disponible'}</p>
              <p><strong>Nombre de usuario:</strong> {user.username || 'No disponible'}</p>
              <p><strong>Nombre:</strong> {user.first_name || 'No disponible'}</p>
              <p><strong>Apellido:</strong> {user.last_name || 'No disponible'}</p>
              <p><strong>Email:</strong> {user.email || 'No disponible'}</p>
              {user.dob && <p><strong>Fecha de nacimiento:</strong> {user.dob}</p>}
              {user.bio && <p><strong>Biografía:</strong> {user.bio}</p>}
              {user.image && (
                <div className="text-center my-3">
                  <img className="rounded-circle" src={user.image} alt="Profile" style={{ width: '100px', height: '100px' }} />
                </div>
              )}
              <p><strong>Estado:</strong> {user.state || 'No disponible'}</p>
              <p><strong>Fecha de alta:</strong> {user.created_at || 'No disponible'}</p>
              <p><strong>Fecha de modificación:</strong> {user.updated_at || 'No disponible'}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
