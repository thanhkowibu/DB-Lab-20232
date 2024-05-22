import { PropertyListParams } from "@/types/properties.types";
import queryString from "query-string";
import publicClient from "../client/public.client";
import { ResultProps } from "@/types/global.types";

const propertyEndpoints = {
  list: (params?: PropertyListParams) => {
    const query = queryString.stringify(params as any);
    return `/properties?${query}`;
  },
  detail: (id: bigint) => `/properties/${id}`,
};

const propertyApi = {
  getList: async (params?: PropertyListParams) => {
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
};
export default propertyApi;
