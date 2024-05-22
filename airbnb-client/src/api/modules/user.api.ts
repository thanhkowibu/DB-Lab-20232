import { ResultProps } from "@/types/global.types";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  getInfo: (id: number) => `users/${id}`,
  updateInfo: (id: number) => `users/${id}`,
  deleteUser: (id: number) => `users/${id}`,
  updateAvatar: (id: number) => `users/${id}`,
};

const userApi = {
  getInfo: async (id: number) => {
    const res: ResultProps = await publicClient.get(userEndpoints.getInfo(id));
    return res;
  },
  updateInfo: async (
    id: number,
    { firstname, lastname }: { firstname: string; lastname: string }
  ) => {
    const res: ResultProps = await privateClient.put(
      userEndpoints.updateInfo(id),
      {
        firstname,
        lastname,
      }
    );
    return res;
  },
  deleteUser: async (id: number) => {
    const res: ResultProps = await privateClient.delete(
      userEndpoints.deleteUser(id)
    );
    return res;
  },
  // TODO: UpdateAvatar
};

export default userApi;
