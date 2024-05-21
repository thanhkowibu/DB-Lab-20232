import { PropertyListParams } from "@/types/properties.types";
import queryString from "query-string";

export const propertyEndpoints = {
  list: (params?: PropertyListParams) => {
    // const query = new URLSearchParams(params as any).toString();
    const query = queryString.stringify(params as any);
    return `/properties?${query}`;
  },
  detail: (id: string) => `/properties/${id}`,
  // Add other endpoints as needed
};
