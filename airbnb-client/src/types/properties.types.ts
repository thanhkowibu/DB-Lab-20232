import { ImageProps } from "./global.types";
import { UserProps } from "./users.types";

export type PropertyOverviewProps = {
  id: bigint;
  nightly_price: number;
  name: string;
  longitude: number;
  latitude: number;
  max_guests: number;
  created_at: Date;
  updated_at: Date;
  num_beds: number;
  images: ImageProps[];
  average_rating: number;
};

export type PropertyDetailProps = {
  id: bigint;
  nightly_price: number;
  name: string;
  longitude: number;
  latitude: number;
  max_guests: number;
  created_at: Date;
  updated_at: Date;
  num_beds: number;
  images: ImageProps[];
  average_rating: number;
  num_bedrooms: number;
  num_bathrooms: number;
  description: string;
  address_line: string;
  host: UserProps;
  total_rating: number;
  booking_date: Date[];
  categories: Category[];
  tag: Tag;
};

export enum Category {
  WIFI,
  TV,
  KITCHEN,
  AIR_CONDITIONING,
  POOL,
  SHAMPOO,
  HANGERS,
  PIANO,
  FREE_PARKING,
  BREAKFAST,
  WASHER,
  DRYER,
  HEATING,
  LAPTOP_FRIENDLY_WORKSPACE,
  IRON,
  HAIR_DRYER,
  SMOKE_DETECTOR,
  CARBON_MONOXIDE_DETECTOR,
  FIRE_EXTINGUISHER,
  FIRST_AID_KIT,
}
export enum Tag {
  BEACHFRONT,
  CASTLE,
  CAVE,
  ROMANTIC_GETAWAY,
  LUXURY,
  COZY,
  SECLUDED,
  HOUSEBOAT,
  TENT,
  TOWER,
  WINDMILL,
  MOUNTAIN_VIEW,
  LAKEFRONT,
  SKI_IN_SKI_OUT,
  OCEAN_VIEW,
  TREEHOUSE,
  COTTAGE,
  CABIN,
  FARMS,
  VILLA,
}
export enum Area {
  NORTH_AMERICA,
  SOUTH_AMERICA,
  EUROPE,
  AFRICA,
  ASIA,
  AUSTRALIA,
  ANTARTICA,
}

export type PropertyListParams = {
  category1?: string;
  category2?: string;
  min_beds?: number;
  min_bedrooms?: number;
  min_bathrooms?: number;
  area?: Area;
  min_nightly_price?: number;
  max_nightly_price?: number;
  page_size?: number;
  page?: number;
  tag?: Tag;
  sort_direction?: "desc" | "asc";
  sort_column?: "averageRating" | "updatedAt" | "nightlyPrice";
};

export type PropertyReqProps = {
  nightly_price: number;
  name: string;
  longitude: number;
  latitude: number;
  max_guests: number;
  num_beds: number;
  num_bedrooms: number;
  num_bathrooms: number;
  description: string;
  address_line: string;
  categories: string[];
  tag: string;
  images: File[];
};

export type BookingProps = {
  check_in_date: Date;
  check_out_date: Date;
  num_alduts: number;
  num_childrens: number;
  num_pets: number;
  nightly_fee: number;
  clean_fee: number;
  service_fee: number;
};
