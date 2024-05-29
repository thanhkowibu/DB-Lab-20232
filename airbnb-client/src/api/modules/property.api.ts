import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { ResultProps } from "@/types/global.types";

const propertyEndpoints = {
  list: (params?: string) => {
    return `/properties${params}`;
  },
  detail: (id: bigint) => `/properties/${id}`,
  like: (userId: number, propertyId: bigint) =>
    `/users/${userId}/properties/${propertyId}/like`,
  listLiked: (userId: number) => `/users/${userId}/liked-properties`,
};

const propertyApi = {
  getList: async (params?: string) => {
    const res: ResultProps = await publicClient.get(
      propertyEndpoints.list(params)
    );
    return res;
  },
  getDetail: async (id: bigint) => {
    const res: ResultProps = await publicClient.get(
      propertyEndpoints.detail(id)
    );
    return res;
  },
  like: async (userId: number, propertyId: bigint) => {
    const res: ResultProps = await privateClient.put(
      propertyEndpoints.like(userId, propertyId)
    );
    return res;
  },
  unlike: async (userId: number, propertyId: bigint) => {
    const res: ResultProps = await privateClient.delete(
      propertyEndpoints.like(userId, propertyId)
    );
    return res;
  },
  getLiked: async (userId: number) => {
    const res: ResultProps = await privateClient.get(
      propertyEndpoints.listLiked(userId)
    );
    return res;
  },
};
export default propertyApi;
