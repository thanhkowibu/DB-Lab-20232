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
  EASTERN_NORTH_AMERICA = "eastern_north_america",
  WESTERN_NORTH_AMERICA = "western_north_america",
  CENTRAL_AMERICA = "central_america",
  NORTHERN_SOUTH_AMERICA = "northern_south_america",
  SOUTHERN_SOUTH_AMERICA = "southern_south_america",
  WESTERN_EUROPE = "western_europe",
  EASTERN_EUROPE = "eastern_europe",
  NORTHERN_EUROPE = "northern_europe",
  SOUTHERN_EUROPE = "southern_europe",
  NORTHERN_AFRICA = "northern_africa",
  CENTRAL_AFRICA = "central_africa",
  SOUTHERN_AFRICA = "southern_africa",
  EASTERN_AFRICA = "eastern_africa",
  WESTERN_AFRICA = "western_africa",
  EASTERN_ASIA = "eastern_asia",
  WESTERN_ASIA = "western_asia",
  SOUTHERN_ASIA = "southern_asia",
  SOUTHEAST_ASIA = "southeast_asia",
  CENTRAL_ASIA = "central_asia",
  NORTHERN_ASIA = "northern_asia",
  EASTERN_AUSTRALIA = "eastern_australia",
  WESTERN_AUSTRALIA = "western_australia",
  EASTERN_ANTARCTICA = "eastern_antarctica",
  WESTERN_ANTARCTICA = "western_antarctica",
  PACIFIC_OCEAN = "pacific_ocean",
  ATLANTIC_OCEAN = "atlantic_ocean",
  INDIAN_OCEAN = "indian_ocean",
  SOUTHERN_OCEAN = "southern_ocean",
  ARCTIC_OCEAN = "arctic_ocean",
}

export const regions = [
  { area: Area.EASTERN_NORTH_AMERICA, bounds: [-100.0, -60.0, 24.0, 49.0] },
  { area: Area.WESTERN_NORTH_AMERICA, bounds: [-169.0, -100.0, 24.0, 72.0] },
  { area: Area.CENTRAL_AMERICA, bounds: [-118.0, -81.0, 7.0, 23.0] },
  { area: Area.NORTHERN_SOUTH_AMERICA, bounds: [-81.0, -34.0, -5.0, 12.0] },
  { area: Area.SOUTHERN_SOUTH_AMERICA, bounds: [-81.0, -34.0, -56.0, -5.0] },
  { area: Area.WESTERN_EUROPE, bounds: [-10.0, 10.0, 36.0, 71.0] },
  { area: Area.EASTERN_EUROPE, bounds: [10.0, 40.0, 35.0, 70.0] },
  { area: Area.NORTHERN_EUROPE, bounds: [-10.0, 40.0, 54.0, 71.0] },
  { area: Area.SOUTHERN_EUROPE, bounds: [-10.0, 30.0, 35.0, 54.0] },
  { area: Area.NORTHERN_AFRICA, bounds: [-17.0, 51.0, 15.0, 38.0] },
  { area: Area.CENTRAL_AFRICA, bounds: [-17.0, 51.0, -10.0, 15.0] },
  { area: Area.SOUTHERN_AFRICA, bounds: [10.0, 51.0, -35.0, -10.0] },
  { area: Area.EASTERN_AFRICA, bounds: [25.0, 51.0, -11.0, 12.0] },
  { area: Area.WESTERN_AFRICA, bounds: [-17.0, 25.0, -10.0, 15.0] },
  { area: Area.EASTERN_ASIA, bounds: [100.0, 150.0, 20.0, 60.0] },
  { area: Area.WESTERN_ASIA, bounds: [26.0, 75.0, 10.0, 55.0] },
  { area: Area.SOUTHERN_ASIA, bounds: [60.0, 100.0, -10.0, 30.0] },
  { area: Area.SOUTHEAST_ASIA, bounds: [95.0, 141.0, -11.0, 23.0] },
  { area: Area.CENTRAL_ASIA, bounds: [50.0, 87.0, 30.0, 55.0] },
  { area: Area.NORTHERN_ASIA, bounds: [40.0, 180.0, 55.0, 81.0] },
  { area: Area.EASTERN_AUSTRALIA, bounds: [135.0, 155.0, -45.0, -10.0] },
  { area: Area.WESTERN_AUSTRALIA, bounds: [113.0, 135.0, -35.0, -10.0] },
  { area: Area.EASTERN_ANTARCTICA, bounds: [0.0, 180.0, -90.0, -60.0] },
  { area: Area.WESTERN_ANTARCTICA, bounds: [-180.0, 0.0, -90.0, -60.0] },
  { area: Area.PACIFIC_OCEAN, bounds: [-180.0, 180.0, -60.0, 60.0] },
  { area: Area.ATLANTIC_OCEAN, bounds: [-80.0, 20.0, -60.0, 60.0] },
  { area: Area.INDIAN_OCEAN, bounds: [20.0, 146.0, -60.0, 30.0] },
  { area: Area.SOUTHERN_OCEAN, bounds: [-180.0, 180.0, -90.0, -60.0] },
  { area: Area.ARCTIC_OCEAN, bounds: [-180.0, 180.0, 60.0, 90.0] },
];

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
