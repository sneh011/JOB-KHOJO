import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://job-search-rr82.onrender.com",
    withCredentials: true   // 🔥 IMPORTANT
});

export default axiosInstance;