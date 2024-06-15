import userApi from "@/api/modules/user.api";
import { useAuth } from "@/context/useAuth";
import { PropertyOverviewProps } from "@/types/properties.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaginationControl } from "../PaginationControl";
import HostedPropertyItem from "./HostedPropertyItem";

type Props = {};

const ManageListings: React.FC<Props> = ({}) => {
  const [listings, setListings] = useState<PropertyOverviewProps[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { pagination_meta_data, properties } = (
          await userApi.getHosted(Number(user?.id), page)
        ).data;
        if (pagination_meta_data) setLastPage(pagination_meta_data.last_page);
        if (properties) setListings(properties);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleDelete = (id: bigint) => {
    setListings((prev: any) =>
      prev?.filter((listing: PropertyOverviewProps) => listing.id !== id)
    );
  };

  return (
    <div className="mx-auto px-8 pt-12 pb-16 flex flex-col gap-8">
      {isLoading ? (
        <div>is loading</div>
      ) : listings?.length === 0 ? (
        <div>Empty</div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {listings?.map((listing: PropertyOverviewProps) => (
            <HostedPropertyItem
              key={listing.id}
              id={listing.id}
              preview_img={listing.images[0].path}
              pname={listing.name}
              lat={listing.latitude}
              long={listing.longitude}
              created_at={listing.created_at}
              updated_at={listing.updated_at}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center w-full">
        <PaginationControl
          lastPage={lastPage}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
};

export default ManageListings;
