import { getListingDetail } from "@/action/getListingDetail";
import { ListingClient } from "@/components/common/listings/ListingClient";
import { PropertyDetailProps } from "@/types/properties.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import UpdateProperty from "./UpdateProperty";
import { useAuth } from "@/context/useAuth";
import PropertyDetailSkeleton from "@/components/common/skeleton/PropertyDetailSkeleton";

export const PropertyDetail = () => {
  const [listing, setListing] = useState<PropertyDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const update = params?.get("update");

  const { user } = useAuth();

  const listingId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchData = async () => {
      try {
        const { data } = await getListingDetail(BigInt(listingId));
        if (data) setListing(data);
      } catch (err: any) {
        if (err) toast.error(err.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [update]);

  if (update && listing && listing.host.id === user?.id) {
    return <UpdateProperty />;
  }

  // console.log(listing);
  return (
    <>
      {isLoading ? (
        <PropertyDetailSkeleton />
      ) : !listing ? (
        <PageNotFound />
      ) : (
        <ListingClient listing={listing} />
      )}
    </>
  );
};
