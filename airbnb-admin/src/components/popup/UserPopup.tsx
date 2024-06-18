import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Dispatch, SetStateAction, useState } from "react";

const UserPopup = ({
  user,
  close,
  setData,
  ban,
}: {
  user: UserDetailType | null;
  close: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<UserDetailType[] | []>>;
  ban: boolean | undefined;
}) => {
  const axios = useAxiosPrivate();
  const [isBan, setIsBan] = useState<boolean | undefined>(
    ban
  );

  if (!user) {
    return <div>Something went wrong..</div>;
  }

  const updateUserData = (isBanned: boolean) => {
    setData((prevData) =>
      prevData.map((u) =>
        u.id === user.id ? { ...u, is_banned: isBanned } : u
      )
    );
  };

  const setAdmin = async () => {
    try {
      await axios.put(`/admin/users/${user.id}/set-admin`);
      setData((prevData) =>
        prevData.map((u) =>
          u.id === user.id
            ? { ...u, roles: ["user", "admin"] }
            : u
        )
      );
      close(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "An error occurred"
      );
    }
  };

  const banUser = async () => {
    try {
      await banReq(true);
      updateUserData(true);
      close(false);
      setIsBan(false);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "An error occurred"
      );
    }
  };

  const unbanUser = async () => {
    try {
      await banReq(false);
      updateUserData(false);
      close(false);
      setIsBan(true);
    } catch (err) {
      console.error(err);
    }
  };

  const banReq = async (ban: boolean) => {
    if (ban) {
      await axios.put(`/admin/users/${user.id}/ban`);
    } else {
      await axios.delete(`/admin/users/${user.id}/ban`);
    }
  };

  return (
    <div className="fixed z-[10000] inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p>
          <strong>User Id:</strong> {user.id}
        </p>
        <div className="mb-4">
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Enabled:</strong>{" "}
            {user.enabled ? "Yes" : "No"}
          </p>
          <p>
            <strong>Banned:</strong>{" "}
            {user.is_banned ? "Yes" : "No"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Roles:</strong> {user.roles.join(", ")}
          </p>
          {user.phone_number && (
            <p>
              <strong>Phone Number:</strong>{" "}
              {user.phone_number}
            </p>
          )}
          {user.gender && (
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
          )}
          {user.dob && (
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(user.dob).toLocaleDateString()}
            </p>
          )}
          {user.avatar && (
            <img
              src={user.avatar.path}
              alt="User Avatar"
              className="w-24 h-24 mt-4"
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {isBan ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                onClick={unbanUser}
              >
                Unban
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                onClick={banUser}
              >
                Ban
              </button>
            )}
            {!user.roles[1] && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                onClick={setAdmin}
              >
                Set Admin
              </button>
            )}
          </div>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => close(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserPopup;
