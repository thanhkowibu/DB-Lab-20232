/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedRequest: RoleRequestType;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  onResolveSuccess: (
    arg0: number,
    arg1: "accept" | "reject"
  ) => void;
}

const ResolveHostRequest = ({
  selectedRequest,
  setShowPopup,
  onResolveSuccess,
}: Props) => {
  const [selectedAction, setSelectedAction] =
    useState<string>("");
  const axios = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  const handleResolve = async () => {
    if (!selectedAction) {
      alert("Please select your action");
      return;
    }
    try {
      let res: any;
      if (selectedAction === "accept") {
        // Call API to ban
        res = await axios.put(
          `/admin/users/${selectedRequest.user_id}/set-host/${selectedRequest.id}?confirm=true`
        );
      } else {
        res = await axios.put(
          `/admin/users/${selectedRequest.user_id}/set-host/${selectedRequest.id}?confirm=false`
        );
      }
      if (res.flag === false) {
        throw new Error(res.message);
      }

      onResolveSuccess(
        selectedRequest.id,
        selectedAction === "accept" ? "accept" : "reject"
      );
      setIsLoading(false);
      setShowPopup(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed z-[9999] inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-70">
          <LoaderCircle
            className="animate-spin"
            size={72}
          />
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex flex-col">
          <p className="text-xl font-bold mb-4">
            What do you want to do with #
            {selectedRequest?.id}?
          </p>
          <select
            value={selectedAction}
            onChange={(e) =>
              setSelectedAction(e.target.value)
            }
            className="mb-4 p-2 border rounded-md"
          >
            <option value="">Select action</option>

            <>
              <option value="do-nothing">Do Nothing</option>
              <option value="accept">Accept</option>
            </>
          </select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full cursor-pointer"
            onClick={() => setShowPopup(false)}
            disabled={isLoading}
          >
            Close
          </button>
          <button
            className={
              "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full cursor-pointer"
            }
            onClick={handleResolve}
            disabled={isLoading}
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveHostRequest;
