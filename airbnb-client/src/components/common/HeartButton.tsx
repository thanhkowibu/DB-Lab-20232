import { cn } from "@/lib/utils";
import { UserProps } from "@/types/users.types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: bigint;
  currentUser: UserProps | null;
};

export const HeartButton = ({ listingId, currentUser }: Props) => {
  const hasFavourited = false;
  const toggleFavourite = () => {};
  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={cn("fill-neutral-600/70", {
          "fill-rose-400": hasFavourited,
        })}
      />
    </div>
  );
};
