import propertyApi from "@/api/modules/property.api";
import { useAuth } from "@/context/useAuth";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {
  listingId: bigint;
  onToggleFavourite?: (listingId: bigint, isFavourited: boolean) => void; // Add this prop
};

export const HeartButton = ({ listingId, onToggleFavourite }: Props) => {
  const navigate = useNavigate();

  const { user, fav, setFav, logoutUser } = useAuth();

  const hasFavourited = fav?.includes(Number(listingId));

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
          onToggleFavourite?.(listingId, false); // Notify parent
        } else {
          await propertyApi.like(user.id, listingId);
          setFav((prevFav) =>
            prevFav ? [...prevFav, Number(listingId)] : [Number(listingId)]
          );
          toast.success("Added to favourites");
          onToggleFavourite?.(listingId, true); // Notify parent
        }
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to add favourite");
      if (err.code === 403) {
        logoutUser();
        navigate("/auth");
      }
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
