import userApi from "@/api/modules/user.api";

export const getUserDetail = async (id: number) => {
  try {
    const res = await userApi.getInfo(id);

    return res;
  } catch (err: any) {
    throw err;
  }
};
