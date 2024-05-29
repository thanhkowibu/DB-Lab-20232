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
  console.log(data);
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
        <div className="font-semibold text-lg">
          {"Viet Nam"}, {"Ha Noi"}
        </div>
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
