import { axiosInstance } from '.';

export default {
  findAll(search = '', pageSize = 10, page = 1, endTime = null, startTime = null) {
    return axiosInstance.get(
      `/occurence?search=${search}&pageSize=${pageSize}&page=${page}&endTime=${endTime}&startTime=${startTime}`,
    );
  },
};
