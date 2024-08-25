import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import logoG42 from '../assets/logog42.png'; // Asegúrate de ajustar la ruta si es necesario
import NavButtons from '../components/NavButtons'; // Importa NavButtons si deseas mostrarlo aquí

const NotFound = () => {
  return (
    <Container fluid className="d-flex flex-column py-5" style={{ minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
      {/* Botones de Navegación */}
      <Row className="w-100 mb-4">
        <Col className="d-flex justify-content-end align-items-center">
          <NavButtons /> {/* Agrega los botones de navegación si es relevante en esta página */}
        </Col>
      </Row>

      {/* Contenido Principal de NotFound */}
      <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Col xs="auto">
          <Card className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
            <Card.Body className="p-5 text-center">
              <div className="text-center mb-4">
                <img src={logoG42} alt="Logo G42" style={{ width: '150px' }} />
              </div>
              <h1 className="text-danger mb-4">404</h1>
              <h2 className="mb-4">Página no encontrada</h2>
              <p className="text-muted">Lo sentimos, pero la página que estás buscando no existe.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
