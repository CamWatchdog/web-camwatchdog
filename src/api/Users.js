import { axiosInstance } from '.';

export default {
  create(user) {
    return axiosInstance.post('/users', user);
  },
  findOne(id) {
    return axiosInstance.get(`/users/${id}`);
  },
  findAll(search = '', pageSize = 10, page = 1) {
    return axiosInstance.get(`/users?search=${search}&pageSize=${pageSize}&page=${page}`);
  },
  update(id, user) {
    return axiosInstance.patch(`/users/${id}`, user);
  },
  delete(id) {
    return axiosInstance.delete(`/users/${id}`);
  },
  generateAndSendNewResetCode(email) {
    return axiosInstance.post('/users/sendResetCode', { email: email });
  },
  verifyResetPasswordCode(email, resetCode, password, confirmPassword) {
    return axiosInstance.post('/users/verifyResetCode', { email: email, resetCode: resetCode, password: password, confirmPassword: confirmPassword });
  }
};
