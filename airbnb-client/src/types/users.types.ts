import { ImageProps } from "./global.types";

export type UserProps = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
  avatar?: ImageProps;
};

export type RegisterReqProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type LoginReqProps = {
  email: string;
  password: string;
};

export type LoginInfoProps = {
  access_token: string;
  user_info: UserProps;
  favorites: number[];
};
