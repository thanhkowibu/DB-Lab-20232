import { useAuth } from "@/context/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

const HostRoute = ({ children }: Props) => {
  const { user } = useAuth();
  return user && user.roles && user.roles.includes("host") ? (
    <>{children}</>
  ) : (
    <Navigate to="/host/home" replace />
  );
};

export default HostRoute;
