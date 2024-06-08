import { PAGE_SIZE } from "@/data/params";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { ResultProps } from "@/types/global.types";
import queryString from "query-string";

const propertyEndpoints = {
  base: () => "/properties",
  list: (params?: string) => `/properties${params}`,
  detail: (id: bigint) => `/properties/${id}`,
  like: (userId: number, propertyId: bigint) =>
    `/users/${userId}/properties/${propertyId}/like`,
  listLiked: (userId: number) => `/users/${userId}/liked-properties`,
};

const propertyApi = {
  getList: async (params?: string) => {
    const parsedParams = queryString.parse(params || "");
    const newParams = queryString.stringify({
      ...parsedParams,
      page_size: PAGE_SIZE,
    });
    // console.log("?" + newParams);

    const res: ResultProps = await publicClient.get(
      propertyEndpoints.list("?" + newParams)
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
  create: async (data: FormData) => {
    const res: ResultProps = await privateClient.post(
      propertyEndpoints.base(),
      data
    );
    return res;
  },
};
export default propertyApi;
