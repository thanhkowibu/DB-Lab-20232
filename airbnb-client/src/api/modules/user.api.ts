import { ResultProps } from "@/types/global.types";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  getInfo: (id: number) => `users/${id}`,
  updateInfo: (id: number) => `users/${id}/details`,
  deleteUser: (id: number) => `users/${id}`,
  updateAvatar: (id: number) => `users/${id}/avatar`,
  getDetails: (id: number) => `users/${id}/details`,
  report: (id: number) => `users/${id}/report`,
  getHosted: (id: number, page: number) =>
    `users/${id}/properties?page_size=8&page=${page}`,
  notification: (id: number) => `users/${id}/notification-preference`,
};

const userApi = {
  getInfo: async (id: number) => {
    const res: ResultProps = await publicClient.get(userEndpoints.getInfo(id));
    return res;
  },
  updateInfo: async (
    id: number,
    {
      firstname,
      lastname,
      phone_number,
      gender,
      dob,
    }: {
      firstname?: string;
      lastname?: string;
      phone_number?: string;
      gender?: string;
      dob?: Date | undefined;
    }
  ) => {
    const res: ResultProps = await privateClient.put(
      userEndpoints.updateInfo(id),
      {
        firstname,
        lastname,
        phone_number,
        gender,
        dob,
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
  updateAvatar: async (id: number, data: FormData) => {
    const res: ResultProps = await privateClient.put(
      userEndpoints.updateAvatar(id),
      data
    );
    return res;
  },
  getDetails: async (id: number) => {
    const res: ResultProps = await privateClient.get(
      userEndpoints.getDetails(id)
    );
    return res;
  },
  report: async (
    id: number,
    data: {
      detail: string;
      issue: string;
    }
  ) => {
    const res: ResultProps = await privateClient.post(
      userEndpoints.report(id),
      data
    );
    return res;
  },
  getHosted: async (id: number, page: number) => {
    const res: ResultProps = await publicClient.get(
      userEndpoints.getHosted(id, page)
    );
    return res;
  },
  getNotiPref: async (id: number) => {
    const res: ResultProps = await privateClient.get(
      userEndpoints.notification(id)
    );
    return res;
  },
  updateNotiPref: async (
    id: number,
    data: {
      notifyOnHostedPropertyRating: boolean;
      notifyOnHostedPropertyLike: boolean;
      notifyOnHostedPropertyBooked: boolean;
      notifyOnBookingStatusChange: boolean;
      notifyOnSpecialOffers: boolean;
    }
  ) => {
    const res: ResultProps = await privateClient.put(
      userEndpoints.notification(id),
      data
    );
    return res;
  },
};

export default userApi;
