import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import ListSkeleton from "../common/ListSkeleton";
import BookingStatus from "../common/BookingStatus";
import BookingModal from "../popup/BookingModal";

const BookingTable = () => {
  const [data, setData] = useState<BookingType[] | []>([]);
  const [pagination, setPagination] =
    useState<PaginationType | null>(null);
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingType | null>(null);

  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/admin/bookings?page=${page}&page_size=10`
      );
      setData(res.data.bookings);
      setPagination(res.data.pagination_meta_data);
    };

    fetchData();
  }, [axios, page]);

  const handleRowClick = (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  if (!data || !pagination) {
    return <ListSkeleton />;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6 py-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              id
            </th>
            <th scope="col" className="px-4 py-3">
              Check-in Date
            </th>
            <th scope="col" className="px-4 py-3">
              Check-out Date
            </th>
            <th scope="col" className="px-4 py-3">
              Created At
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              Issuer Email
            </th>
            <th scope="col" className="px-4 py-3">
              Issuer Id
            </th>
            <th scope="col" className="px-4 py-3">
              Host Id
            </th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((booking) => (
            <tr
              key={booking.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleRowClick(booking)}
            >
              <td className="px-4 py-4">{booking.id}</td>
              <td className="px-4 py-4">
                {booking.check_in_date}
              </td>
              <td className="px-4 py-4">
                {booking.check_out_date}
              </td>
              <td className="px-4 py-4">
                {booking.created_at}
              </td>
              <td className="">
                <BookingStatus status={booking.status} />
              </td>
              <td className="px-4 py-4">
                {booking.issuer_email}
              </td>
              <td className="px-4 py-4">
                {booking.issuer_id}
              </td>
              <td className="px-4 py-4">
                {booking.host_id}
              </td>
              <td className="px-4 py-4">
                <button
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(booking);
                  }}
                >
                  <MoreVertical size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          setShowPopup={setShowPopup}
        />
      )}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {(pagination.current_page - 1) *
              pagination.page_size +
              1}
            -
            {(pagination.current_page - 1) *
              pagination.page_size +
              pagination.page_size}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pagination.record_count}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              disabled={pagination.current_page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          <li>
            <button
              disabled={!pagination.has_next_page}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookingTable;
