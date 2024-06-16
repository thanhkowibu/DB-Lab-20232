import { Notification } from "./NotificationButton";
import NotificationDetail from "./NotificationDetail";

interface NotificationDropDownProps {
  notifications: Notification[] | [];
}

const NotificationDropDown = ({ notifications }: NotificationDropDownProps) => {
  return (
    <div className="absolute z-[99999] bg-white border-2 w-96 max-h-[70vh] top-10 -left-[650%] rounded-lg overflow-y-auto text-neutral-800">
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center h-[40vh] flex-col gap-3">
          <img
            width={108}
            height={108}
            src="/images/empty_state.gif"
            alt="empty notifications"
          />
          <div className="text-center mt-2">
            <p className="font-bold mb-1">Hurray</p>
            <p>Nothing To Review At The Moment</p>
          </div>
        </div>
      ) : (
        <div>
          {notifications.map((n, index) => (
            <NotificationDetail key={index} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
};
export default NotificationDropDown;
