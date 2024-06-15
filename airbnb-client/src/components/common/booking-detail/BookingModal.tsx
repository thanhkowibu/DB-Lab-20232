import { BiX } from "react-icons/bi";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BookingLogProps,
  BookingResProps,
} from "@/types/booking.types";
import bookingApi from "@/api/modules/booking.api";
import BookingLog from "./BookingLog";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { format } from "date-fns";

interface BookingModalProps {
  booking: BookingResProps;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const BookingModal = ({
  booking,
  setShowPopup,
}: BookingModalProps) => {
  const [logs, setLogs] = useState<BookingLogProps[] | []>(
    []
  );
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookingApi.getLog(booking.id);
        if (res.code === 200) {
          setLogs(res.data);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        toast.error("Something went wrong..");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [booking.id]);

  useOnClickOutside(divRef, () => setShowPopup(false));

  if (isLoading)
    return (
      <div className="bg-gray-900 bg-opacity-80 fixed z-[10000] inset-0 flex items-center justify-center">
        <CgSpinner className="animate-spin" size={60} />
      </div>
    );

  return (
    <div className="bg-gray-900 bg-opacity-80 fixed z-[10000] inset-0 flex items-center justify-center">
      {/* CONTENT */}
      <div
        className="max-w-[720px] min-h-[80vh] mx-auto p-5 bg-white rounded-lg shadow-md"
        ref={divRef}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b-2 mb-5 pb-2">
          <h3 className="font-semibold text-lg">
            Track the delivery of booking #{booking.id}
          </h3>
          <button
            className="text-sm p-2 bg-transparent rounded-lg ml-auto text-gray-500"
            onClick={() => setShowPopup(false)}
          >
            <BiX size={24} />
          </button>
        </div>
        {/* BODY */}
        <div className="flex gap-12 items-start">
          <div className="w-full flow-root divide-y">
            <div className="flex items-center justify-between pb-4">
              <dl className="font-semibold whitespace-nowrap">
                Order Date
              </dl>
              <dd className="text-right">
                {new Date(
                  booking.created_at
                ).toLocaleDateString()}
              </dd>
            </div>

            <div className="flex items-center justify-between py-4">
              <dl className="font-semibold whitespace-nowrap">
                Email
              </dl>
              <dd className="text-right">
                {booking.issuer_email}
              </dd>
            </div>

            <div className="flex items-center justify-between py-4">
              <dl className="font-semibold whitespace-nowrap">
                Property
              </dl>
              <dd className="text-right">
                {booking.property_name}
              </dd>
            </div>

            <div className="flex items-center justify-between py-4">
              <dl className="font-semibold whitespace-nowrap">
                From
              </dl>
              <dd className="text-right">
                {`${format(
                  booking.check_in_date,
                  "PP"
                ).toString()} - ${format(
                  booking.check_out_date,
                  "PP"
                ).toString()}`}
              </dd>
            </div>

            <div className="border rounded-md p-4 bg-gray-50 ">
              <h4 className="font-semibold text-lg mb-3">
                Order amount
              </h4>
              <dl className="flex justify-between items-center gap-4 mb-1">
                <dt className="font-normal">Nightly Fee</dt>
                <dd className="font-medium">
                  ${booking.nightly_fee}
                </dd>
              </dl>
              <dl className="flex justify-between items-center gap-4 mb-1">
                <dt className="font-normal">Service Fee</dt>
                <dd className="font-medium">
                  ${booking.service_fee}
                </dd>
              </dl>
              <dl className="flex justify-between items-center gap-4 mb-1">
                <dt className="font-normal">Clean Fee</dt>
                <dd className="font-medium">
                  ${booking.clean_fee}
                </dd>
              </dl>
              <dl className="flex justify-between items-center gap-4 mb-1">
                <dt className="font-normal">Savings</dt>
                <dd className="font-medium text-green-500">
                  $0
                </dd>
              </dl>
              <dl className="font-bold pt-2 border-t gap-4 flex items-center justify-between mt-4">
                <dt>Total</dt>
                <dd>${booking.total_fee}</dd>
              </dl>
            </div>
          </div>

          <ol className="border-s ms-3 border-dotted border-l-2 w-full relative list-none m-0 p-0">
            {logs.map((log, i) => (
              <BookingLog log={log} key={i} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
export default BookingModal;
