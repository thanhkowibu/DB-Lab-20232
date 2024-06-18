import { BiX } from "react-icons/bi";
import BookingLog from "./BookingLog";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

interface BookingModalProps {
  booking: BookingType;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const BookingModal = ({
  booking,
  setShowPopup,
}: BookingModalProps) => {
  const [logs, setLogs] = useState<BookingLog[] | []>([]);
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `bookings/${booking.id}/log`
      );
      setLogs(res.data);
    };

    fetchData();
  }, [axios, booking.id]);

  return (
    <div className="bg-gray-900 bg-opacity-50 fixed z-[10000] inset-0 flex items-center justify-center">
      {/* CONTENT */}
      <div className="max-w-[800px] min-h-[80vh] mx-auto p-5 bg-white">
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
                {`${booking.check_in_date} - ${booking.check_out_date}`}
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
        {/* <div>ACTION </div> */}
      </div>
    </div>
  );
};
export default BookingModal;
