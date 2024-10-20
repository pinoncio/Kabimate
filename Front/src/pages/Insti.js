import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import Navbar from '../components/Navbar';
import { getInstituciones, createInstitucion, updateInstitucion, deleteInstitucion } from '../services/Insti'; 
import '../Styles/insti.css';

const Insti = () => {
  const [institucion, setInstitucion] = useState([]);
  const [id_instituciones, setId] = useState('');
  const [nombre_institucion, setName] = useState('');
  const [tipo_institucion, setType] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAllInstituciones();
  }, []);

  const getAllInstituciones = async () => {
    try {
      const respuesta = await getInstituciones();
      console.log('Datos de instituciones:', respuesta);
      setInstitucion(respuesta);
    } catch (error) {
      console.error('Error al obtener instituciones:', error);
    }
  };

  const openModal = (op, id_instituciones, nombre_institucion, tipo_institucion) => {
    setId(id_instituciones || '');
    setName(nombre_institucion || '');
    setType(tipo_institucion || '');
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Institución' : 'Editar Institución');
    window.setTimeout(() => {
      document.getElementById('nombre').focus();
    }, 500);
  };

  const validar = () => {
    if (nombre_institucion.trim() === '') {
      show_alerta('Escribe el nombre de la institución', 'warning');
      return;
    } else if (tipo_institucion.trim() === '') {
      show_alerta('Escribe el tipo de institución', 'warning');
      return;
    }

    const parametros = { nombre_institucion: nombre_institucion.trim(), tipo_institucion: tipo_institucion.trim() };
    
    if (operation === 1) {
      createNewInstitucion(parametros);
    } else {
      updateExistingInstitucion(id_instituciones, parametros);
    }
  };

  const createNewInstitucion = async (institucion) => {
    console.log('Datos a enviar para crear:', institucion);
    try {
      const response = await createInstitucion(institucion);
      console.log('Respuesta al crear institución:', response); 
      show_alerta(response.msg, 'success'); 
      document.getElementById('btnCerrar').click();
      getAllInstituciones();
    } catch (error) {
      console.error('Error al crear la institución:', error);
      show_alerta('Error al crear la institución', 'error');
    }
  };

  const updateExistingInstitucion = async (id_institucion, institucion) => {
    console.log('Datos a enviar para actualizar:', institucion);
    
    try {
      const response = await updateInstitucion(id_institucion, institucion);
      console.log('Respuesta al actualizar institución:', response); 
      show_alerta('La institución fue editada con éxito.', 'success');
      document.getElementById('btnCerrar').click();
      getAllInstituciones();
    } catch (error) {
      console.error('Error al actualizar la institución:', error); 
      show_alerta('Error al actualizar la institución', 'error');
    }
  };

  const deleteExistingInstitucion = (id_institucion, nombre_institucion) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Está seguro/a de eliminar la Institución ${nombre_institucion}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteInstitucion(id_institucion); // Usa la función del servicio
          show_alerta('La institución fue eliminada con éxito.', 'success');
          getAllInstituciones(); 
        } catch (error) {
          console.error('Error al eliminar la institución:', error); 
          show_alerta('Error al eliminar la institución', 'error');
        }
      } else {
        show_alerta('La institución NO fue eliminada', 'info');
      }
    });
  };

  return (
    <div className='App'>
      <Navbar />
      <hr></hr>
      <div className='container-fluid mt-5'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalInstituciones'>
                <i className='fa-solid fa-circle-plus'></i> Añadir
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
                    <th>INSTITUCIÓN</th>
                    <th>NOMBRE</th>
                    <th>TIPO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {institucion.map((inst, i) => (
                    <tr key={inst.ID_INSTITUCION}>
                      <td>{i + 1}</td>
                      <td>{inst.NOMBRE_INSTITUCION}</td>
                      <td>{inst.TIPO_INSTITUCION}</td>
                      <td>
                        <button onClick={() => openModal(2, inst.ID_INSTITUCION, inst.NOMBRE_INSTITUCION, inst.TIPO_INSTITUCION)}
                          className='btn btn-warning btn-custom' data-bs-toggle='modal' data-bs-target='#modalInstituciones'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button onClick={() => deleteExistingInstitucion(inst.ID_INSTITUCION, inst.NOMBRE_INSTITUCION)} className='btn btn-danger'>
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
      <div id='modalInstituciones' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='nombre' className='form-control' placeholder='Nombre de la Institución' value={nombre_institucion}
                  onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='tipo' className='form-control' placeholder='Tipo de Institución' value={tipo_institucion}
                  onChange={(e) => setType(e.target.value)}></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insti;
