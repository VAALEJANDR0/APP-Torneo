import axiosInstance from '../config/axiosConfig';

const getJugadores = async () => {
  try {
    const response = await axiosInstance.get('/jugadores');
    return response.data;
  } catch (error) {
    console.error('Error fetching jugadores:', error);
    throw error;
  }
};

const addJugador = async (jugador) => {
  try {
    const response = await axiosInstance.post('/jugadores', jugador);
    return response.data;
  } catch (error) {
    console.error('Error adding jugador:', error);
    throw error;
  }
};

const updateJugador = async (id, jugador) => {
  try {
    const response = await axiosInstance.put(`/jugadores/${id}`, jugador);
    return response.data;
  } catch (error) {
    console.error('Error updating jugador:', error);
    throw error;
  }
};

const deleteJugador = async (id) => {
  try {
    const response = await axiosInstance.delete(`/jugadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jugador:', error);
    throw error;
  }
};

export default {
  getJugadores,
  addJugador,
  updateJugador,
  deleteJugador,
};
