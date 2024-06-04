import { getListings } from "@/action/getListings";
import { EmptyState } from "@/components/common/EmptyState";
import { GlobalLoading } from "@/components/common/GlobalLoading";
import { ListingCard } from "@/components/common/listings/ListingCard";
import { PropertyOverviewProps } from "@/types/properties.types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const PropertyList = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [listings, setListings] = useState<PropertyOverviewProps[] | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  const tag = useLocation().search;

  useEffect(() => {
    const params = queryString.parse(location.search);

    if (!params.page || !params.page_size) {
      navigate("/properties?page=1&page_size=24", { replace: true });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { properties, err } = await getListings(tag);
      if (properties) setListings(properties);
      if (err) toast.error(err.message);
      setIsLoading(false);
    };
    fetchData();
  }, [tag]);

  return (
    <>
      {isLoading ? (
        <GlobalLoading />
      ) : listings?.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <div className="pt-20 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listings?.map((listing: any) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      )}
    </>
  );
};
