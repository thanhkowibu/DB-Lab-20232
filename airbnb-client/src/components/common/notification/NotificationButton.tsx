import { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

export type Notfication = {
  id: number;
  receiver_id: number;
  message: string;
  is_read: boolean;
  created_at: Date;
};

const NotificationButton = ({
  receiverId,
}: {
  receiverId: number;
}) => {
  const [notifications, setNotifications] = useState<
    Notfication[] | []
  >([]);

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/notifications/${receiverId}`
        );
        const initialNotifications = await response.json();
        setNotifications(initialNotifications);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialNotifications();

    const eventSource = new EventSource(
      `http://localhost:8080/api/v1/notifications/subscribe?userId=${receiverId}`
    );
    eventSource.onmessage = function (event) {
      const newEvent = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newEvent,
      ]);
    };

    eventSource.onopen = () => {
      console.log("Connection to server opened.");
    };

    eventSource.onerror = function (err) {
      console.error("EventSource failed: ", err);
    };

    return () => {
      eventSource.close();
    };
  }, [receiverId]);

  console.log(notifications);

  return (
    <div className="rounded-full p-2 flex items-center justify-center hover:bg-neutral-200 transition duration-300 cursor-pointer mr-2">
      <IoIosNotificationsOutline size={18} />
    </div>
  );
};
export default NotificationButton;
