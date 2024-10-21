import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import Navbar from '../components/Navbar';
import useUser from '../Hooks/useUserHooks'; // Importa el hook
import '../Styles/user.css';
import { getRoles } from '../services/rol';

const UserPage = () => {
  const {
    users,
    roles,
    instituciones,
    operation,
    title,
    openModal,
    validar,
    deleteExistingUser,
    setNombre1Usuario,
    setNombre2Usuario,
    setApellido1Usuario,
    setApellido2Usuario,
    setRutUsuario,
    setContraseniaUsuario,
    setEmailUsuario,
    setEstadoCuenta,
    setIdInstitucionUsuario,
    setIdRolUsuario,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
    rut_usuario,
    email_usuario,
    contrasenia_usuario,
    estado_cuenta,
    id_institucion_usuario,
    id_rol_usuario,
    resetForm,
    getRoleName, // Importa la función desde el hook
    getInstitucionName,
    existingRoles, // Devuelve el array de roles existentes
    existingInstituciones,// Función para obtener el nombre de la institución
  } = useUser();// Usa el hook


  
  console.log( // Devuelve el array de roles existentes
    existingRoles)
  // Reset form when modal is closed
  const handleCloseModal = () => {
    resetForm();
  console.log()
  };
  return (
    <div className='App'>
      <Navbar />
      <hr />
      <div className='container-fluid mt-5'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button
                onClick={() => openModal(1)}
                className='btn w-100'
                style={{ backgroundColor: '#a47551', borderColor: '#a47551', color: 'white' }}
                data-bs-toggle='modal'
                data-bs-target='#modalUser'
                aria-expanded={false}
                aria-controls='modalUser'
              >
                <i className='fa fa-plus-circle mt-2'></i> Añadir Usuario
              </button>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered table-custom'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Completo</th>
                    <th>RUT</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Institución</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.ID_USUARIO}>
                      <td>{index + 1}</td>
                      <td>{`${user.NOMBRE1_USUARIO} ${user.NOMBRE2_USUARIO} ${user.APELLIDO1_USUARIO} ${user.APELLIDO2_USUARIO}`}</td>
                      <td>{user.RUT_USUARIO}</td>
                      <td>{user.EMAIL_USUARIO}</td>
                      <td>{getRoleName(user.ID_ROL_USUARIO)}</td>
                      <td>{getInstitucionName(user.ID_INSTITUCION_USUARIO)}</td>
                      <td>{user.ESTADO_CUENTA ? 'Activo' : 'Inactivo'}</td>
                      <td>
                        <button
                          onClick={() => openModal(2, user)}
                          className='btn btn-warning me-2'
                          data-bs-toggle='modal'
                          data-bs-target='#modalUser'
                          aria-expanded={false}
                          aria-controls='modalUser'
                        >
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        <button
                          onClick={() => deleteExistingUser(user.ID_USUARIO, user.NOMBRE1_USUARIO)}
                          className='btn btn-danger'
                        >
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='modal fade' id='modalUser' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalLabel'>{title}</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' onClick={handleCloseModal}></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label htmlFor='nombre1' className='form-label'>Primer Nombre</label>
                <input
                  type='text'
                  className='form-control'
                  id='nombre1'
                  onChange={(e) => setNombre1Usuario(e.target.value)}
                  value={nombre1_usuario}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='nombre2' className='form-label'>Segundo Nombre</label>
                <input
                  type='text'
                  className='form-control'
                  id='nombre2'
                  onChange={(e) => setNombre2Usuario(e.target.value)}
                  value={nombre2_usuario}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='apellido1' className='form-label'>Primer Apellido</label>
                <input
                  type='text'
                  className='form-control'
                  id='apellido1'
                  onChange={(e) => setApellido1Usuario(e.target.value)}
                  value={apellido1_usuario}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='apellido2' className='form-label'>Segundo Apellido</label>
                <input
                  type='text'
                  className='form-control'
                  id='apellido2'
                  onChange={(e) => setApellido2Usuario(e.target.value)}
                  value={apellido2_usuario}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='rut' className='form-label'>RUT</label>
                <input
                  type='text'
                  className='form-control'
                  id='rut'
                  onChange={(e) => setRutUsuario(e.target.value)}
                  value={rut_usuario}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='correo' className='form-label'>Correo</label>
                <input
                  type='text'
                  className='form-control'
                  id='correo'
                  onChange={(e) => setEmailUsuario(e.target.value)}
                  value={email_usuario}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='contrasena' className='form-label'>Contraseña</label>
                <input
                  type='password'
                  className='form-control'
                  id='contrasena'
                  onChange={(e) => setContraseniaUsuario(e.target.value)}
                  value={contrasenia_usuario}
                />
              </div>
              <div className='mb-3'>
              <label htmlFor='rol' className='form-label'>Rol</label>
              <select
                className='form-control'
                name='id_rol'
                value={id_rol_usuario}
                onChange={(e) => setIdRolUsuario(e.target.value)}
                style={{ color: 'black' }} // Establece un color para el texto
              >
                <option value=''>Seleccione un rol</option>
                {existingRoles.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.nombre_rol}
                  </option>
                ))}
              </select>
            </div>
            
            
              {/* Select de Instituciones */}
              <div className='mb-3'>
                <label>Institución</label>
                <select
                  className='form-control'
                  name='id_institucion'
                  value={id_institucion_usuario}
                  onChange={(e) => setIdInstitucionUsuario(e.target.value)}
                >
                  <option value=''>Seleccione una institución</option>
                  {instituciones.map((inst) => (
                    <option key={inst.id_institucion} value={inst.id_institucion}>
                      {inst.nombre_institucion}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-3'>
                <label htmlFor='estado' className='form-label'>Estado</label>
                <select
                  className='form-control'
                  value={estado_cuenta}
                  onChange={(e) => setEstadoCuenta(e.target.value)}
                >
                  <option value='true'>Activo</option>
                  <option value='false'>Inactivo</option>
                </select>
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={validar}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
