import queryString from "query-string";
import propertyApi from "@/api/modules/property.api";
import { PAGE_SIZE } from "@/data/params";

export const getListings = async (params: string = "") => {
  try {
    const parsedParams = params.split("&").reduce((acc, param) => {
      const [key, value] = param.split("=");
      if (key !== "page_size") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    const newParams = queryString.stringify({
      page_size: PAGE_SIZE,
      ...parsedParams,
    });

    const listings = await propertyApi.getList(newParams);
    const data = listings.data;
    return data;
  } catch (err: any) {
    throw err;
  }
};
