import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaUser } from 'react-icons/fa'; 

const Navbar = () => {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-title">KABIMATE</Link> {}

        <div className="navbar-right">
          <Link to="/admin" className="navbar-link">Admin</Link> {}
          <Link to="/historial" className="navbar-link">Historial</Link> {}
          <Link to="/reservas" className="navbar-link">Reservas</Link> {}
          <Link to="/perfil" className="navbar-link">Perfil</Link> {}
          <Link to="/login" className="navbar-login">
            <FaUser /> Iniciar sesión
          </Link>
          <FaQuestionCircle className="navbar-help-icon" />
        </div>
      </nav>
    );
};

export default Navbar;
