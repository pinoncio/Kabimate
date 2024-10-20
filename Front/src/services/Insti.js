// services/Insti.js
import axios from 'axios';

const url = 'http://localhost:3001/api/instituciones';

export const getInstituciones = async () => {
  try {
    const respuesta = await axios.get(`${url}/list`);
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener instituciones:', error);
    throw error;
  }
};

export const createInstitucion = async (institucion) => {
  try {
    const response = await axios.post(url, institucion);
    return response.data;
  } catch (error) {
    console.error('Error al crear la institución:', error);
    throw error;
  }
};

export const updateInstitucion = async (id_institucion, institucion) => {
  try {
    const response = await axios.put(`${url}/update/${id_institucion}`, institucion);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la institución:', error);
    throw error;
  }
};

export const deleteInstitucion = async (id_institucion) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_institucion}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la institución:', error);
    throw error;
  }
};
