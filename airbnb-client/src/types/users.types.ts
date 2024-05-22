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

export type LoginInfoProps = {
  access_token: string;
  user_info: UserProps;
};
