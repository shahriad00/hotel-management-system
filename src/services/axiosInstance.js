import Axios from "axios";

const axiosInstance = Axios.create({
  // development
  baseURL: "http://localhost:4000/",
  // production
  // baseURL: "http://example.com/",
  withCredentials: false,
  "Content-Type": "application/json",
  headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;