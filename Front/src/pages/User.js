import React, { useEffect, useState } from 'react';
import { loadUsers, loadRoles, loadInstitutions, createUser } from '../components/CreateUsers';
import '../Styles/User.css'
import Navbar from '../components/Navbar';


const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [createMode, setCreateMode] = useState(false);
    const [newUser, setNewUser] = useState({
        NOMBRE1_USUARIO: '',
        NOMBRE2_USUARIO: '',
        APELLIDO1_USUARIO: '',
        APELLIDO2_USUARIO: '',
        RUT_USUARIO: '',
        CONTRASENIA_USUARIO: '',
        EMAIL_USUARIO: '',
        ESTADO_CUENTA: true, 
        ID_INSTITUCION_USUARIO: '',
        ID_ROL_USUARIO: ''
    });

    useEffect(() => {
        loadUsers(setUsers);
        loadRoles(setRoles);
        loadInstitutions(setInstitutions);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        await createUser(newUser, loadUsers, setCreateMode);
        setNewUser({ // Resetear el formulario después de crear
            NOMBRE1_USUARIO: '',
            NOMBRE2_USUARIO: '',
            APELLIDO1_USUARIO: '',
            APELLIDO2_USUARIO: '',
            RUT_USUARIO: '',
            CONTRASENIA_USUARIO: '',
            EMAIL_USUARIO: '',
            ESTADO_CUENTA: true,
            ID_INSTITUCION_USUARIO: '',
            ID_ROL_USUARIO: ''
        });
    };

    return (
      <div>
          <Navbar /> {/* Agrega el Navbar aquí */}
          <div className="container">
              <h1>Lista de Usuarios</h1>
              <div className="table-container">
                  <table>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Apellido</th>
                              <th>Email</th>
                              <th>Estado</th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.map(user => (
                              <tr key={user.ID_USUARIO}>
                                  <td>{user.ID_USUARIO}</td>
                                  <td>{`${user.NOMBRE1_USUARIO} ${user.NOMBRE2_USUARIO}`}</td>
                                  <td>{`${user.APELLIDO1_USUARIO} ${user.APELLIDO2_USUARIO}`}</td>
                                  <td>{user.EMAIL_USUARIO}</td>
                                  <td>{user.ESTADO_CUENTA ? 'Activo' : 'Inactivo'}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
              <button className="create-button" onClick={() => setCreateMode(!createMode)}>
                  {createMode ? 'Cancelar' : 'Crear Usuario'}
              </button>
              {createMode && (
                  <form className="create-form" onSubmit={handleCreateUser}>
                      <h2>Crear Usuario</h2>
                      <div className="form-group">
                          <label>Nombre 1</label>
                          <input type="text" name="NOMBRE1_USUARIO" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                          <label>Nombre 2</label>
                          <input type="text" name="NOMBRE2_USUARIO" onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                          <label>Apellido 1</label>
                          <input type="text" name="APELLIDO1_USUARIO" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                          <label>Apellido 2</label>
                          <input type="text" name="APELLIDO2_USUARIO" onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                          <label>RUT</label>
                          <input type="text" name="RUT_USUARIO" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                          <label>Contraseña</label>
                          <input type="password" name="CONTRASENIA_USUARIO" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                          <label>Email</label>
                          <input type="email" name="EMAIL_USUARIO" onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                          <label>Institución</label>
                          <select name="ID_INSTITUCION_USUARIO" onChange={handleInputChange} required>
                              <option value="">Seleccione Institución</option>
                              {institutions.map(institution => (
                                  <option key={institution.ID_INSTITUCION} value={institution.ID_INSTITUCION}>
                                      {institution.nombre}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <div className="form-group">
                          <label>Rol</label>
                          <select name="ID_ROL_USUARIO" onChange={handleInputChange} required>
                              <option value="">Seleccione Rol</option>
                              {roles.map(role => (
                                  <option key={role.ID_ROL} value={role.ID_ROL}>
                                      {role.nombre}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <div className="form-buttons">
                          <button type="submit">Crear Usuario</button>
                      </div>
                  </form>
              )}
          </div>
      </div>
  );
};

export default UserPage;