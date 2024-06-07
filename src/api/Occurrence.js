import { axiosInstance } from '.';

export default {
  findAll(username = '', pageSize = 10, page = 1, endTime = 0, startTime = 0) {
    return axiosInstance.get(
      `/api/findAll?username=${username}&pageSize=${pageSize}&page=${page}&endTime=${endTime}&startTime=${startTime}`,
    );
  },
};
