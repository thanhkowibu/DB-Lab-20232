import propertyApi from "@/api/modules/property.api";

export const getListingDetail = async (id: bigint) => {
  try {
    const listing = await propertyApi.getDetail(id);
    // console.log(listings.data.properties);
    return listing;
  } catch (err: any) {
    throw err;
  }
};
