import axiosClient from "./axiosClient";

const userSettingApi = {
  updateUserInfo: (uid, params) =>
    axiosClient.put(`user/${uid}/updateuserinfo`, params),
};

export default userSettingApi;
