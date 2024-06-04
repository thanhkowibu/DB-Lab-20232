import { LoginReqProps, RegisterReqProps, UserProps } from "./users.types";

export type ResultProps = {
  code: number;
  data: any;
  flag: boolean;
  message: string;
};

export type ImageProps = {
  name: string;
  path: string;
};

export type ContextProviderProps = {
  children: React.ReactNode;
};

export type ContextProps = {
  user: UserProps | null;
  token: string | null;
  fav: number[] | null;
  setFav: React.Dispatch<React.SetStateAction<number[] | null>>;
  registerUser: (inputs: RegisterReqProps) => Promise<ResultProps | undefined>;
  loginUser: (inputs: LoginReqProps) => Promise<void>;
  resendToken: (email: string) => Promise<ResultProps | undefined>;
  activate: (token: string) => Promise<ResultProps | undefined>;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
  isLoading: boolean;
};
