import axiosClient from "./axiosClient";

const userSettingApi = {
  update: (params) => axiosClient.put("/user/edituserinfo", params),
  reset: (params) => axiosClient.post("/user/resetpassword", params),
};

export default userSettingApi;
