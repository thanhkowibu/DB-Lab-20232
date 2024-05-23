import authApi from "@/api/modules/auth.api";
import { ContextProps, ContextProviderProps } from "@/types/global.types";
import {
  LoginInfoProps,
  RegisterReqProps,
  LoginReqProps,
  UserProps,
} from "@/types/users.types";
import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({} as ContextProps);

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsLoading(false);
  }, []);

  const registerUser = async ({
    firstname,
    lastname,
    email,
    password,
  }: RegisterReqProps) => {
    const res = await authApi.register({
      firstname,
      lastname,
      email,
      password,
    });
    if (res) {
    }
  };

  const loginUser = async ({ email, password }: LoginReqProps) => {
    try {
      const res = await authApi.login({ email, password });
      if (res) {
        const { data }: { data: LoginInfoProps } = res;
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user_info));
        setToken(data.access_token);
        setUser(data.user_info);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        loginUser,
        registerUser,
        logoutUser,
        isLoading,
      }}
    >
      {!isLoading && children}
    </GlobalContext.Provider>
  );
};

export const useAuth = () => React.useContext(GlobalContext);
