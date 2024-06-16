import bookingApi from "@/api/modules/booking.api";
import { useAuth } from "@/context/useAuth";
import { BookingResProps } from "@/types/booking.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaginationControl } from "../PaginationControl";
import BookingItem from "./BookingItem";
import { cn } from "@/lib/utils";

type FilterType = "All" | "Pending" | "Upcoming" | "Past" | "Cancel";

const filters: FilterType[] = ["All", "Pending", "Upcoming", "Past", "Cancel"];

const statusMapping: Record<FilterType, string> = {
  All: "",
  Pending: "pending",
  Upcoming: "upcoming",
  Past: "past",
  Cancel: "cancel",
};

type Props = {};

const ManageBookings: React.FC<Props> = ({}) => {
  const [bookings, setBookings] = useState<BookingResProps[] | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("All");

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async (filter: FilterType) => {
      setIsLoading(true);
      try {
        const { pagination_meta_data, bookings } = (
          await bookingApi.getHosted(
            Number(user?.id),
            page,
            statusMapping[filter]
          )
        ).data;
        if (pagination_meta_data) setLastPage(pagination_meta_data.last_page);
        if (bookings) setBookings(bookings);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(filter);
  }, [page, filter]);

  const handleUpdate = (id: bigint, status: string) => {
    setBookings((prev: any) =>
      prev?.map((booking: BookingResProps) =>
        BigInt(booking.id) === id ? { ...booking, status } : booking
      )
    );
  };

  return (
    <div className="mx-auto px-8 pt-12 pb-16 flex flex-col gap-8">
      <div className="flex items-center gap-8">
        {filters.map((filterOption) => (
          <div
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={cn(
              "p-3 border-b-2 border-transparent font-semibold text-neutral-500 hover:text-neutral-900 transition cursor-pointer select-none duration-300",
              {
                "border-b-neutral-800 border-b-[3px] text-slate-900 font-bold":
                  filter === filterOption,
              }
            )}
          >
            {filterOption}
          </div>
        ))}
      </div>
      {isLoading ? (
        <div>is loading</div>
      ) : bookings?.length === 0 ? (
        <div>Empty</div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-between items-center gap-4 w-full border-b-2 pb-6 px-2 text-xl font-semibold">
            <div className="w-14 h-14 rounded-xl overflow-hidden"></div>
            <div className=" w-48 text-center">Place</div>
            <div className="w-24 text-center">Status</div>
            <div className="w-16 text-center">Guests</div>
            <div className="w-32 text-center">Dates</div>
            <div className="w-32 text-center">Booked at</div>
            <div className="w-24 text-center">Earnings</div>
            <div className="w-10"></div>
          </div>
          {bookings?.map((booking: BookingResProps) => (
            <BookingItem
              key={booking.id}
              booking={booking}
              id={BigInt(booking.id)}
              pid={booking.property_id}
              iid={booking.issuer_id}
              preview_img={booking.booking_preview_img}
              iname={booking.issuer_firstname}
              pname={booking.property_name}
              lat={booking.latitude}
              long={booking.longitude}
              created_at={booking.created_at}
              check_in_date={booking.check_in_date}
              check_out_date={booking.check_out_date}
              status={booking.status}
              onUpdate={handleUpdate}
              num_guests={booking.num_guests}
              total_fee={booking.total_fee}
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

export default ManageBookings;
