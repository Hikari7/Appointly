import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_PORT}`;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});

export default axiosClient;
