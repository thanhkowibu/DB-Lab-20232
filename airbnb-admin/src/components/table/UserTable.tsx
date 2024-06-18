import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import UserPopup from "../popup/UserPopup";
import ListSkeleton from "../common/ListSkeleton";

const UserTable = () => {
  const [data, setData] = useState<UserDetailType[] | []>(
    []
  );
  const [pagination, setPagination] =
    useState<PaginationType | null>(null);
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<UserDetailType | null>(null);

  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/users?page=${page}&page_size=10`
      );
      setData(res.data.users);
      setPagination(res.data.pagination_meta_data);
    };

    fetchData();
  }, [axios, page]);

  const handleRowClick = (user: UserDetailType) => {
    setSelectedUser(user);
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
              Is banned
            </th>
            <th scope="col" className="px-4 py-3">
              Is enabled
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              Created At
            </th>
            <th scope="col" className="px-4 py-3">
              Roles
            </th>
            <th scope="col" className="px-4 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-4 py-3">
              Gender
            </th>
            <th scope="col" className="px-4 py-3">
              Date of Birth
            </th>
            <th scope="col" className="px-4 py-3">
              Avatar
            </th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-4 py-4">{user.id}</td>
              <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.is_banned ? "true" : "false"}
              </td>
              <td className="px-4 py-4">
                {user.enabled ? "true" : "false"}
              </td>
              <td className="px-4 py-4">{user.email}</td>
              <td className="px-4 py-4">
                {user.created_at.toString()}
              </td>
              <td className="px-4 py-4 text-gray-900 font-semibold">
                {user.roles.join(", ")}
              </td>
              <td className="px-4 py-4">
                {user.phone_number || "-"}
              </td>
              <td className="px-4 py-4">
                {user.gender || "-"}
              </td>
              <td className="px-4 py-4">
                {user.dob?.toString().substring(0, 10) ||
                  "-"}
              </td>
              <td className="px-4 py-4">
                {user.avatar ? (
                  <img
                    src={user.avatar.path}
                    alt={user.avatar.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-4">
                <button
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(user);
                  }}
                >
                  <Pencil size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <UserPopup
          user={selectedUser}
          close={setShowPopup}
          setData={setData}
          ban={selectedUser?.is_banned}
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

export default UserTable;
