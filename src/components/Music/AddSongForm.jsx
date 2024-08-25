import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import logoG42 from '../../assets/logog42.png';
import { Form, Container, Card, Alert, Row, Col, Button } from 'react-bootstrap';
import NavButtons from '../NavButtons';

const AddSongForm = () => {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [año, setAño] = useState('');
  const [album, setAlbum] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(''); // Estado para manejar el mensaje de éxito

  const manejarCambioArchivo = (evento) => {
    setArchivo(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError(null);
    setExito(''); // Reinicia el mensaje de éxito al enviar

    if (!titulo) {
      setError('Se requiere un título.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', titulo);
      formData.append('year', año || '');
      formData.append('album', album || '');
      if (archivo) {
        formData.append('song_file', archivo);
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Token no encontrado. Por favor, inicia sesión.');
        return;
      }

      const response = await axios.post('https://sandbox.academiadevelopers.com/harmonyhub/songs/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Resetea los campos del formulario
      setTitulo('');
      setAño('');
      setAlbum('');
      setArchivo(null);
      setExito('Canción añadida con éxito.'); // Actualiza el mensaje de éxito
    } catch (error) {
      setError(error.response ? error.response.data.detail : 'Error al añadir la canción.');
      if (error.response && error.response.status === 401) {
        setError('Token inválido. Por favor, vuelve a iniciar sesión.');
        localStorage.removeItem('authToken');
      }
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
              <h2 className="text-center mb-4">Añadir Nueva Canción</h2>
              <Form onSubmit={manejarEnvio}>
                <Form.Group className="mb-3">
                  <Form.Label>Título de la canción</Form.Label>
                  <Form.Control
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    maxLength="255"
                    minLength="1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Año de lanzamiento</Form.Label>
                  <Form.Control
                    type="number"
                    value={año}
                    onChange={(e) => setAño(e.target.value)}
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
                    onChange={manejarCambioArchivo}
                    accept="audio/*"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Añadir canción
                  </Button>
                </div>
              </Form>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              {exito && <Alert variant="success" className="mt-3">{exito}</Alert>} {/* Alert de éxito */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSongForm;
