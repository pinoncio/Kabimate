
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/usuarios';

export const getUsers = () => axios.get(`${API_URL}/list`);

export const getUser = (id_usuario) => axios.get(`${API_URL}/${id_usuario}`);

export const CreateUser = (user) => axios.post(API_URL, user);

export const updateUser = async (id_usuario, user) => {
    try {
      const response = await axios.put(`${API_URL}/${id_usuario}`, user);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  };
  

export const deleteUser = (id_usuario) => axios.delete(`${API_URL}/${id_usuario}`);