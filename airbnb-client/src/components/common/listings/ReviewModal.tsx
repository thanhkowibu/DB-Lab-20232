import { ReviewProps } from "@/types/properties.types";
import { getHostingTime } from "@/utils/hostingTime";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Modal } from "../navbar/modals/Modal";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Avatar } from "../Avatar";

type Props = ReviewProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewModal: React.FC<Props> = ({
  id,
  content,
  rating,
  created_at,
  checked_out_date,
  is_recommend,
  user,
  isOpen,
  setIsOpen,
}) => {
  const onClose = () => {
    setIsOpen(false);
  };

  const hostingTime = getHostingTime(user.created_at);

  const formattedCreatedAt = format(new Date(created_at), "MMM yyyy");
  const formattedCheckedOut = format(new Date(checked_out_date), "MMM yyyy");

  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-black" : "text-neutral-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const bodyContent = (
    <div className="flex flex-col gap-2 rounded-xl ">
      <div
        onClick={() => navigate(`/users/${user.id}`)}
        className="flex items-center gap-6 justify-between w-fit rounded-xl py-2 hover:brightness-90 transition duration-300 cursor-pointer"
      >
        <Avatar path={user.avatar?.path || undefined} size="size-14" />
        <div className="flex flex-col">
          <div className="font-semibold tracking-wide text-lg">
            {user.lastname} {user.firstname}
          </div>
          <div className="text-neutral-700">{hostingTime}</div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full pr-2">
        <div className="flex gap-4 font-semibold">
          <div>Rating: {renderStars(rating)}</div>
        </div>

        {is_recommend ? (
          <div className="flex font-semibold items-center gap-2 text-blue-600">
            Recommended <FaThumbsUp />
          </div>
        ) : (
          <div className="flex font-semibold items-center gap-2 text-rose-600">
            Not recommended <FaThumbsDown />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full pr-2 font-semibold">
        <div>Commented at {formattedCreatedAt}</div>
        <div>Checked out at {formattedCheckedOut}</div>
      </div>

      <div className="flex flex-col gap-4 items-start max-h-[45vh] overflow-y-scroll mt-2">
        <div className="text-lg">{content}</div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClose}
      title="Comment Detail"
      actionLabel="Ok"
      body={bodyContent}
      sm
    />
  );
};

export default ReviewModal;
