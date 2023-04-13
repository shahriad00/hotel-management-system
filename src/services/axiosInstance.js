import Axios from "axios";

const token = JSON.parse(localStorage.getItem('token')) || '';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:4000/',
  ContentType: "application/json",
  headers: token ? {'Authorization': `Bearer ${token}`} : null
});

export default axiosInstance;