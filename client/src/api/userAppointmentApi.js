import axiosClient from "./axiosClient";

const userAppointmentApi = {
  getAll: (uid) => axiosClient.get(`user/${uid}/getappointment`),
  getAvailability: (uid) => axiosClient.get(`user/${uid}/getavailability`),
  set: (uid, params) => axiosClient.post(`user/${uid}/setavailability`, params),
  updateMTG: (appointmentID, params) => axiosClient.put(`user/${appointmentID}/reschedule`, params),
  deleteMTG: (appointmentID) =>
    axiosClient.delete(`user/${appointmentID}/deleteappointment`)
};

export default userAppointmentApi;
