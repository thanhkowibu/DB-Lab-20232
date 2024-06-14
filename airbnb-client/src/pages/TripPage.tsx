import bookingApi from "@/api/modules/booking.api";
import { Container } from "@/components/common/Container";
import { PaginationControl } from "@/components/common/PaginationControl";
import TripItem from "@/components/common/trip/TripItem";
import { useAuth } from "@/context/useAuth";
import { BookingResProps } from "@/types/booking.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const TripPage: React.FC<Props> = ({}) => {
  const [trips, setTrips] = useState<BookingResProps[] | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const { pagination_meta_data, bookings } = (
            await bookingApi.getTrips(user?.id, page)
          ).data;
          if (pagination_meta_data) setLastPage(pagination_meta_data.last_page);
          if (bookings) setTrips(bookings);
        } catch (err: any) {
          toast.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [page]);

  const handleCancel = (id: number) => {
    setTrips((prevTrips: any) =>
      prevTrips?.map((trip: BookingResProps) =>
        trip.id === id ? { ...trip, status: "CANCEL" } : trip
      )
    );
  };

  return (
    <Container>
      <div className="mx-auto pt-12 pb-16 flex flex-col gap-8">
        <div className="text-4xl font-bold">Trips</div>
        <hr />
        {isLoading ? (
          <div>is loading</div>
        ) : trips?.length === 0 ? (
          <div>Empty</div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {trips?.map((trip: BookingResProps) => (
              <TripItem
                key={trip.id}
                id={trip.id}
                pid={trip.property_id}
                preview_img={trip.booking_preview_img}
                pname={trip.property_name}
                lat={trip.latitude}
                long={trip.longitude}
                check_in_date={trip.check_in_date}
                check_out_date={trip.check_out_date}
                status={trip.status}
                onCancel={handleCancel}
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
    </Container>
  );
};

export default TripPage;
