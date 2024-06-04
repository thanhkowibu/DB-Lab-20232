import { usePlacename } from "@/hooks/useGeocoding";
import { ImageProps } from "@/types/global.types";
import { Heading } from "../Heading";
import { Image } from "../Image";
import { HeartButton } from "../HeartButton";
import { LuUpload } from "react-icons/lu";
import { PiUploadSimpleBold } from "react-icons/pi";
import { useAuth } from "@/context/useAuth";

type Props = {
  title: string;
  imageSrc: ImageProps[];
  latitude: number;
  longitude: number;
  id: bigint;
};

export const ListingHead: React.FC<Props> = ({
  title,
  imageSrc,
  latitude,
  longitude,
  id,
}) => {
  const location = usePlacename(latitude, longitude);

  const { fav } = useAuth();

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-semibold tracking-tight">
          {title} in {location}
        </div>
        <div className="flex justify-center items-center gap-3 cursor-pointer">
          <PiUploadSimpleBold size={20} />

          <HeartButton listingId={id} />
        </div>
      </div>
      <div className="relative w-full h-[60vh] rounded-xl overflow-hidden">
        <Image path={imageSrc[0].path} />
      </div>
    </div>
  );
};
