// services/institucion.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/instituciones';

export const getInstituciones = () => axios.get(`${API_URL}/list`);
