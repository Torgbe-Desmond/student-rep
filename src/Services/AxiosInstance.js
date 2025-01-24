import axios from "axios";
const url = [
  "https://file-transfer-app-backend.vercel.app/api/v1",
  "http://localhost:5000/api/v1",
];

const axiosInstance = axios.create({
  baseURL: url[1],
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.stringify(token)}`;
    }
    return config;
  },
  (error) => {
    console.log("configuration error", error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.status === 401) {
      console.log("response in here");
      localStorage.setItem("Unauthorized", JSON.stringify({ status: true }));
    } else {
      localStorage.setItem("Unauthorized", JSON.stringify({ status: false }));
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("Unauthorized", JSON.stringify({ status: true }));
    } else {
      localStorage.setItem("Unauthorized", JSON.stringify({ status: false }));
    }

    if (error) {
      throw error;
    }
  }
);

export default axiosInstance;
