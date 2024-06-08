import { Area, regions } from "@/types/properties.types";

export const findArea = (lat: number, lng: number): Area | null => {
  for (const region of regions) {
    const [west, east, south, north] = region.bounds;
    if (lng >= west && lng <= east && lat >= south && lat <= north) {
      return region.area;
    }
  }
  return null;
};
