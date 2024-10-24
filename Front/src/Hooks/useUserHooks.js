// hooks/useUser.js
import { useEffect, useState } from 'react';
import { show_alerta } from '../functions';
import { getUsers, createUser, updateUser, activateUser, deactivateUser } from '../services/user';
import { getRoles } from '../services/rol';
import { getInstituciones } from '../services/Insti';
import '../Styles/user.css';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [instituciones, setInstitucion] = useState([]);
  const [id_usuario, setIdUsuario] = useState('');
  const [nombre1_usuario, setNombre1Usuario] = useState('');
  const [nombre2_usuario, setNombre2Usuario] = useState('');
  const [apellido1_usuario, setApellido1Usuario] = useState('');
  const [apellido2_usuario, setApellido2Usuario] = useState('');
  const [rut_usuario, setRutUsuario] = useState('');
  const [email_usuario, setEmailUsuario] = useState('');
  const [contrasenia_usuario, setContraseniaUsuario] = useState('');
  const [estado_cuenta, setEstadoCuenta] = useState(true);
  const [id_institucion_usuario, setIdInstitucionUsuario] = useState('');
  const [id_rol_usuario, setIdRolUsuario] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAllUsers();
    fetchAllRoles();
    getAllInstituciones();
  }, []);

  const getAllUsers = async () => {
    try {
      const userData = await getUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchAllRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const getAllInstituciones = async () => {
    try {
      const instiData = await getInstituciones();
      setInstitucion(instiData);
    } catch (error) {
      console.error('Error al obtener instituciones:', error);
    }
  };

  const openModal = (op, id_usuario = '', nombre1_usuario = '', nombre2_usuario = '', 
    apellido1_usuario = '', apellido2_usuario = '', rut_usuario = '', email_usuario = '', contrasenia_usuario = '', 
    id_institucion_usuario = '', id_rol_usuario = '') => {
    console.log("Abriendo modal para ID:", id_usuario, "ID Rol:", id_rol_usuario, "ID Institución:", id_institucion_usuario);
    setIdUsuario(id_usuario);
    setNombre1Usuario(nombre1_usuario);
    setNombre2Usuario(nombre2_usuario);
    setApellido1Usuario(apellido1_usuario);
    setApellido2Usuario(apellido2_usuario);
    setRutUsuario(rut_usuario);
    setEmailUsuario(email_usuario);
    setContraseniaUsuario(contrasenia_usuario);
    setIdInstitucionUsuario(id_institucion_usuario);
    setIdRolUsuario(id_rol_usuario);
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Usuario' : 'Editar Usuario');
  };
  
  const validar = () => {
    console.log('Valores de validación:', {
      nombre1_usuario,
      nombre2_usuario,
      apellido1_usuario,
      apellido2_usuario,
      rut_usuario,
      contrasenia_usuario,
      id_institucion_usuario,
      id_rol_usuario,
    });
    const trimmedIdInstitucion = String(id_institucion_usuario).trim();
    const trimmedIdRol = String(id_rol_usuario).trim();

    if (
      nombre1_usuario.trim() === '' ||
      nombre2_usuario.trim() === '' ||
      apellido1_usuario.trim() === '' ||
      apellido2_usuario.trim() === '' ||
      rut_usuario.trim() === '' ||
      contrasenia_usuario.trim() === '' ||
      trimmedIdInstitucion === '' ||
      trimmedIdRol === ''
    ) {
      show_alerta('Completa los campos requeridos', 'warning');
      return;
    }

    const parametros = {
      nombre1_usuario: nombre1_usuario.trim(),
      nombre2_usuario: nombre2_usuario.trim(),
      apellido1_usuario: apellido1_usuario.trim(),
      apellido2_usuario: apellido2_usuario.trim(),
      rut_usuario: rut_usuario.trim(),
      email: email_usuario.trim(),
      contrasenia: contrasenia_usuario.trim(),
      id_institucion_usuario: id_institucion_usuario.trim() || null,  
      id_rol_usuario: id_rol_usuario.trim() || null,  
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
      show_alerta(response.msg, 'suaccess');
      document.getElementById('btnCerrar').click();
      getAllUsers();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      show_alerta('Error al crear el usuario', 'error');
    }
  };

  const updateExistingUser = async (id_usuario, user) => {
    console.log("Actualizando usuario con ID:", id_usuario, "Datos:", user);
    
    try {
      await updateUser(id_usuario, user);
      show_alerta('El usuario fue editado con éxito.', 'success');
      document.getElementById('btnCerrar').click();
      getAllUsers();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      show_alerta('Error al actualizar el usuario', 'error');
    }
  };

  // Nueva función toggleUserStatus
  const toggleUserStatus = async (id_usuario) => {
    try {
      const user = users.find(user => user.ID_USUARIO === id_usuario);
      if (!user) {
        show_alerta('Usuario no encontrado', 'error');
        return;
      }

      let response;
      if (user.estado_cuenta) {
        response = await deactivateUser(id_usuario);
      } else {
        response = await activateUser(id_usuario);
      }

      show_alerta(response.msg, 'success');
      getAllUsers();
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
      show_alerta('Error al cambiar el estado del usuario', 'error');
    }
  };

  const getRoleName = (id_rol) => {
    const role = roles.find((r) => r.ID_ROL === id_rol);
    return role ? role.NOMBRE_ROL : 'Sin Rol';
  };

  const getInstitucionName = (id_institucion) => {
    const institucion = instituciones.find((i) => i.ID_INSTITUCION === id_institucion);
    return institucion ? institucion.NOMBRE_INSTITUCION : 'Sin Institución';
  };

  return {
    users,
    roles,
    instituciones,
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
    openModal,
    validar,
    getAllUsers,
    fetchAllRoles,
    getAllInstituciones,
    getRoleName,
    getInstitucionName,
    toggleUserStatus,
  };
};

export default useUser;
