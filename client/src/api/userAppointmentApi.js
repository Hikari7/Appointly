import axiosClient from "./axiosClient";

// const userAppointmentApi = (params) => {
//   getAll: (params) => axiosClient.get("user/:uid/getappointment", params);
//   set: (params) => axiosClient.post("user/setavailability", params);
//   update: (params) => axiosClient.put("user/:appointmentid/reschedule", params);
//   deleteOne: (params) =>
//     axiosClient.delete("user/:appointmentid/deleteappointment", params);
// };

const userAppointmentApi = {
  getAll: (params) => axiosClient.get("user/:uid/getappointment", params),
  set: (params) => axiosClient.post("user/setavailability", params),
  update: (params) => axiosClient.put("user/:appointmentid/reschedule", params),
  deleteOne: (params) =>
    axiosClient.delete("user/:appointmentid/deleteappointment", params)
};

export default userAppointmentApi;
