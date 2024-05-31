import propertyApi from "@/api/modules/property.api";
import { UserProps } from "@/types/users.types";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  listingId: string;
  currentUser: UserProps | null;
};

const useFavourite = ({ listingId, currentUser }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRefresh = () => {
    navigate(location.pathname, { replace: true });
  };

  const hasFavourited = async () => {};

  const toggleFavourite = async () => {
    if (!currentUser) {
      toast.error("You need to login to use this function");
      navigate("/auth");
    } else {
      try {
        await propertyApi.like(currentUser.id, BigInt(listingId));
        handleRefresh();
        toast.success("Added to favourite");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
};
export default useFavourite;
