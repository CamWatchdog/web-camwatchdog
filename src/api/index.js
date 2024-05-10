import axios from 'axios';

export const axiosInstance = axios.create({});
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_ADDRESS;

export default {
  login(username, password) {
    return axiosInstance.post('/login', { username, password }).then((res) => {
      localStorage.setItem('token', res.data.access_token);
      return res.data;
    });
  },
};
