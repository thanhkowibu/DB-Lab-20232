import { formatDistanceToNow } from "date-fns";
import { Notification } from "./NotificationButton";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const NotificationDetail = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (notification.type === "BOOKING") {
      alert("Go to booking detail of bookingID " + notification.object_ref_id);
    } else {
      navigate(`/properties/${notification.object_ref_id}`);
    }
  };

  return (
    <div
      className="flex gap-3 items-center px-4 py-3 hover:bg-neutral-200 cursor-pointer"
      onClick={handleOnClick}
    >
      <div>
        {notification.type === "BOOKING" ? (
          <BiSolidCreditCardAlt size={32} />
        ) : (
          <SiHomeassistantcommunitystore size={28} />
        )}
      </div>
      <div className="flex flex-col w-[70%]">
        <p className="font-semibold text-md truncate">
          {notification.message + " " + notification.message}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(notification.created_at)}
        </p>
      </div>
    </div>
  );
};
export default NotificationDetail;
