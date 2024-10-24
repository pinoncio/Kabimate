import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import Navbar from '../components/Navbar';
import '../Styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();  

  return (
    <div className="admin-wrapper">
      <Navbar />
      <h1 className="admin-title">Panel de Administración</h1>
      <div className="honeycomb-grid">
        <div className="hexagon user" onClick={() => navigate('/user')}>
          <p>Gestión de Usuarios</p>
        </div>
        <div className="hexagon roles" onClick={() => navigate('/rol')}>
          <p>Gestión de Roles</p>
        </div>
        <div className="hexagon delete-user" onClick={() => navigate('/insti')}>
          <p>Gestión de Instituciones</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
