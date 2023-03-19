import axiosClient from "./axiosClient";

const appointmentApi = (params) => axiosClient.post("/registermtg", params);

export default appointmentApi;

//datas: name, email, date, hostAdmin
