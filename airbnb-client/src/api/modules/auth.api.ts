import { ResultProps } from "@/types/global.types";
import publicClient from "../client/public.client";

const authEndpoints = {
  login: "auth/login",
  register: "auth/register",
  activate: (token: string) => `/auth/activate?token=${token}`,
  resend_token: (email: string) => `/auth/resend-token?email=${email}`,
};

const authApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
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
  }: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const res: ResultProps = await publicClient.post(authEndpoints.login, {
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
};

export default authApi;
