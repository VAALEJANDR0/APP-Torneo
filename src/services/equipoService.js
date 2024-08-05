import axiosInstance from '../config/axiosConfig';

const getEquipos = async () => {
  try {
    const response = await axiosInstance.get('/equipos');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipos:', error);
    throw error;
  }
};

const addEquipo = async (equipo) => {
  try {
    const response = await axiosInstance.post('/equipos', equipo);
    return response.data;
  } catch (error) {
    console.error('Error adding equipo:', error);
    throw error;
  }
};

const updateEquipo = async (id, equipo) => {
  try {
    const response = await axiosInstance.put(`/equipos/${id}`, equipo);
    return response.data;
  } catch (error) {
    console.error('Error updating equipo:', error);
    throw error;
  }
};

const deleteEquipo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/equipos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting equipo:', error);
    throw error;
  }
};

export default {
  getEquipos,
  addEquipo,
  updateEquipo,
  deleteEquipo,
};
