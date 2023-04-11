import axiosClient from "./axiosClient";

const userAppointmentApi = {
  getAll: (uid) => axiosClient.get(`user/${uid}/getappointment`),
  getAvailability: (uid) => axiosClient.get(`user/${uid}/getavailability`),
  set: (uid, params) => axiosClient.post(`user/${uid}/setavailability`, params),
  updateMTG: (appointmentId, params) => axiosClient.put(`user/${appointmentId}/reschedule`, params),
  deleteMTG: (appointmentId, params) =>
    axiosClient.delete(`user/${appointmentId}/deleteappointment`, params)
};

export default userAppointmentApi;
