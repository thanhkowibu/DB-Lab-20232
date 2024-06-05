import { UserProps } from "@/types/users.types";
import { IconType } from "react-icons";
import { Avatar } from "../Avatar";
import ListingTag from "./ListingTag";
import { useCountry } from "@/hooks/useGeocoding";
import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
} from "date-fns";
import ListingCategories from "./ListingCategories";

type Props = {
  host: UserProps;
  tag:
    | {
        label: string;
        icon: IconType;
        desc: string;
        value: string;
      }
    | undefined;
  categories: {
    label: string;
    icon: IconType;
    desc: string;
    value: string;
  }[];
  desc: string;
  num_beds: number;
  num_bedrooms: number;
  num_bathrooms: number;
  max_guests: number;
  latitude: number;
  longitude: number;
  address_line: string;
  average_rating: number;
  total_rating: number;
};

const ListingInfo: React.FC<Props> = ({
  host,
  tag,
  categories,
  desc,
  num_beds,
  num_bedrooms,
  num_bathrooms,
  max_guests,
  latitude,
  longitude,
  address_line,
  average_rating,
  total_rating,
}) => {
  //   console.log(tag);
  const country = useCountry(latitude, longitude);

  const years = differenceInYears(new Date(), new Date(host.created_at));
  const months = differenceInMonths(new Date(), new Date(host.created_at));
  const weeks = differenceInWeeks(new Date(), new Date(host.created_at));
  const days = differenceInDays(new Date(), new Date(host.created_at));

  let hostingTime;

  if (years > 0) {
    hostingTime = `${years} years on Mikabnb`;
  } else if (months > 0) {
    hostingTime = `${months} months on Mikabnb`;
  } else if (weeks > 0) {
    hostingTime = `${weeks} weeks on Mikabnb`;
  } else if (days > 0) {
    hostingTime = `${days} days on Mikabnb`;
  } else {
    hostingTime = "Mikabnb newcomer";
  }

  return (
    <div className="col-span-4 flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="font-semibold text-2xl truncate">
            {address_line}, {country}
          </div>
          <div className="flex items-center gap-0 text-lg">
            <div>{max_guests} guests・</div>
            <div>{num_bedrooms} bedrooms・</div>
            <div>{num_beds} beds・</div>
            <div>{num_bathrooms} bathrooms</div>
          </div>
          <div className="flex items-center gap-4 text-xl font-semibold">
            <div>★ {Number(average_rating).toFixed(1)}</div>
            <div className="underline cursor-pointer">
              {total_rating} reviews
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-center gap-6 w-fit rounded-xl py-2 hover:brightness-90 transition duration-300 cursor-pointer">
          <Avatar path={host.avatar?.path || undefined} size="50" />
          <div className="flex flex-col">
            <div className="font-semibold tracking-wide text-lg">
              Hosted by {host.lastname} {host.firstname}
            </div>
            <div className="text-neutral-700">{hostingTime}</div>
          </div>
        </div>
      </div>
      <hr />
      {tag && (
        <ListingTag icon={tag?.icon} label={tag.label} description={tag.desc} />
      )}
      <hr />
      <div className="flex flex-col gap-6">
        <div className="text-3xl font-semibold mt-4">About this place</div>
        <div className="text-lg text-neutral-600">{desc}</div>
      </div>
      <hr />
      <div className="flex flex-col gap-6">
        <div className="text-3xl font-semibold mt-4">
          What this place offers
        </div>
        <ListingCategories categories={categories} />
      </div>
      <hr />
    </div>
  );
};

export default ListingInfo;
