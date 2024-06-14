import { ResultProps } from "@/types/global.types";
import privateClient from "../client/private.client";
import { PAGE_SIZE } from "@/data/params";

const bookingEndpoints = {
  base: (id: number, params: string = "") => `/bookings/${id}${params}`,
  log: (id: number) => `/bookings/${id}/log`,
  properties: (id: number, params: string = "") =>
    `/properties/${id}/bookings${params}`,
  users: (id: number, params: string = "") => `/users/${id}/bookings${params}`,
  host: (id: number, params: string = "") =>
    `/users/${id}/hosted-booking${params}`,
  checkout: (id: number, params: string = "") =>
    `/bookings/${id}/check-out${params}`,
};

const bookingApi = {
  create: async (
    id: number,
    {
      check_in_date,
      check_out_date,
      num_alduts,
      num_childrens,
      num_pets,
      nightly_fee,
      clean_fee,
      service_fee,
    }: {
      check_in_date: Date;
      check_out_date: Date;
      num_alduts: number;
      num_childrens: number;
      num_pets: number;
      nightly_fee: number;
      clean_fee: number;
      service_fee: number;
    }
  ) => {
    const res: ResultProps = await privateClient.post(
      bookingEndpoints.properties(id),
      {
        check_in_date,
        check_out_date,
        num_alduts,
        num_childrens,
        num_pets,
        nightly_fee,
        clean_fee,
        service_fee,
      }
    );
    return res;
  },
  getTrips: async (id: number, page: number) => {
    const res: ResultProps = await privateClient.get(
      bookingEndpoints.users(id, `?page_size=${PAGE_SIZE}&page=${page}`)
    );
    return res;
  },
  cancel: async (id: number) => {
    const res: ResultProps = await privateClient.delete(
      bookingEndpoints.base(id)
    );
    return res;
  },
  getDetail: async (id: number) => {
    const res: ResultProps = await privateClient.get(bookingEndpoints.base(id));
    return res;
  },
  getLog: async (id: number) => {
    const res: ResultProps = await privateClient.get(bookingEndpoints.log(id));
    return res;
  },
  getHosted: async (id: number, page: number, filter: string = "") => {
    const res: ResultProps = await privateClient.get(
      bookingEndpoints.host(
        id,
        `?page_size=${PAGE_SIZE}&page=${page}&filter=${filter}`
      )
    );
    return res;
  },
  confirm: async (id: number, confirm: boolean) => {
    const res: ResultProps = await privateClient.put(
      bookingEndpoints.base(id, `?confirm=${confirm}`)
    );
    return res;
  },
  checkout: async (id: number, checkout: boolean) => {
    const res: ResultProps = await privateClient.put(
      bookingEndpoints.checkout(id, `?checkout=${checkout}`)
    );
    return res;
  },
  properties: async (id: number, page: number) => {
    const res: ResultProps = await privateClient.get(
      bookingEndpoints.properties(id, `?page_size=${PAGE_SIZE}&page=${page}`)
    );
    return res;
  },
};

export default bookingApi;
