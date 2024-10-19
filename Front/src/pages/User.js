import React, { useState, useEffect } from 'react';
import { loadUsers, createUser, loadRoles } from '../components/CreateUsers'; 
import Navbar from '../components/Navbar'; // Asegúrate de que la ruta sea correcta
import '../Styles/User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [createMode, setCreateMode] = useState(false); 
  const [newUser, setNewUser] = useState({
    rut_usuario: '',
    nombre1_usuario: '',
    nombre2_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    correo: '',
    contrasena: '', 
    id_rol: ''
  });

  useEffect(() => {
    loadUsers(setUsers);
    loadRoles(setRoles);
  }, []);

  const handleCreate = () => {
    setCreateMode(true);
    setNewUser({
      rut_usuario: '',
      nombre1_usuario: '',
      nombre2_usuario: '',
      apellido1_usuario: '',
      apellido2_usuario: '',
      correo: '',
      contrasena: '', 
      id_rol: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser(newUser, () => {
      loadUsers(setUsers);
      setCreateMode(false);
      setNewUser({
        rut_usuario: '',
        nombre1_usuario: '',
        nombre2_usuario: '',
        apellido1_usuario: '',
        apellido2_usuario: '',
        correo: '',
        contrasena: '', 
        id_rol: ''
      });
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  return (
    <div className="container">
      <Navbar /> {/* Aquí se agrega el Navbar */}
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_usuario}>
              <td>{user.rut_usuario}</td>
              <td>{user.nombre1_usuario} {user.nombre2_usuario}</td>
              <td>{`${user.apellido1_usuario} ${user.apellido2_usuario}`}</td>
              <td>{user.correo}</td>
              <td>{roles.find(rol => rol.id_rol === user.id_rol)?.nombre_rol || 'Desconocido'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="create-button" onClick={handleCreate}>Crear Usuario</button>
      {createMode && (
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>RUT de la Persona</label>
            <input type="text" name="rut_usuario" value={newUser.rut_usuario} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Primer Nombre</label>
            <input type="text" name="nombre1_usuario" value={newUser.nombre1_usuario} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Segundo Nombre</label>
            <input type="text" name="nombre2_usuario" value={newUser.nombre2_usuario} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Primer Apellido</label>
            <input type="text" name="apellido1_usuario" value={newUser.apellido1_usuario} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Segundo Apellido</label>
            <input type="text" name="apellido2_usuario" value={newUser.apellido2_usuario} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" name="correo" value={newUser.correo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="contrasena" value={newUser.contrasena} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Rol del Usuario Nuevo</label>
            <select name="id_rol" value={newUser.id_rol} onChange={handleChange} required>
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>
                  {rol.nombre_rol}
                </option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit">Crear</button>
            <button type="button" className="cancel-button" onClick={() => setCreateMode(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default User;
