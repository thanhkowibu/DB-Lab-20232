import { ResultProps } from "@/types/global.types";
import publicClient from "../client/public.client";
import { LoginReqProps, RegisterReqProps } from "@/types/users.types";
import privateClient from "../client/private.client";

const authEndpoints = {
  login: "auth/login",
  register: "auth/register",
  activate: (token: string) => `/auth/activate?token=${token}`,
  resend_token: (email: string) => `/auth/resend-token?email=${email}`,
  validate: () => "/validate-token",
};

const authApi = {
  login: async ({ email, password }: LoginReqProps) => {
    const res: ResultProps = await publicClient.post(authEndpoints.login, {
      email,
      password,
    });
    return res;
  },
  register: async ({
    firstname,
    lastname,
    email,
    password,
  }: RegisterReqProps) => {
    const res: ResultProps = await publicClient.post(authEndpoints.register, {
      firstname,
      lastname,
      email,
      password,
    });
    return res;
  },
  activate: async (token: string) => {
    const res: ResultProps = await publicClient.get(
      authEndpoints.activate(token)
    );
    return res;
  },
  resend: async (email: string) => {
    const res: ResultProps = await publicClient.get(
      authEndpoints.resend_token(email)
    );
    return res;
  },
  validate: async () => {
    const res: ResultProps = await privateClient.post(authEndpoints.validate());
    return res;
  },
};

export default authApi;
