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

  config.headers['Authorization'] =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmVsaXBpbiIsImlkIjoyLCJjcGYiOiIxMzI4NzczMzk2NiIsImVtYWlsIjoiZi5hLmphbm90dGVAZ21haWwuY29tIiwiaWF0IjoxNzE2MzI5OTAzLCJleHAiOjE3MTYzNDQzMDN9.eq7viMG1DUISwRxuMbE4k12X4d90YZf64B-BYggeEGU';

  console.log(config);
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
