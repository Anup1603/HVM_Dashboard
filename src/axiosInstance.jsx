import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hvm-backend.onrender.com",
});

export default axiosInstance;
