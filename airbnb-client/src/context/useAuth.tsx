import authApi from "@/api/modules/auth.api";
import { ContextProps, ContextProviderProps } from "@/types/global.types";
import {
  LoginInfoProps,
  RegisterReqProps,
  LoginReqProps,
  UserProps,
} from "@/types/users.types";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext({} as ContextProps);

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [fav, setFav] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setFav(fav);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (fav) {
      localStorage.setItem("favorites", JSON.stringify(fav));
    }
  }, [fav]);

  const registerUser = async ({
    firstname,
    lastname,
    email,
    password,
  }: RegisterReqProps) => {
    try {
      const res = await authApi.register({
        firstname,
        lastname,
        email,
        password,
      });
      if (res) {
        console.log(res);
        return res;
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const loginUser = async ({ email, password }: LoginReqProps) => {
    try {
      const res = await authApi.login({ email, password });
      if (res) {
        const { data }: { data: LoginInfoProps } = res;
        console.log(data.favorites);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user_info));
        localStorage.setItem("favorites", JSON.stringify(data.favorites));
        setToken(data.access_token);
        setUser(data.user_info);
        setFav(data.favorites);
        navigate("/properties?page=1&page_size=24");
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const resendToken = async (email: string) => {
    try {
      const res = await authApi.resend(email);
      if (res) {
        console.log(res);
        return res;
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const activate = async (token: string) => {
    try {
      const res = await authApi.activate(token);
      if (res) {
        console.log(res);
        return res;
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    setUser(null);
    setToken("");
    setFav([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        fav,
        setFav,
        isLoggedIn,
        loginUser,
        registerUser,
        resendToken,
        activate,
        logoutUser,
        isLoading,
      }}
    >
      {!isLoading && children}
    </GlobalContext.Provider>
  );
};

export const useAuth = () => React.useContext(GlobalContext);
