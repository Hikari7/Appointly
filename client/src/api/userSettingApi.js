import axiosClient from "./axiosClient";

const userSettingApi = {
  updateUserInfo: (uid, params) => axiosClient.put(`user/${uid}/updateuserinfo`, params),
  updatePassword: (uid, params) =>
    axiosClient.put(`/user/${uid}/updatepassword`, params),
};

export default userSettingApi;
