import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import Navbar from '../components/Navbar';
import { getRoles, createRol, updateRol, deleteRol } from '../services/rol'; 
import '../Styles/insti.css';

const RolPage = () => {
  const [roles, setRoles] = useState([]);
  const [id_rol, setIdRol] = useState('');
  const [nombre_rol, setNombreRol] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const respuesta = await getRoles();
      console.log('Datos de roles:', respuesta);
      setRoles(respuesta);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const openModal = (op, id_rol, nombre_rol) => {
    setIdRol(id_rol || '');
    setNombreRol(nombre_rol || '');
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Rol' : 'Editar Rol');
    setTimeout(() => {
      document.getElementById('nombre').focus();
    }, 500);
  };

  const validar = () => {
    if (nombre_rol.trim() === '') {
      show_alerta('Escribe el nombre del rol', 'warning');
      return;
    }

    const parametros = { nombre_rol: nombre_rol.trim() };
    if (operation === 1) {
      createNewRol(parametros);
    } else {
      updateExistingRol(id_rol, parametros);
    }
  };

  const createNewRol = async (rol) => {
    try {
      const response = await createRol(rol);
      console.log('Rol creado:', response);
      show_alerta(response.msg, 'success');
      document.getElementById('btnCerrar').click();
      getAllRoles();
    } catch (error) {
      console.error('Error al crear rol:', error);
      show_alerta('Error al crear el rol', 'error');
    }
  };

  const updateExistingRol = async (id_rol, rol) => {
    try {
      const response = await updateRol(id_rol, rol);
      console.log('Rol actualizado:', response);
      show_alerta('El rol fue editado con éxito.', 'success');
      document.getElementById('btnCerrar').click();
      getAllRoles();
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      show_alerta('Error al actualizar el rol', 'error');
    }
  };

  const deleteExistingRol = (id_rol, nombre_rol) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Está seguro/a de eliminar el rol ${nombre_rol}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteRol(id_rol);
          console.log('Rol eliminado:', response);
          show_alerta('El rol fue eliminado con éxito.', 'success');
          getAllRoles();
        } catch (error) {
          console.error('Error al eliminar rol:', error);
          show_alerta('Error al eliminar el rol', 'error');
        }
      } else {
        show_alerta('El rol NO fue eliminado', 'info');
      }
    });
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
                data-bs-target='#modalRoles'
              >
                <i className='fa fa-plus-circle mt-2'></i> Añadir Rol
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
                    <th>NOMBRE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {roles.map((rol, i) => (
                    <tr key={rol.ID_ROL}>
                      <td>{i + 1}</td>
                      <td>{rol.NOMBRE_ROL}</td>
                      <td>
                        <button onClick={() => openModal(2, rol.ID_ROL ,rol.NOMBRE_ROL)}
                          className='btn btn-warning btn-custom' data-bs-toggle='modal' data-bs-target='#modalRoles'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => deleteExistingRol(rol.ID_ROL, rol.NOMBRE_ROL)}
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

      <div id='modalRoles' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id' />
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-gift'></i>
                </span>
                <input
                  type='text'
                  id='nombre'
                  className='form-control'
                  placeholder='Nombre del Rol'
                  value={nombre_rol}
                  onChange={(e) => setNombreRol(e.target.value)}
                />
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolPage;
