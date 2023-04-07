import axiosClient from "./axiosClient";

const guestAppointmentApi = (params) =>
  axiosClient.post("appointment/registermtg", params);

export default guestAppointmentApi;
