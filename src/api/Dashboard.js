import { axiosInstance } from '.';

export default {
  period(startTime = 0, endTime = 0, computerIdList = []) {
    return axiosInstance.get(
      `/dashboard/period?startTime=${startTime}&endTime=${endTime}&computerIdList=${computerIdList.toString()}`,
    );
  },
};
