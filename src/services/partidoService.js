import axiosInstance from '../config/axiosConfig';

const getPartidos = async () => {
  try {
    const response = await axiosInstance.get('/partidos');
    return response.data;
  } catch (error) {
    console.error('Error fetching partidos:', error);
    throw error;
  }
};

const addPartido = async (partido) => {
  try {
    const response = await axiosInstance.post('/partidos', partido);
    return response.data;
  } catch (error) {
    console.error('Error adding partido:', error);
    throw error;
  }
};

const updatePartido = async (id, partido) => {
  try {
    const response = await axiosInstance.put(`/partidos/${id}`, partido);
    return response.data;
  } catch (error) {
    console.error('Error updating partido:', error);
    throw error;
  }
};

const deletePartido = async (id) => {
  try {
    const response = await axiosInstance.delete(`/partidos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting partido:', error);
    throw error;
  }
};

export default {
  getPartidos,
  addPartido,
  updatePartido,
  deletePartido,
};
