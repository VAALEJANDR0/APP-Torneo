import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.196/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
