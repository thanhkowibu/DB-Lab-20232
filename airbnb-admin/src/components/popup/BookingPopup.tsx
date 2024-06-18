import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FileClock, ReceiptText } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const BookingPopup = ({
  selectedBooking,
  setShowPopup,
}: {
  selectedBooking: BookingType | null;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const axios = useAxiosPrivate();
  const [logs, setLogs] = useState<BookingLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      if (selectedBooking) {
        try {
          const response = await axios.get(
            `/bookings/${selectedBooking.id}/log`
          );
          setLogs(response.data);
        } catch (error) {
          console.error(
            "Failed to fetch booking logs:",
            error
          );
        }
      }
    };

    fetchLogs();
  }, [selectedBooking, axios]);

  if (!selectedBooking) {
    return <div>Something went wrong..</div>;
  }

  const toggleView = () => {
    setShowLogs(!showLogs);
  };

  return (
    <div className="fixed z-[10000] inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto">
        <p className="text-xl font-bold mb-4">
          Booking ID: {selectedBooking.id}
        </p>

        {showLogs ? (
          <div>
            <h3 className="text-lg font-bold mt-4 mb-2">
              Booking Logs:
            </h3>
            {logs.length > 0 ? (
              <ul>
                {logs.map((log, index) => (
                  <li key={index} className="mb-2">
                    <p>
                      <strong>Type:</strong> {log.type}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {new Date(log.time).toLocaleString()}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {log.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No logs available for this booking.</p>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <p>
              <strong>Check-in Date:</strong>{" "}
              {selectedBooking.check_in_date}
            </p>
            <p>
              <strong>Check-out Date:</strong>{" "}
              {selectedBooking.check_out_date}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {selectedBooking.created_at}
            </p>
            <p>
              <strong>Is Confirmed:</strong>{" "}
              {selectedBooking.is_confirm ? "Yes" : "No"}
            </p>
            <p>
              <strong>Nightly Fee:</strong> $
              {selectedBooking.nightly_fee}
            </p>
            <p>
              <strong>Cleaning Fee:</strong> $
              {selectedBooking.clean_fee}
            </p>
            <p>
              <strong>Service Fee:</strong> $
              {selectedBooking.service_fee}
            </p>
            <p>
              <strong>Number of Adults:</strong>{" "}
              {selectedBooking.num_alduts}
            </p>
            <p>
              <strong>Number of Children:</strong>{" "}
              {selectedBooking.num_childrens}
            </p>
            <p>
              <strong>Number of Pets:</strong>{" "}
              {selectedBooking.num_pets}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedBooking.status}
            </p>
            <p>
              <strong>Issuer ID:</strong>{" "}
              {selectedBooking.issuer_id}
            </p>
            <p>
              <strong>Host ID:</strong>{" "}
              {selectedBooking.host_id}
            </p>
            <p>
              <strong>Property ID:</strong>{" "}
              {selectedBooking.property_id}
            </p>
            <p>
              <strong>Number of Guests:</strong>{" "}
              {selectedBooking.num_guests}
            </p>
            <p>
              <strong>Total Fee:</strong> $
              {selectedBooking.total_fee}
            </p>
            <p>
              <strong>Issuer Email:</strong>{" "}
              {selectedBooking.issuer_email}
            </p>
            <p>
              <strong>Issuer First Name:</strong>{" "}
              {selectedBooking.issuer_firstname}
            </p>
            <p>
              <strong>Is Checked Out:</strong>{" "}
              {selectedBooking.is_checked_out
                ? "Yes"
                : "No"}
            </p>
          </div>
        )}

        <div className=" mt-4 flex gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>

          <button
            className=" ml-3 border-2 text-black px-3 py-2 rounded-full"
            onClick={toggleView}
          >
            {showLogs ? <ReceiptText /> : <FileClock />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
