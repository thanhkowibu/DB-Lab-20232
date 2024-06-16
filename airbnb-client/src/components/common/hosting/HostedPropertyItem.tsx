import { usePlacename } from "@/hooks/useGeocoding";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "../image/Image";
import DeletePropertyModal from "./DeletePropertyModal";

type Props = {
  id: bigint;
  preview_img: string;
  pname: string;
  lat: number;
  long: number;
  created_at: Date;
  updated_at: Date | null;
  onDelete: (id: bigint) => void;
};

const HostedPropertyItem: React.FC<Props> = ({
  id,
  preview_img,
  pname,
  lat,
  long,
  created_at,
  updated_at,
  onDelete,
}) => {
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const formattedCreatedAt = format(new Date(created_at), "MMM dd, yyyy");
  const formattedUpdatedAt = updated_at
    ? format(new Date(updated_at), "MMM dd, yyyy")
    : "Not updated yet";
  const location = usePlacename(lat, long);
  const longTitle = `${pname} in ${location}`;

  const handleDeleteSuccess = () => {
    onDelete(id);
  };

  return (
    <div className="flex flex-col gap-4 w-full border-b-2 pb-6 px-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="size-14 rounded-xl overflow-hidden">
            <Image path={preview_img} />
          </div>
          <div className="flex flex-col gap-[0.25rem] justify-center">
            <div
              onClick={() => navigate(`/properties/${id}`)}
              className="text-lg font-semibold truncate hover:underline cursor-pointer"
            >
              {longTitle}
            </div>
            <div className="text-neutral-600 text-sm">
              Created at {formattedCreatedAt}・
              {updated_at && <>Updated at {formattedUpdatedAt} </>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 select-none">
          <button
            onClick={() => navigate(`/properties/${id}?update=true`)}
            className="rounded-full border-2 border-neutral-200 hover:shadow-md w-24 py-1 text-center text-slate-600 font-semibold text-base transition duration-300"
          >
            Update
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="rounded-full border-2 border-neutral-200 hover:shadow-md w-24 py-1 text-red-500 text-center text-base font-semibold transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>

      <DeletePropertyModal
        id={id}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default HostedPropertyItem;
