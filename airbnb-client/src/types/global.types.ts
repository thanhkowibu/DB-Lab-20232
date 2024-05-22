import { UserProps } from "./users.types";

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
  user: UserProps;
  login: (inputs: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};
