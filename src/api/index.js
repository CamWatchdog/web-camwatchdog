import axios from 'axios';
import Users from './Users';
import Occurence from './Occurence';
import Computer from './Computer';

export const axiosInstance = axios.create({});
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_ADDRESS;

export default {
  login(username, password) {
    return axiosInstance.post('/login', { username, password }).then((res) => {
      localStorage.setItem('token', res.data.access_token);
      return res.data;
    });
  },
  Users,
  Occurence,
  Computer,
};
