import { getListings } from "@/action/getListings";
import { EmptyState } from "@/components/common/EmptyState";
import { ListingCard } from "@/components/common/listings/ListingCard";
import LoadMore from "@/components/common/listings/LoadMore";
import PropertyOverviewSkeleton from "@/components/common/skeleton/PropertyOverviewSkeleton";
import { PropertyOverviewProps } from "@/types/properties.types";
import { delay } from "@/utils/delay";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const PropertyList = () => {
  const [listings, setListings] = useState<PropertyOverviewProps[] | null>(
    null
  );
  const [lastpage, setLastpage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const tag = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await delay(1000);
      const { pagination_meta_data, properties, err } = await getListings(tag);
      if (pagination_meta_data) setLastpage(pagination_meta_data.last_page);
      if (properties) setListings(properties);
      if (err) toast.error(err.message);
      setIsLoading(false);
    };
    fetchData();
  }, [tag]);

  return (
    <>
      {listings?.length === 0 ? (
        <EmptyState showReset />
      ) : !isLoading ? (
        <div className="pt-20 pb-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listings?.map((listing: PropertyOverviewProps) => (
            <ListingCard
              key={`${Math.random()}-${listing.id}`}
              data={listing}
            />
          ))}
          <LoadMore params={tag} lastpage={lastpage} />
        </div>
      ) : (
        <div className="pt-20 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
            <PropertyOverviewSkeleton key={`${Math.random()}-${index}`} />
          ))}
        </div>
      )}
    </>
  );
};
