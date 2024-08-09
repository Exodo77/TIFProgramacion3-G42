import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import logoG42 from '../assets/logog42.png';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={{ backgroundColor: '#b3e5fc', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0', padding: '0' }}>
      <img src={logoG42} alt="G42 Logo" className="my-4" style={{ width: '300px' }} />
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Iniciar sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;