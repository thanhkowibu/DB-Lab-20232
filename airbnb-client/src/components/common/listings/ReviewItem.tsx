import { ReviewProps } from "@/types/properties.types";
import { getHostingTime } from "@/utils/hostingTime";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar";
import { format } from "date-fns";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ReviewItem: React.FC<ReviewProps> = ({
  id,
  content,
  rating,
  created_at,
  checked_out_date,
  is_recommend,
  user,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hostingTime = getHostingTime(user.created_at);

  const formattedCreatedAt = format(new Date(created_at), "MMM yyyy");

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

  return (
    <div className="flex flex-col gap-2 h-52 rounded-xl">
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
          <div>{renderStars(rating)}</div>
          <div>{formattedCreatedAt}</div>
        </div>

        {is_recommend ? (
          <div className="flex font-semibold items-center gap-2">
            Recommended <FaThumbsUp />
          </div>
        ) : (
          <div className="flex font-semibold items-center gap-2">
            Not recommended <FaThumbsDown />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="text-lg line-clamp-3 text-justify ">{content}</div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-lg font-semibold underline"
        >
          Read more
        </button>
      </div>

      <ReviewModal
        id={id}
        content={content}
        rating={rating}
        created_at={created_at}
        checked_out_date={checked_out_date}
        is_recommend={is_recommend}
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default ReviewItem;
