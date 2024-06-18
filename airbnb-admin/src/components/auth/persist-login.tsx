import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";

const VERIFY_URL = "/validate-token";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const isFirstRender = useRef(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      const storedAuth = localStorage.getItem("auth");
      if (!storedAuth) {
        setIsLoading(false);
        return;
      }

      const parsedAuth = JSON.parse(storedAuth);

      try {
        const response = await axios.post(
          VERIFY_URL,
          {},
          {
            headers: {
              Authorization: `Bearer ${parsedAuth.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.flag) {
          setAuth(parsedAuth);
        } else {
          localStorage.removeItem("auth");
        }
      } catch (error) {
        console.error("Failed to verify token:", error);
        localStorage.removeItem("auth");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!isFirstRender.current) {
      !auth?.accessToken
        ? verifyRefreshToken()
        : setIsLoading(false);
    } else {
      isFirstRender.current = false;
    }

    return () => {
      isMounted = false;
    };
  }, [auth, setAuth]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
