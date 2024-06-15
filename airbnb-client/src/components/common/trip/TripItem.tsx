import { format } from "date-fns";
import { Image } from "../image/Image";
import { useCountry, usePlacename } from "@/hooks/useGeocoding";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import CancelModal from "./CancelModal";

type Props = {
  id: number;
  pid: number;
  preview_img: string;
  pname: string;
  lat: number;
  long: number;
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
  id,
  pid,
  preview_img,
  pname,
  lat,
  long,
  check_in_date,
  check_out_date,
  status,
  onCancel,
}) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formattedStartDate = format(new Date(check_in_date), "MMM dd");
  const formattedEndDate = format(new Date(check_out_date), "MMM dd");
  const location = usePlacename(lat, long);
  const longTitle = `${pname} in ${location}`;
  const country = useCountry(lat, long);

  const isEnableCancel =
    status === "PENDING" || status === "CONFIRMED" || status === "SUCCESS";

  const handleCancelSuccess = () => {
    onCancel(id);
  };

  return (
    <div className="flex flex-col gap-4 w-full border-b-2 pb-6 px-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="size-14 rounded-xl overflow-hidden">
            <Image path={preview_img} />
          </div>
          <div className="flex flex-col gap-[0.25rem] justify-center">
            <div
              onClick={() => navigate(`/properties/${pid}`)}
              className="text-lg font-semibold truncate hover:underline cursor-pointer"
            >
              {longTitle}
            </div>
            <div className="text-neutral-600">
              {country}・{formattedStartDate} - {formattedEndDate}{" "}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 select-none">
          <div
            onClick={() => alert(`booking detail modal of id ${id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer"
          >
            <FaInfoCircle size={28} fill={isHovered ? "#737373" : "#D4D4D4"} />
          </div>
          <div
            className={cn(
              "rounded-full bg-gradient-to-br w-24 py-1 text-white text-center font-semibold",
              statusGradient[status]
            )}
          >
            {statusLabel[status]}
          </div>
          <button
            disabled={!isEnableCancel}
            onClick={() => setIsOpen(true)}
            className={cn(
              "rounded-full border-2 border-neutral-200 hover:shadow-md w-24 py-1 text-red-500 text-center text-base font-semibold transition duration-300",
              {
                "cursor-not-allowed opacity-40": !isEnableCancel,
              }
            )}
          >
            Cancel
          </button>
        </div>
      </div>
      {isOpen && (
        <CancelModal
          id={id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onCancelSuccess={handleCancelSuccess}
        />
      )}
    </div>
  );
};

export default TripItem;
