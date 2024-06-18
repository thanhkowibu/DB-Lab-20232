import axios from "../api/axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept =
      axios.interceptors.response.use(
        (response) => {
          // the first time
          if (
            response.data &&
            response.data.flag !== undefined
          ) {
            if (response.data.flag === false) {
              throw new Error(response.data.message);
            }
            return response.data;
          } else {
            return response;
          }
        },
        (error) => Promise.reject(error)
      );

    return () => {
      axios.interceptors.response.eject(responseIntercept);
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axios;
};

export default useAxiosPrivate;
