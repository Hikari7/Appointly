import axios from "axios";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = `${import.meta.env.VITE_SERVER_PORT}`;

console.log(BASE_URL);

const axiosClient = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});

export default axiosClient;
