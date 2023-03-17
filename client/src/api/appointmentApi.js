import axiosClient from "./axiosClient";

const appointmentApi = (params) => axiosClient.post("/registermtg", params);

export default appointmentApi;

//data: name, email, date, hostAdmin
