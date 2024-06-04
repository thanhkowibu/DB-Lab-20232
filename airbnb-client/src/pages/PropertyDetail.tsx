import { getListingDetail } from "@/action/getListingDetail";
import { EmptyState } from "@/components/common/EmptyState";
import { ListingClient } from "@/components/common/listings/ListingClient";
import { PropertyDetailProps } from "@/types/properties.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const PropertyDetail = () => {
  const [listing, setListing] = useState<PropertyDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const listingId = useLocation().pathname.split("/")[2];

  useEffect(() => {
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
  }, []);

  // console.log(listing);
  return <>{!listing ? <EmptyState /> : <ListingClient listing={listing} />}</>;
};
