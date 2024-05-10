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
  changeUserPassword(id, newPassword) {
    return axiosInstance.patch(`/users/changeUserPassword/${id}`, { password: newPassword });
  },
};
