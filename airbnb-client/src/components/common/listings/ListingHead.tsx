import { ImageProps } from "@/types/global.types";
import { HeartButton } from "../HeartButton";
import { PiUploadSimpleBold } from "react-icons/pi";
import { ImageGrid } from "../image/ImageGrid";

type Props = {
  title: string;
  imageSrc: ImageProps[];
  id: bigint;
};

export const ListingHead: React.FC<Props> = ({ title, imageSrc, id }) => {
  return (
    <div className="">
      <div className="py-4 flex justify-between items-center">
        <div className="text-3xl font-semibold tracking-tight">{title}</div>
        <div className="flex justify-center items-center gap-3 cursor-pointer">
          <div className="p-[0.625rem] rounded-lg hover:bg-neutral-100 transition duration-300">
            <PiUploadSimpleBold size={20} />
          </div>
          <div className="p-2 rounded-lg hover:bg-neutral-100 transition duration-300">
            <HeartButton listingId={id} />
          </div>
        </div>
      </div>
      <ImageGrid imageSrc={imageSrc} />
    </div>
  );
};
