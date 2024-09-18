import { getUserDetail } from "@/action/getUserDetail";
import userApi from "@/api/modules/user.api";
import { Avatar } from "@/components/common/Avatar";
import { Container } from "@/components/common/Container";
import { PaginationControl } from "@/components/common/PaginationControl";
import { ListingCard } from "@/components/common/listings/ListingCard";
import PropertyOverviewSkeleton from "@/components/common/skeleton/PropertyOverviewSkeleton";
import { PropertyOverviewProps } from "@/types/properties.types";
import { UserDetailProps, UserProps } from "@/types/users.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const UserProperties = () => {
  const navigate = useNavigate();
  const userId = useLocation().pathname.split("/")[2];

  const [listings, setListings] = useState<PropertyOverviewProps[] | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data }: { data: UserDetailProps } = await getUserDetail(
          Number(userId)
        );
        if (data.user_info) setUserInfo(data.user_info);
        const { pagination_meta_data, properties } = (
          await userApi.getHosted(Number(userId), page)
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
  }, [userId, page]);

  return (
    <>
      <Container>
        <div className="pt-6 px-12 text-3xl font-bold text-neutral-700 flex items-center gap-4">
          <div>All properties hosted by {userInfo?.lastname}</div>
          <div className="hidden md:block">
            <Avatar path={userInfo?.avatar?.path} />
          </div>
        </div>
        {isLoading ? (
          <div className="py-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((_, index) => (
              <PropertyOverviewSkeleton key={`${Math.random()}-${index}`} />
            ))}
          </div>
        ) : listings?.length === 0 ? (
          <div>Empty</div>
        ) : (
          <div className="py-8 pb-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings?.map((listing: PropertyOverviewProps) => (
              <ListingCard
                key={`${Math.random()}-${listing.id}`}
                data={listing}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center pb-32 w-full">
          <PaginationControl
            lastPage={lastPage}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>
      </Container>
    </>
  );
};

export default UserProperties;
