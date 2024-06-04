import propertyApi from "@/api/modules/property.api";
import { useAuth } from "@/context/useAuth";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {
  listingId: bigint;
};

export const HeartButton = ({ listingId }: Props) => {
  const navigate = useNavigate();

  const { user, fav, setFav } = useAuth();

  useEffect(() => {
    console.log(fav);
  }, [fav, user]);

  const hasFavourited = fav?.includes(Number(listingId));
  // console.log(fav);

  const toggleFavourite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    try {
      if (!user) {
        navigate("/auth");
      } else {
        if (hasFavourited) {
          await propertyApi.unlike(user.id, listingId);
          setFav((prevFav) =>
            prevFav ? prevFav.filter((id) => id !== Number(listingId)) : []
          );
          toast.success("Removed from favourites");
        } else {
          await propertyApi.like(user.id, listingId);
          setFav((prevFav) =>
            prevFav ? [...prevFav, Number(listingId)] : [Number(listingId)]
          );
          toast.success("Added to favourites");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add favourite");
    }
  };

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
          "fill-rose-500": hasFavourited,
        })}
      />
    </div>
  );
};
