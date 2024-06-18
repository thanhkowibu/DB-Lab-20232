import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({
      accessToken: undefined,
      user: undefined,
    });
  };

  return logout;
};

export default useLogout;
