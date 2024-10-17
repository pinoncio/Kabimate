import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import '../Styles/Login.css';
import { FaUser } from 'react-icons/fa';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica del login
  };

  return (
    <div>
      <Navbar />
      <div className="login-wrapper">
        <h1 className="login-title">Bienvenido a Kabimate</h1>
        <h1></h1>
        <form className="login-form" onSubmit={handleLogin}>
          <Input type="email" placeholder="Correo electrónico" />
          <Input type="password" placeholder="Contraseña" />
          <div className="button-container"> {/* Contenedor para el botón */}
            <Button text="Iniciar sesión" icon={<FaUser className="user-icon" />} />
          </div>
          </form>

          <a href="#" className="recover-password">¿Olvidaste tu contraseña?</a>

          <p className="copyright">Todos los derechos reservados. Copyright (2024) - KABIMATE</p>
          </div>
    </div>
  );
};

export default Login;