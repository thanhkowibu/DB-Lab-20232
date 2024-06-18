import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  const { auth, setAuth } = authContext;

  return { auth, setAuth };
};

export default useAuth;
