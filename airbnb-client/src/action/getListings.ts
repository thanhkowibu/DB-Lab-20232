import propertyApi from "@/api/modules/property.api";

export const getListings = async (params?: string) => {
  try {
    const listings = await propertyApi.getList(params);
    // console.log(listings.data.properties);
    const data = listings.data;
    return data;
  } catch (err: any) {
    throw err;
  }
};
