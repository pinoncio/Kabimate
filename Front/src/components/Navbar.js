// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import { FaDoorOpen, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/login'); 
  };

  const rol = localStorage.getItem('rol');

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#a47551' }}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white fs-3" style={{ textTransform: 'uppercase' }}>KABIMATE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                {rol === '1' ? (
                  <>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link text-white">Perfil</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={handleLogout} className="btn btn-link nav-link text-white">
                        <FaDoorOpen /> Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/" className="nav-link text-white">Reservas</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/" className="nav-link text-white">Historial</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/perfil" className="nav-link text-white">Perfil</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={handleLogout} className="btn btn-link nav-link text-white">
                        <FaDoorOpen /> Cerrar sesión
                      </button>
                    </li>
                  </>
                )}
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white"> 
                  <FaUser/>  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
