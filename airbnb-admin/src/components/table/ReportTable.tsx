import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import ListSkeleton from "../common/ListSkeleton";
import { cn } from "@/lib/utils";
import ResolveReport from "../popup/ResolveReport";
const ReportTable = ({
  type,
}: {
  type: "RESOLVED" | "PENDING";
}) => {
  const [data, setData] = useState<ReportType[] | []>([]);
  const [pagination, setPagination] =
    useState<PaginationType | null>(null);
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReport, setSelectedReport] =
    useState<ReportType | null>(null);

  const axios = useAxiosPrivate();

  const handleResolveSuccess = (id: number) => {
    setData((prevData: ReportType[] | []) => {
      return prevData.filter((report) => report.id !== id);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let queryString = `/admin/report?page=${page}&page_size=10`;
      if (type === "RESOLVED") {
        queryString += "&resolve=true";
      }

      const res = await axios.get(queryString);
      setData(res.data.reports);
      setPagination(res.data.pagination_meta_data);
    };

    fetchData();
  }, [axios, page, type]);

  const handleRowClick = (report: ReportType) => {
    setSelectedReport(report);
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
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              Reporter ID
            </th>
            <th scope="col" className="px-4 py-3">
              Created At
            </th>
            <th scope="col" className="px-4 py-3">
              Detail
            </th>
            <th scope="col" className="px-4 py-3">
              Issue
            </th>
            <th scope="col" className="px-4 py-3">
              Is Resolved
            </th>

            <th scope="col" className="px-4 py-3">
              Reported Entity ID
            </th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((report) => (
            <tr
              key={report.id}
              className={cn(
                "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer",
                !report.is_resolved
              )}
            >
              <td className="px-4 py-4">{report.id}</td>
              <td className="px-4 py-4">
                {report.reporter_id}
              </td>
              <td className="px-4 py-4">
                {report.created_at}
              </td>
              <td className="px-4 py-4">{report.detail}</td>
              <td className="px-4 py-4">{report.issue}</td>
              <td className="px-4 py-4">
                {report.is_resolved ? "Yes" : "No"}
              </td>

              <td className="px-4 py-4">
                {report.reported_id}
              </td>

              <td className="px-4 py-4">
                {type === "PENDING" && (
                  <button
                    className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(report);
                    }}
                  >
                    <MoreVertical size={12} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && selectedReport && (
        <ResolveReport
          selectedReport={selectedReport}
          setShowPopup={setShowPopup}
          onResolveSuccess={handleResolveSuccess}
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

export default ReportTable;
