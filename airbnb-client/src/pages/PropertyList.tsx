import { getListings } from "@/action/getListings";
import { EmptyState } from "@/components/common/EmptyState";
import { ListingCard } from "@/components/common/listings/ListingCard";
import LoadMore from "@/components/common/listings/LoadMore";
import PropertyOverviewSkeleton from "@/components/common/skeleton/PropertyOverviewSkeleton";
import { cn } from "@/lib/utils";
import { PropertyOverviewProps } from "@/types/properties.types";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import ViewSwitchBagde from "@/components/common/map/ViewSwitchBagde";
import { MapView } from "@/components/common/map/MapView";

export const PropertyList = () => {
  const [listings, setListings] = useState<PropertyOverviewProps[] | null>(
    null
  );
  const [lastpage, setLastpage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapView, setIsMapView] = useState(false);

  const tag = useLocation().search;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.delete("tag");
  const isShowMap = Array.from(searchParams.keys()).length > 0;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { pagination_meta_data, properties, err } = await getListings(tag);
      if (pagination_meta_data) setLastpage(pagination_meta_data.last_page);
      if (properties) {
        setListings(properties);
      }
      if (err) toast.error(err.message);
      setIsLoading(false);
      setIsMapView(false);
    };
    fetchData();
  }, [tag]);

  return (
    <>
      {isLoading ? (
        <div className="pt-20 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
            <PropertyOverviewSkeleton key={`${Math.random()}-${index}`} />
          ))}
        </div>
      ) : listings?.length === 0 ? (
        <EmptyState showReset />
      ) : isMapView ? (
        <div className="max-h-[100vh] h-[100vh] mt-0">
          <MapView listings={listings} isVisible={isMapView} />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          <div
            className={cn(
              "pt-20 pb-8 px-8 col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
              {
                "col-span-3": isShowMap,
              }
            )}
          >
            {listings?.map((listing: PropertyOverviewProps) => (
              <ListingCard
                key={`${Math.random()}-${listing.id}`}
                data={listing}
              />
            ))}
            <LoadMore params={tag} lastpage={lastpage} />
          </div>
          {isShowMap && (
            <div className="w-full aspect-square sticky top-44 rounded-xl bg-neutral-200 col-span-2 flex justify-center pb-8 overflow-hidden">
              <div className="text-5xl text-black bg-red-300/0 size-full">
                <MapView listings={listings} isVisible={isShowMap} />
              </div>
            </div>
          )}
        </div>
      )}
      <ViewSwitchBagde isMapView={isMapView} setIsMapView={setIsMapView} />
    </>
  );
};
