import { Outlet, useNavigate } from "react-router-dom";
// import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const ProtectedRouteFallBack = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  useEffect(() => {
    if (!auth?.accessToken) {
      setAuth({
        accessToken: undefined,
        user: undefined,
      });
      navigate("/login");
    }
  }, [navigate, setAuth, auth]);

  return <Outlet />;
};

export default ProtectedRouteFallBack;
