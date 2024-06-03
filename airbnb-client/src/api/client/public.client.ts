import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/";

const publicClient = axios.create({
  baseURL,
});

publicClient.interceptors.request.use((config: any) => {
  return {
    ...config,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
