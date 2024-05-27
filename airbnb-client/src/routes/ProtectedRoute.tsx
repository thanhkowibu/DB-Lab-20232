import { useAuth } from "@/context/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth" state={{ isToggled: false }} replace />
  );
};

export default ProtectedRoute;
