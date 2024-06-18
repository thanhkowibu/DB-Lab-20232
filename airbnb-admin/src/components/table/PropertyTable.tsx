import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import ListSkeleton from "../common/ListSkeleton";

const PropertyTable = () => {
  const [data, setData] = useState<PropertyType[] | []>([]);
  const [pagination, setPagination] =
    useState<PaginationType | null>(null);
  const [page, setPage] = useState(1);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/properties?page=${page}&page_size=10`
      );
      setData(res.data.properties);
      setPagination(res.data.pagination_meta_data);
    };

    fetchData();
  }, [axios, page]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure to remove this property?")) {
      try {
        await axios.delete(`/admin/properties/${id}`);
        setData((prevData) =>
          prevData.filter((property) => property.id !== id)
        );
      } catch (error) {
        console.error(
          "Failed to delete the property:",
          error
        );
      }
    }
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
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Nightly Price
            </th>
            <th scope="col" className="px-4 py-3">
              Number of Beds
            </th>
            <th scope="col" className="px-4 py-3">
              Image Count
            </th>
            <th scope="col" className="px-4 py-3">
              Average Rating
            </th>
            <th scope="col" className="px-4 py-3">
              Created At
            </th>
            <th scope="col" className="px-4 py-3">
              Updated At
            </th>
            <th scope="col" className="px-4 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((property) => (
            <tr
              key={property.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
            >
              <td className="px-4 py-4">{property.id}</td>
              <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {property.name}
              </td>
              <td className="px-4 py-4">
                {property.nightly_price}
              </td>
              <td className="px-4 py-4">
                {property.num_beds}
              </td>
              <td className="px-4 py-4">
                {property.images.length}
              </td>
              <td className="px-4 py-4">
                {property.average_rating}
              </td>
              <td className="px-4 py-4">
                {property.created_at.substring(0, 10)}
              </td>
              <td className="px-4 py-4">
                {property.updated_at.substring(0, 10)}
              </td>
              <td className="px-4 py-4">
                <button
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(property.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            {pagination.last_page * pagination.page_size}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              disabled={pagination.current_page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </li>
          <li>
            <button
              disabled={!pagination.has_next_page}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PropertyTable;
