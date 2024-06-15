import { formatDistanceToNow, parseISO } from "date-fns";
import { Notification } from "./NotificationButton";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const NotificationDetail = ({
  notification,
}: {
  notification: Notification;
}) => {
  const handleOnClick = () => {
    // if (notification.type === "BOOKING") {
    //   alert(
    //     "Go to booking detail of bookingID " +
    //       notification.object_ref_id
    //   );
    // } else {
    //   alert(
    //     "Go to property with id " +
    //       notification.object_ref_id
    //   );
    // }
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
      <div className="flex flex-col w-full">
        <p className="font-semibold text-sm">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(parseISO(notification.created_at.toString()))}
        </p>
      </div>
    </div>
  );
};
export default NotificationDetail;
