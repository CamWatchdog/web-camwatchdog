import axios from 'axios';
import Users from './Users';
import Occurence from './Occurence';
import Computer from './Computer';

export const axiosInstance = axios.create({});
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_ADDRESS;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default {
  login(username, password) {
    return axiosInstance.post('/login', { username, password }).then((res) => {
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('userLogged', res.data.user);
      return res.data;
    });
  },
  Users,
  Occurence,
  Computer,
};
