import axiosInstance from '../config/axiosConfig';

const getResultados = async () => {
  try {
    const response = await axiosInstance.get('/resultados');
    return response.data;
  } catch (error) {
    console.error('Error fetching resultados:', error);
    throw error;
  }
};

const addResultado = async (resultado) => {
  try {
    const response = await axiosInstance.post('/resultados', resultado);
    return response.data;
  } catch (error) {
    console.error('Error adding resultado:', error);
    throw error;
  }
};

const updateResultado = async (id, resultado) => {
  try {
    const response = await axiosInstance.put(`/resultados/${id}`, resultado);
    return response.data;
  } catch (error) {
    console.error('Error updating resultado:', error);
    throw error;
  }
};

const deleteResultado = async (id) => {
  try {
    const response = await axiosInstance.delete(`/resultados/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resultado:', error);
    throw error;
  }
};

const getResultadosPorPartido = async (partidoId) => {
  try {
    const response = await axiosInstance.get(`/partidos/${partidoId}/resultado`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resultados por partido:', error);
    throw error;
  }
};

const getResultadosPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/resultados`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resultados por equipo:', error);
    throw error;
  }
};

export default {
  getResultados,
  addResultado,
  updateResultado,
  deleteResultado,
  getResultadosPorPartido,
  getResultadosPorEquipo,
};
