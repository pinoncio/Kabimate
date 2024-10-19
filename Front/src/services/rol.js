import axios from 'axios';

const API_URL = 'http://localhost:3001/api/roles';

// Obtener todos los roles
export const getRoles = () => axios.get(`${API_URL}/list`);

// Crear un nuevo rol
export const createRol = (rol) => axios.post(API_URL, rol);

// Actualizar un rol existente
export const updateRol = (id_rol, rol) => axios.put(`${API_URL}/update`, { id_rol, ...rol });

// Eliminar un rol
export const deleteRol = (id_rol) => axios.delete(`${API_URL}/delete/${id_rol}`);
