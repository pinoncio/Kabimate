import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { loginUser } from '../services/Login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import '../Styles/Login.css';
import '../Styles/Navbar.css';

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
        email: email.value,
        contrasenia: contraseña.value,
      });

      if (response.data.token) {
        login(response.data.token, response.data.rol); 
        
        // Redirigir según el rol del usuario
        if (response.data.rol === 1) {
          navigate('/admin'); // Rol 1 va a /admin
        } else if (response.data.rol === 2) {
          navigate('/'); // Rol 2 va a /
        }
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
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input form-control" 
            onBlur={handleBlur}
          />
          {errors.email && <span className="text-danger">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            className="input form-control" 
            onBlur={handleBlur}
          />
          {errors.contraseña && <span className="text-danger">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Iniciar sesión
          </button>
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
