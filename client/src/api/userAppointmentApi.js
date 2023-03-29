import axiosClient from "./axiosClient";

const userAppointmentApi = (params) => {
  getAvail: () => axiosClient.get("user/:uid/getappointment");
  set: (params) => axiosClient.post("user/setavailability", params);
  update: (params) => axiosClient.put("user/:appointmentid/reschedule", params);
  deleteOne: (params) =>
    axiosClient.delete("user/:appointmentid/deleteappointment", params);
};

export default userAppointmentApi;
