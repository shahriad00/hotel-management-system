import Axios from "axios";

const token = localStorage.getItem('accessToken') || '';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:4000/',
  ContentType: "application/json",
  // headers: {'Authorization': `Bearer ${token}`}
});

export default axiosInstance;