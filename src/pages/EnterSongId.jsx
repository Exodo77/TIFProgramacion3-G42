import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import logoG42 from '../assets/logog42.png';
import NavButtons from '../components/NavButtons';

const EnterSongId = () => {
  const [songId, setSongId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songId) {
      navigate(`/songs/edit/${songId}`);
    } else {
      setError('Por favor, ingresa un ID válido.');
    }
  };

  return (
    <Container fluid className="d-flex flex-column py-5" style={{ minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
      <Row className="w-100 mb-4">
        <Col className="d-flex justify-content-end align-items-center">
          <NavButtons />
        </Col>
      </Row>
      <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Col xs="auto">
          <Card className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <img src={logoG42} alt="Logo G42" style={{ width: '150px' }} />
              </div>
              <h2 className="text-center mb-4">Ingrese el ID de la Canción</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>ID de la Canción</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el ID de la canción"
                    value={songId}
                    onChange={(e) => setSongId(e.target.value)}
                    required
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Editar Canción
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EnterSongId;
