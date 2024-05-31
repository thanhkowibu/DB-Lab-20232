import { useEffect, useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { PropertyDetailProps } from "@/types/properties.types";
import { UserProps } from "@/types/users.types";
import { useNavigate } from "react-router-dom";
import { Image } from "../Image";
import { HeartButton } from "../HeartButton";

type Props = {
  data: PropertyDetailProps;
  currentUser: UserProps | null;
};

export const ListingCard = ({ currentUser, data }: Props) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Unnamed location");

  useEffect(() => {
    const fetchData = async () => {
      const geocodingClient = mbxGeocoding({
        accessToken: import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN,
      });

      try {
        const response = await geocodingClient
          .reverseGeocode({
            query: [data.longitude, data.latitude],
            types: ["country", "region"],
          })
          .send();

        if (response.body.features.length > 0) {
          const match = response.body.features[0];
          setLocation(match.place_name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div
      onClick={() => navigate(`/properties/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image path={data.images.length ? data.images[0].path : undefined} />
        <div className="absolute top-3 right-3">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold text-lg">{location}</div>
        <div className="mr-1">★{data.average_rating}</div>
      </div>
      <div className="text-neutral-500 font-light truncate">{data.name}</div>
      <div className="flex items-center gap-1 text-sm">
        <div className="font-semibold">${data.nightly_price}</div>
        <div className="font-light"> night</div>
      </div>
    </div>
  );
};
