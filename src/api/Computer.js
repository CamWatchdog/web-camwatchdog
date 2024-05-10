import { axiosInstance } from '.';

export default {
  create(computer) {
    return axiosInstance.post('/computer', computer);
  },
  findOne(id) {
    return axiosInstance.get(`/computer/${id}`);
  },
  findAll(search = '', pageSize = 10, page = 1) {
    return axiosInstance.get(`/computer?search=${search}&pageSize=${pageSize}&page=${page}`);
  },
  update(id, computer) {
    return axiosInstance.patch(`/computer/${id}`, computer);
  },
  delete(id) {
    return axiosInstance.delete(`/computer/${id}`);
  },
};
