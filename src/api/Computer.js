import { axiosInstance } from '.';

export default {
  create(computer) {
    return axiosInstance.post('/computer', computer);
  },
  findOne(id) {
    return axiosInstance.get(`/computer/${id}`);
  },
  findAll(description = '', pageSize = 10, page = 1, startTime = 0, endTime = 0) {
    return axiosInstance.get(
      `/computer?description=${description}&pageSize=${pageSize}&page=${page}&startTime=${startTime}&endTime=${endTime}`,
    );
  },
  update(id, computer) {
    return axiosInstance.patch(`/computer/${id}`, computer);
  },
  delete(id) {
    return axiosInstance.delete(`/computer/${id}`);
  },
};
