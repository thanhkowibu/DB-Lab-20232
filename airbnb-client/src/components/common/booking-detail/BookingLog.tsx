import { BookingLogProps } from "@/types/booking.types";
import { format } from "date-fns";
import { BsBuildingCheck, BsCart2 } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { PiScanSmileyLight } from "react-icons/pi";
import {
  TbHomeQuestion,
  TbShoppingCartCancel,
} from "react-icons/tb";

const BookingLog = ({ log }: { log: BookingLogProps }) => {
  return (
    <li className="ms-6 mb-9">
      <span className="-start-4 rounded-full justify-center items-center flex w-8 h-8 absolute bg-white">
        {log.type === "PENDING" && (
          <BsCart2 color="green" size={20} />
        )}
        {log.type === "CONFIRMED" && (
          <BsBuildingCheck color="green" size={20} />
        )}
        {log.type === "SUCCESS" && (
          <CiCreditCard1 color="green" size={24} />
        )}
        {log.type === "REJECTED" && (
          <TbShoppingCartCancel />
        )}
        {log.type === "CHECK_OUT" && (
          <PiScanSmileyLight color="green" size={28} />
        )}
        {log.type === "NO_SHOW" && (
          <TbHomeQuestion size={20} />
        )}
        {log.type === "CANCEL" && (
          <MdOutlineFreeCancellation size={20} />
        )}
      </span>
      <h3 className="font-semibold text-base items-center flex">
        {log.description}
      </h3>
      <p className="text-gray-400 font-normal text-base block mb-2">
        {format(log.time, "PPpp").toString()}
      </p>
    </li>
  );
};
export default BookingLog;
