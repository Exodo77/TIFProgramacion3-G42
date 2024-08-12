import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { Button, Form, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import logoG42 from '../assets/logog42.png';
import NavButtons from '../components/NavButtons';

const DeleteSong = () => {
  const { user } = useAuth();
  const { deleteSong } = useApi();
  const navigate = useNavigate();
  const [songId, setSongId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDelete = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!songId) {
      setError('Por favor, ingresa un ID de canción.');
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta canción?');

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteSong(songId, user.token);
      setSuccess('Archivo eliminado con éxito.');
      setError('');
      setSongId('');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Failed to delete song:', error);
      setError('No se pudo eliminar la canción. Intenta de nuevo más tarde.');
      setSuccess('');
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
              <h2 className="text-center mb-4">Eliminar Canción</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>ID de la canción</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el ID de la canción"
                    value={songId}
                    onChange={(e) => setSongId(e.target.value)}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <div className="d-grid">
                  <Button variant="danger" onClick={handleDelete} size="lg">
                    Eliminar
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

export default DeleteSong;
