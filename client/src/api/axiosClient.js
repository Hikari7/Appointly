import axios from "axios";

const BASE_URL = "http://localhost:8000";

console.log(BASE_URL);

const axiosClient = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});

export default axiosClient;
