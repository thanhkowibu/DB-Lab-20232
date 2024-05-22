import { ImageProps } from "./global.types";
import { UserProps } from "./users.types";

export type PropertyDetailProps = {
  id: bigint;
  nightly_price: number;
  name: string;
  max_guests: number;
  num_beds: number;
  num_bedrooms: number;
  num_bathrooms: number;
  longtitude: number;
  latitude: number;
  description: string;
  address_line: string;
  created_at: Date;
  updated_at: Date;
  images: ImageProps[];
  host: UserProps;
  average_rating: number;
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
  ESSENTIALS,
  SHAMPOO,
  HANGERS,
}
export enum Tag {
  BEACHFRONT,
  PET_FRIENDLY,
  FAMILY_FRIENDLY,
  ROMANTIC_GETAWAY,
  LUXURY,
  COZY,
  SECLUDED,
  URBAN,
  HISTORIC,
  MODERN,
  ECO_FRIENDLY,
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
