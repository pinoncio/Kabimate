// hooks/useUser.js
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user';
import { getRoles } from '../services/rol';
import { getInstituciones } from '../services/Insti';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [instituciones, setInstitucion] = useState([]);
  const [existingRoles, setExistingRoles] = useState([]); // Nuevo estado para roles existentes
  const [existingInstituciones, setExistingInstituciones] = useState([]); // Nuevo estado para instituciones existentes
  const [id_usuario, setIdUsuario] = useState('');
  const [nombre1_usuario, setNombre1Usuario] = useState('');
  const [nombre2_usuario, setNombre2Usuario] = useState('');
  const [apellido1_usuario, setApellido1Usuario] = useState('');
  const [apellido2_usuario, setApellido2Usuario] = useState('');
  const [rut_usuario, setRutUsuario] = useState('');
  const [contrasenia_usuario, setContraseniaUsuario] = useState('');
  const [email_usuario, setEmailUsuario] = useState('');
  const [estado_cuenta, setEstadoCuenta] = useState(true);
  const [id_institucion_usuario, setIdInstitucionUsuario] = useState('');
  const [id_rol_usuario, setIdRolUsuario] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAllUsers();
    getAllRoles();
    getAllInstituciones();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const getAllRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
      fetchRolesInstituciones(rolesData, instituciones); // Llamar a la función aquí
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const getAllInstituciones = async () => {
    try {
      const respuesta = await getInstituciones();
      setInstitucion(respuesta);
      fetchRolesInstituciones(roles, respuesta); // Llamar a la función aquí
    } catch (error) {
      console.error('Error al obtener instituciones:', error);
    }
  };

  const fetchRolesInstituciones = (rolesData, institucionesData) => {
    // Crear arrays de roles e instituciones existentes
    const rolesArray = rolesData.map(role => ({
      id_rol: role.ID_ROL,       // Asegúrate de que esto coincide con tu API
      nombre_rol: role.NOMBRE_ROL // Ajusta según la estructura de tu API
    }));
  
    const institucionesArray = institucionesData.map(institucion => ({
      id_institucion: institucion.ID_INSTITUCION, // Asegúrate de que esto coincide con tu API
      nombre_institucion: institucion.NOMBRE_INSTITUCION // Ajusta según la estructura de tu API
    }));
  
    // Actualizar los estados con los arrays creados
    setExistingRoles(rolesArray);
    setExistingInstituciones(institucionesArray);
  };
  
  

  const openModal = (op, usuario = {}) => {
    setIdUsuario(usuario.ID_USUARIO || '');
    setNombre1Usuario(usuario.NOMBRE1_USUARIO || '');
    setNombre2Usuario(usuario.NOMBRE2_USUARIO || '');
    setApellido1Usuario(usuario.APELLIDO1_USUARIO || '');
    setApellido2Usuario(usuario.APELLIDO2_USUARIO || '');
    setRutUsuario(usuario.RUT_USUARIO || '');
    setContraseniaUsuario(usuario.CONTRASENIA_USUARIO || '');
    setEmailUsuario(usuario.EMAIL_USUARIO || '');
    setEstadoCuenta(usuario.ESTADO_CUENTA || false);
    setIdInstitucionUsuario(usuario.ID_INSTITUCION_USUARIO || '');
    setIdRolUsuario(usuario.ID_ROL_USUARIO || '');

    setOperation(op);
    setTitle(op === 1 ? 'Registrar Usuario' : 'Editar Usuario');
    setTimeout(() => document.getElementById('nombre1').focus(), 500);
  };

  const validar = () => {
    if (nombre1_usuario.trim() === '' || nombre2_usuario.trim() === '' || apellido1_usuario.trim() === '' || apellido2_usuario.trim() === '' || rut_usuario.trim() === '' || contrasenia_usuario.trim() === '') {
      show_alerta('Completa los campos requeridos', 'warning');
      return;
    }

    const parametros = {
      nombre1_usuario: nombre1_usuario.trim(),
      nombre2_usuario: nombre2_usuario.trim(),
      apellido1_usuario: apellido1_usuario.trim(),
      apellido2_usuario: apellido2_usuario.trim(),
      rut_usuario: rut_usuario.trim(),
      contrasenia_usuario: contrasenia_usuario.trim(),
      email_usuario: email_usuario.trim(),
      estado_cuenta: estado_cuenta,
      id_institucion_usuario: id_institucion_usuario.trim(),
      id_rol_usuario: id_rol_usuario.trim(),
    };

    if (operation === 1) {
      createNewUser(parametros);
    } else {
      updateExistingUser(id_usuario, parametros);
    }
  };

  const createNewUser = async (user) => {
    try {
      const response = await createUser(user);
      show_alerta(response.msg, 'success');
      document.getElementById('btnCerrar').click();
      getAllUsers();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      show_alerta('Error al crear el usuario', 'error');
    }
  };

  const updateExistingUser = async (id, user) => {
    try {
      const response = await updateUser(id, user);
      show_alerta('El usuario fue editado con éxito.', 'success');
      document.getElementById('btnCerrar').click();
      getAllUsers();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      show_alerta('Error al actualizar el usuario', 'error');
    }
  };

  const deleteExistingUser = (id, nombre) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Está seguro/a de eliminar al usuario ${nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          show_alerta('El usuario fue eliminado con éxito.', 'success');
          getAllUsers();
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
          show_alerta('Error al eliminar el usuario', 'error');
        }
      } else {
        show_alerta('El usuario NO fue eliminado', 'info');
      }
    });
  };

  const getRoleName = (id) => {
    const role = roles.find((r) => r.ID_ROL === id);
    return role ? role.NOMBRE_ROL : 'Sin Rol';
  };

  const getInstitucionName = (id) => {
    const institucion = instituciones.find((i) => i.ID_INSTITUCION === id);
    return institucion ? institucion.NOMBRE_INSTITUCION : 'Sin Institución';
  };
   
  return {
    users,
    roles,
    instituciones,
    existingRoles, // Devuelve el array de roles existentes
    existingInstituciones, // Devuelve el array de instituciones existentes
    id_usuario,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
    rut_usuario,
    contrasenia_usuario,
    email_usuario,
    estado_cuenta,
    id_institucion_usuario,
    id_rol_usuario,
    operation,
    title,
    openModal,
    validar,
    deleteExistingUser,
    setIdUsuario,
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
    getRoleName,
    getInstitucionName,
    fetchRolesInstituciones
  };
};

export default useUser;
