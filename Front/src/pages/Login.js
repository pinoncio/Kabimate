import React, { useState, useContext } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { FaUser } from 'react-icons/fa';
import { loginUser } from '../services/Login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import '../Styles/Login.css';

const Login = () => {
  const [errors, setErrors] = useState({ email: false, contraseña: false });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, contraseña } = event.target.elements;

    try {
      const response = await loginUser({
        correo: email.value,
        contrasena: contraseña.value,
      });

      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      } else {
        setErrors({ email: true, contraseña: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: true, contraseña: true });
    }
  };

  return (
    <div className="login-wrapper">
      <Navbar />
      <h1 className="login-title">Bienvenido a Kabimate</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input"
            onBlur={handleBlur}
          />
          {errors.email && <span className="error-message">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="form-group">
          <Input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            className="input"
            onBlur={handleBlur}
          />
          {errors.contraseña && <span className="error-message">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="button-container">
          <Button
            text="Iniciar sesión"
            className="button"
            icon={<FaUser className="user-icon" />}
          />
        </div>
      </form>
      <a href="#" className="recover-password">¿Olvidaste tu contraseña?</a>
      <p className="copyright">
        Todos los derechos reservados. Copyright (2024) - KABIMATE
      </p>
    </div>
  );
};

export default Login;
