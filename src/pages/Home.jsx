import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SongList from '../components/Music/SongList';
import logoG42 from '../assets/logog42.png';
import NavButtons from '../components/NavButtons';

const Home = () => {
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
      <Row className="w-100 mb-4">
        <Col className="d-flex justify-content-end align-items-center">
          <NavButtons />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center">
          <img src={logoG42} alt="G42 Logo" className="img-fluid" style={{ maxWidth: '300px' }} />
        </Col>
      </Row>
      <Row className="flex-grow-1 w-100 text-center">
        <Col>
          <h1 className="fw-bold mb-4">Canciones existentes</h1>
          <SongList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
