// hooks/useGeocoding.ts
import { useState, useEffect } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

export const usePlacename = (latitude: number, longitude: number) => {
  const [location, setLocation] = useState("Unnamed location");

  useEffect(() => {
    const fetchData = async () => {
      const geocodingClient = mbxGeocoding({
        accessToken: import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN,
      });

      try {
        const response = await geocodingClient
          .reverseGeocode({
            query: [longitude, latitude],
            types: ["country", "region"],
          })
          .send();

        if (response.body.features.length > 0) {
          const match = response.body.features[0];
          console.log(match);
          setLocation(match.place_name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return location;
};

export const useCountry = (latitude: number, longitude: number) => {
  const [country, setCountry] = useState("Unknown country");

  useEffect(() => {
    const fetchData = async () => {
      const geocodingClient = mbxGeocoding({
        accessToken: import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN,
      });

      try {
        const response = await geocodingClient
          .reverseGeocode({
            query: [longitude, latitude],
            types: ["country"],
          })
          .send();

        if (response.body.features.length > 0) {
          const match = response.body.features[0];
          setCountry(match.text);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return country;
};
