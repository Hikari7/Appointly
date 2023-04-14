import axiosClient from "./axiosClient";

const userAppointmentApi = {
  getAll: (uid) => axiosClient.get(`user/${uid}/getappointment`),
  getAvailability: (uid) => axiosClient.get(`user/${uid}/getavailability`),
  set: (uid, params) => axiosClient.post(`user/${uid}/setavailability`, params),
  updateMTG: (appointmentID, params) => axiosClient.put(`user/${appointmentID}/reschedule`, params),
  deleteMTG: (appointmentID, params) =>
    axiosClient.delete(`user/${appointmentID}/deleteappointment`, params)
};

export default userAppointmentApi;
