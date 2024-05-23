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
  registerUser: (inputs: RegisterReqProps) => Promise<void>;
  loginUser: (inputs: LoginReqProps) => Promise<void>;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
  isLoading: boolean;
};
