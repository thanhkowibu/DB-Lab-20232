// BookingItem.tsx
import { format } from "date-fns";
import { Image } from "../image/Image";
import { useCountry, usePlacename } from "@/hooks/useGeocoding";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { DropdownItem } from "../navbar/DropdownItem";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import toast from "react-hot-toast";
import bookingApi from "@/api/modules/booking.api";

type Props = {
  id: bigint;
  pid: number;
  iid: number;
  preview_img: string;
  iname: string;
  pname: string;
  lat: number;
  long: number;
  created_at: Date;
  check_in_date: Date;
  check_out_date: Date;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "SUCCESS"
    | "REJECTED"
    | "CHECK_OUT"
    | "NO_SHOW"
    | "CANCEL";
  onUpdate: (id: bigint, status: string) => void;
  num_guests: number;
  total_fee: number;
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

const BookingItem: React.FC<Props> = ({
  id,
  pid,
  iid,
  iname,
  preview_img,
  pname,
  lat,
  long,
  created_at,
  check_in_date,
  check_out_date,
  status,
  onUpdate,
  num_guests,
  total_fee,
}) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const formattedStartDate = format(new Date(check_in_date), "MMM dd");
  const formattedEndDate = format(new Date(check_out_date), "MMM dd");
  const location = usePlacename(lat, long);
  const longTitle = `${pname} in ${location}`;
  const country = useCountry(lat, long);
  const createdDate = format(new Date(created_at), "MMM dd, yyyy");

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const dropdownRef = useRef<HTMLButtonElement>(null);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleConfirm = (value: boolean) => async () => {
    try {
      const res = await bookingApi.confirm(Number(id), value);
      if (res.code === 200) {
        if (value) {
          toast.success("Confirmed booking successfully");
          onUpdate(id, "CONFIRMED");
        } else {
          toast.success("Rejected booking successfully");
          onUpdate(id, "REJECTED");
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleCheckout = (value: boolean) => async () => {
    try {
      const res = await bookingApi.checkout(Number(id), value);
      if (res.code === 200) {
        if (value) {
          toast.success("Checked out booking successfully");
          onUpdate(id, "CHECK_OUT");
        } else {
          toast.success("Marked guests as absent successfully");
          onUpdate(id, "NO_SHOW");
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full border-b-2 pb-6 px-2">
      <div className="w-14 h-14 rounded-xl overflow-hidden">
        <Image path={preview_img} />
      </div>
      <div className="flex flex-col justify-center w-48">
        <div
          onClick={() => navigate(`/properties/${pid}`)}
          className="text-lg font-semibold truncate hover:underline cursor-pointer"
        >
          {longTitle}
        </div>
        <div className="text-neutral-600">{country}</div>
      </div>
      <div
        className={cn(
          "rounded-full bg-gradient-to-br w-24 text-base py-1 text-white text-center font-semibold",
          statusGradient[status]
        )}
      >
        {statusLabel[status]}
      </div>
      <div className="w-16 text-center flex flex-col justify-center">
        <div
          onClick={() => navigate(`/users/${iid}`)}
          className="text-lg font-semibold cursor-pointer hover:underline"
        >
          {iname}
        </div>
        <div className="text-neutral-600 text-sm">
          {num_guests} guest{num_guests !== 1 && "s"}
        </div>
      </div>
      <div className="w-32 text-center font-semibold text-nowrap">
        {formattedStartDate} - {formattedEndDate}
      </div>
      <div className="w-32 text-center">{createdDate}</div>
      <div className="w-24 text-center font-semibold">
        ${total_fee.toFixed(2)}
      </div>
      <div className="flex items-center gap-4 select-none">
        <button
          ref={dropdownRef}
          onClick={toggleOpen}
          className="relative p-4 md:px-2 md:py-1 border-2 border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <BsThreeDots />
          {isOpen && (
            <div className="absolute z-50 rounded-xl shadow-md bg-white overflow-hidden right-0 top-8 text-nowrap text-start w-48 text-sm">
              <div className="flex flex-col cursor-pointer">
                <DropdownItem
                  onClick={() => alert(`booking detail modal of id ${id}`)}
                  label="See details"
                />
                {status === "PENDING" && (
                  <>
                    <DropdownItem
                      onClick={handleConfirm(true)}
                      label="Confirm"
                      isBold
                    />
                    <DropdownItem
                      onClick={handleConfirm(false)}
                      label="Reject"
                      isBold
                    />
                  </>
                )}
                {status === "SUCCESS" && (
                  <>
                    <DropdownItem
                      onClick={handleCheckout(true)}
                      label="Check out"
                      isBold
                    />
                    <DropdownItem
                      onClick={handleCheckout(false)}
                      label="Not showing"
                      isBold
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingItem;
