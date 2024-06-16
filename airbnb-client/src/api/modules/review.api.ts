import { ResultProps } from "@/types/global.types";
import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const reviewEndpoints = {
  base: (id: bigint) => `/reviews/${id}`,
  property: (id: bigint, page: number) =>
    `/properties/${id}/reviews?page_size=6&page=${page}`,
  add: (id: bigint) => `/bookings/${id}/add-reviews`,
  report: (id: bigint) => `/reviews/${id}/report`,
};

const reviewApi = {
  getAll: async (id: bigint, page: number) => {
    const res: ResultProps = await publicClient.get(
      reviewEndpoints.property(id, page)
    );
    return res;
  },
  add: async (
    id: bigint,
    data: {
      content: string;
      rating: number;
      is_recommend: boolean;
    }
  ) => {
    const res: ResultProps = await privateClient.post(
      reviewEndpoints.add(id),
      data
    );
    return res;
  },
  report: async (
    id: bigint,
    data: {
      detail: string;
      issue: string;
    }
  ) => {
    const res: ResultProps = await privateClient.post(
      reviewEndpoints.report(id),
      data
    );
    return res;
  },
  update: async (
    id: bigint,
    data: {
      content: string;
      rating: number;
      is_recommend: boolean;
    }
  ) => {
    const res: ResultProps = await privateClient.put(
      reviewEndpoints.base(id),
      data
    );
    return res;
  },
};

export default reviewApi;
