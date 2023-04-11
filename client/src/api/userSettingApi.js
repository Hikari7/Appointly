import axiosClient from "./axiosClient";

const userSettingApi = {
  // update: (uid, params) => axiosClient.put(`/user/${uid}/edituserinfo`, params),
  // reset: (uid, params) =>
  //   axiosClient.post(`/user/${uid}/resetpassword`, params),
  updateUserInfo: (uid, params) => axiosClient.put(`user/${uid}/updateuserinfo`, params),
};

export default userSettingApi;
