import { PropertyOverviewProps } from "@/types/properties.types";
import { useNavigate } from "react-router-dom";
import { Image } from "../image/Image";
import { HeartButton } from "../HeartButton";
import { usePlacename } from "@/hooks/useGeocoding";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "../carousel/EmblaCarousel";
import LazyImage from "../image/LazyImage";

type Props = {
  data: PropertyOverviewProps;
};

const OPTIONS: EmblaOptionsType = {};

export const ListingCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const location = usePlacename(
    data.latitude,
    data.longitude
  );

  const slides = data.images.map((image, index) => (
    <div
      className="aspect-square w-full relative overflow-hidden"
      key={index}
    >
      <LazyImage src={image.path} alt={image.name} />
    </div>
  ));

  return (
    <div
      onClick={() => navigate(`/properties/${data.id}`)}
      className="mt-1 col-span-1 cursor-pointer group"
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        {slides.length > 0 ? (
          <EmblaCarousel
            slides={slides}
            options={OPTIONS}
          />
        ) : (
          <Image path={undefined} />
        )}
        <div className="absolute top-3 right-3">
          <HeartButton listingId={data.id} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold text-lg">
          {location}
        </div>
        <div className="mr-1">
          ★{Number(data.average_rating).toFixed(1)}
        </div>
      </div>
      <div className="text-neutral-500 font-light truncate">
        {data.name}
      </div>
      <div className="flex items-center gap-1 text-sm">
        <div className="font-semibold">
          ${data.nightly_price}
        </div>
        <div className="font-light"> night</div>
      </div>
    </div>
  );
};
