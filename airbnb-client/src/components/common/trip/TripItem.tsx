import { format } from "date-fns";
import { Image } from "../image/Image";
import { useCountry, usePlacename } from "@/hooks/useGeocoding";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import CancelModal from "./CancelModal";
import BookingModal from "../booking-detail/BookingModal";
import { BookingResProps } from "@/types/booking.types";

type Props = {
  booking: BookingResProps;
  onCancel: (id: number) => void;
};

const statusLabel = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SUCCESS: "Upcoming",
  REJECTED: "Rejected",
  CHECK_OUT: "Checkout",
  NO_SHOW: "Absent",
  CANCEL: "Canceled",
};

const statusGradient = {
  PENDING: "from-amber-400 to-amber-500",
  CONFIRMED: "from-sky-400 to-sky-500",
  SUCCESS: "from-green-400 to-green-500",
  REJECTED: "from-violet-500 to-violet-600",
  CHECK_OUT: "from-neutral-400 to-slate-400",
  NO_SHOW: "from-neutral-400 to-slate-400",
  CANCEL: "from-rose-400 to-red-500",
};

const TripItem: React.FC<Props> = ({
  booking,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const formattedStartDate = format(
    new Date(booking.check_in_date),
    "MMM dd"
  );
  const formattedEndDate = format(
    new Date(booking.check_out_date),
    "MMM dd"
  );
  const location = usePlacename(
    booking.latitude,
    booking.longitude
  );
  const longTitle = `${booking.property_name} in ${location}`;
  const country = useCountry(
    booking.latitude,
    booking.longitude
  );

  const isEnableCancel =
    booking.status === "PENDING" ||
    booking.status === "SUCCESS";

  const handleCancelSuccess = () => {
    onCancel(booking.id); // Notify parent component to update the state
  };

  const handleOpenBookingDetail = () => {
    setShowDetail(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full border-b-2 pb-6 px-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="size-14 rounded-xl overflow-hidden">
            <Image path={booking.booking_preview_img} />
          </div>
          <div className="flex flex-col gap-[0.25rem] justify-center">
            <div
              onClick={() =>
                navigate(
                  `/properties/${booking.property_id}`
                )
              }
              className="text-lg font-semibold truncate hover:underline cursor-pointer"
            >
              {longTitle}
            </div>
            <div className="text-neutral-600">
              {country}・{formattedStartDate} -{" "}
              {formattedEndDate}{" "}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 select-none">
          {booking.status === "CHECK_OUT" &&
            !booking.is_rated && (
              <div className="relative">
                <button className="rounded-full border border-red-500 w-52 py-2 text-red-500 text-center font-semibold hover:bg-neutral-100 transition duration-300 peer">
                  Rate this trip
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full -top-2 -end-2 animate-shake">
                    !
                  </div>
                </button>
                <div className="opacity-0 peer-hover:opacity-100 transition-all transform peer-hover:translate-x-0 duration-500 absolute -top-[270%] rounded-lg border right-0 -translate-x-1/2 mt-2 px-4 py-2 w-80 bg-white/80 z-[15] peer-hover:pointer-events-none">
                  <div className="mb-[1px]  font-semibold">
                    The community needs your help!
                  </div>
                  Please consider leave a review to help
                  other people on their trips as well 😍
                </div>
              </div>
            )}
          {booking.status === "CHECK_OUT" &&
            booking.is_rated && (
              <div className="relative">
                <div
                  className="peer rounded-full border border-white w-52 py-2 text-white bg-blue-500 text-center font-semibold hover:bg-blue-600 transition duration-300 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/properties/${booking.property_id}`
                    )
                  }
                >
                  Checked Out & Rated 👌
                </div>
                <div className="opacity-0 peer-hover:opacity-100 transition-all transform peer-hover:translate-x-0 duration-500 absolute -top-[330%] rounded-lg border right-0 -translate-x-1/2 mt-2 px-4 py-2 w-80 bg-white z-[15] peer-hover:pointer-events-none">
                  <div className="mb-[1px]  font-semibold">
                    Thank you for using our service!
                  </div>
                  You have already left a review for this
                  trip 💁. Click to navigate and see how
                  other people are feeling as well.
                </div>
              </div>
            )}
          {booking.status !== "CHECK_OUT" && (
            <>
              <div
                className={cn(
                  "rounded-full bg-gradient-to-br w-24 py-1 text-white text-center font-semibold",
                  statusGradient[booking.status]
                )}
              >
                {statusLabel[booking.status]}
              </div>

              <button
                disabled={!isEnableCancel}
                onClick={() => setIsOpen(true)}
                className={cn(
                  "rounded-full border border-rose-500 w-24 py-1 text-rose-500 text-center font-semibold hover:bg-neutral-100 transition duration-300",
                  {
                    "cursor-not-allowed opacity-40":
                      !isEnableCancel,
                  }
                )}
              >
                Cancel
              </button>
            </>
          )}
          <div
            onClick={handleOpenBookingDetail}
            className="cursor-pointer"
          >
            <FaInfoCircle size={28} />
          </div>
        </div>
      </div>
      {isOpen && (
        <CancelModal
          id={booking.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onCancelSuccess={handleCancelSuccess}
        />
      )}

      {showDetail && (
        <BookingModal
          booking={booking}
          setShowPopup={setShowDetail}
        />
      )}
    </div>
  );
};

export default TripItem;
