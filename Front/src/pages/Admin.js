import React from 'react';
import Navbar from '../components/Navbar'; // Asegúrate de que la ruta sea correcta
import '../Styles/Admin.css';

const Admin = () => {
  return (
    <div className="admin-wrapper">
      <Navbar /> {/* Navbar visible */}
      <h1 className="admin-title">Panel de Administración</h1>
      <div className="honeycomb-grid">
        <div className="hexagon create-user">
          <p>Crear Usuario</p>
        </div>
        <div className="hexagon edit-user">
          <p>Editar Usuario</p>
        </div>
        <div className="hexagon block-user">
          <p>Bloquear Usuario</p>
        </div>
        <div className="hexagon delete-user">
          <p>Eliminar Usuario</p>
        </div>
        <div className="hexagon create-institution" >
          <p>Crear Institución</p>
        </div>
        <div className="hexagon edit-institution">
          <p>Editar Institución</p>
        </div>
        <div className="hexagon delete-institution">
          <p>Eliminar Institución</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
