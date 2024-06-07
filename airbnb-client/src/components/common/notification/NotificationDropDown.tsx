import { Notification } from "./NotificationButton";
import NotificationDetail from "./NotificationDetail";

interface NotificationDropDownProps {
  notifications: Notification[] | [];
}

const NotificationDropDown = ({
  notifications,
}: NotificationDropDownProps) => {
  return (
    <div className="absolute z-100 bg-white border-2 w-96 max-h-[70vh] top-10 -left-[650%] rounded-lg overflow-y-auto text-neutral-800">
      <div>
        {notifications.map((n) => (
          <NotificationDetail notification={n} />
        ))}
      </div>
    </div>
  );
};
export default NotificationDropDown;
