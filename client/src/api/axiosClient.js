import axios from "axios";

const BASE_URL = "http://localhost:8000";

console.log(BASE_URL);

const axiosClient = axios.create({
  baseURL: BASE_URL,
});


export default axiosClient;


// import axios from "axios";
//
// export default axios.create({
//   baseURL: "http://localhost:4000",
//   headers: {
//     "Content-Type": "application/json",
//     "X-Requested-With": "XMLHttpRequest",
//     Accept: "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
//   responseType: "json",
// });