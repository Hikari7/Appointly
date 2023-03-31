import axiosClient from "./axiosClient";

const userAppointmentApi = {
  getAll: (uid) => axiosClient.get(`user/${uid}/getappointment`),
  getAvailability: (uid) => axiosClient.get(`user/${uid}/getavailability`),
  set: (uid, params) => axiosClient.post(`user/${uid}/setavailability`, params),
  update: (params) => axiosClient.put("user/:appointmentid/reschedule", params),
  deleteOne: (params) =>
    axiosClient.delete("user/:appointmentid/deleteappointment", params)
};

export default userAppointmentApi;
