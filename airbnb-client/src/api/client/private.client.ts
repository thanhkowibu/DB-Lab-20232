import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "http://localhost:8080/api/v1/";

const privateClient = axios.create({
  baseURL,
});

privateClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Your login session has expired");
    return config;
  }
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
