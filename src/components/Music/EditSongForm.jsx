import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import logoG42 from '../../assets/logog42.png';
import NavButtons from '../NavButtons';

const EditSongForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSong = async () => {
      try {
        const response = await axios.get(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        const songData = response.data;
        setTitle(songData.title);
        setYear(songData.year || '');
        setAlbum(songData.album ? songData.album.toString() : '');
      } catch (error) {
        console.error('Error al obtener la canción:', error.response?.data || error.message);
        setError('Error al cargar la canción. Intenta de nuevo más tarde.');
      }
    };

    getSong();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedAlbum = null;
    if (album) {
      parsedAlbum = parseInt(album, 10);
      if (isNaN(parsedAlbum)) {
        setError('El álbum debe ser un número válido.');
        return;
      }
    }

    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    let parsedYear = null;
    if (year) {
      parsedYear = parseInt(year, 10);
      if (isNaN(parsedYear)) {
        setError('El año debe ser un número válido.');
        return;
      }
    }

    const songData = {
      title: title.trim(),
      year: parsedYear,
      album: parsedAlbum
    };

    try {
      await axios.put(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`, songData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Song updated successfully');
      navigate('/songs'); // Redirige a la lista de canciones tras actualizar
    } catch (error) {
      console.error('Error al actualizar la canción:', error.response?.data || error.message);
      setError('Error al actualizar la canción. Verifica los datos y vuelve a intentarlo.');
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
              <h2 className="text-center mb-4">Editar Canción</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Título de la canción</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength="255"
                    minLength="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Año de lanzamiento</Form.Label>
                  <Form.Control
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Opcional"
                    max="2147483647"
                    min="-2147483648"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Álbum</Form.Label>
                  <Form.Control
                    type="text"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    placeholder="Opcional"
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Actualizar canción
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

export default EditSongForm;
