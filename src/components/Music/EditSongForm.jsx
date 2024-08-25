import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import logoG42 from '../../assets/logog42.png';
import NavButtons from '../NavButtons';
import { useAuth } from '../../context/AuthContext';

const EditSongForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`, {
          headers: { Authorization: `Token ${user.token}` },
        });
        const song = response.data;
        setTitle(song.title);
        setYear(song.year);
        setAlbum(song.album);
      } catch (err) {
        console.error('Error al obtener canción:', err.message);
        setError('La canción no existe o no tienes permiso para editarla.');
      }
    };

    fetchSong();
  }, [id, user.token]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('year', year || '');
      formData.append('album', album || '');
      if (file) {
        formData.append('song_file', file);
      }

      await axios.put(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`, formData, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/'); // Redirige a la lista de canciones después de la edición
    } catch (err) {
      console.error('Error al actualizar canción:', err.message);
      setError('Error al actualizar la canción. Verifica los campos e inténtalo de nuevo.');
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
              {error && <Alert variant="danger">{error}</Alert>} {/* Alert para mostrar errores */}
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
                <Form.Group className="mb-4">
                  <Form.Label>Archivo de la canción</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept="audio/*"
                  />
                </Form.Group>
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
