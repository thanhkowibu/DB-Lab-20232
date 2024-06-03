import propertyApi from "@/api/modules/property.api";

export const createListing = async (input: FormData) => {
  try {
    const res = await propertyApi.create(input);
    return res.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
