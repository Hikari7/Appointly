import axiosClient from "./axiosClient";

const userSettingApi = {
  update: (uid, params) => axiosClient.put(`/user/${uid}/edituserinfo`, params),
  updatePassword: (uid, params) =>
    axiosClient.put(`/user/${uid}/updatepassword`, params),
};

export default userSettingApi;
