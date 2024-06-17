import { getUserDetail } from "@/action/getUserDetail";
import propertyApi from "@/api/modules/property.api";
import { Avatar } from "@/components/common/Avatar";
import { Container } from "@/components/common/Container";
import { PaginationControl } from "@/components/common/PaginationControl";
import { ListingCard } from "@/components/common/listings/ListingCard";
import PropertyOverviewSkeleton from "@/components/common/skeleton/PropertyOverviewSkeleton";
import { useAuth } from "@/context/useAuth";
import { PropertyOverviewProps } from "@/types/properties.types";
import { UserDetailProps, UserProps } from "@/types/users.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const FavouristList = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState<PropertyOverviewProps[] | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data }: { data: UserDetailProps } = await getUserDetail(
          Number(user?.id)
        );
        if (data.user_info) setUserInfo(data.user_info);
        const { pagination_meta_data, properties } = (
          await propertyApi.getLiked(Number(user?.id), page)
        ).data;
        if (pagination_meta_data) setLastPage(pagination_meta_data.last_page);
        if (properties) setListings(properties);
      } catch (err: any) {
        toast.error(err.message);
        if (err.code === 404) navigate("/404");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user?.id, page]);

  const handleToggleFavourite = (listingId: bigint, isFavourited: boolean) => {
    if (!isFavourited) {
      setListings((prevListings) =>
        prevListings
          ? prevListings.filter((listing) => listing.id !== listingId)
          : null
      );
    }
  };

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="pt-6 px-12 text-3xl font-bold text-neutral-700 flex items-center gap-4">
            <div>Your wishlists</div>
            <Avatar path={userInfo?.avatar?.path} />
          </div>
          <div className="text-xl text-neutral-600 px-12">
            Track your favourites properties here
          </div>
        </div>
        {isLoading ? (
          <div className="py-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((_, index) => (
              <PropertyOverviewSkeleton key={`${Math.random()}-${index}`} />
            ))}
          </div>
        ) : listings?.length === 0 ? (
          <div className="w-full h-48 flex justify-center items-center text-center text-lg italic">
            You haven't liked any properties yet
          </div>
        ) : (
          <div className="py-8 pb-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings?.map((listing: PropertyOverviewProps) => (
              <ListingCard
                key={`${Math.random()}-${listing.id}`}
                data={listing}
                onToggleFavourite={handleToggleFavourite} // Pass the callback here
              />
            ))}
          </div>
        )}
        {listings?.length !== 0 && (
          <div className="flex justify-center pb-32 w-full">
            <PaginationControl
              lastPage={lastPage}
              currentPage={page}
              setCurrentPage={setPage}
            />
          </div>
        )}
      </Container>
    </>
  );
};
