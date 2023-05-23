import Axios from "axios";

const token = JSON.parse(localStorage.getItem('token')) || '';

const axiosInstance = Axios.create({
  // baseURL: 'http://localhost:4000/',
  baseURL: 'https://hms-backend-6tfp.onrender.com/',
  ContentType: "application/json",
  headers: token ? {'Authorization': `Bearer ${token}`} : null,
  "Access-Control-Allow-Origin": "*",
});

export default axiosInstance;