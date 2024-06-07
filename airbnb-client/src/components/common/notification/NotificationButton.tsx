import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationDropDown from "./NotificationDropDown";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import publicClient from "@/api/client/public.client";
import { cn } from "@/lib/utils";

export type Notification = {
  is_read: boolean;
  message: string;
  created_at: Date;
  type: string;
  object_ref_id: number;
  receiver_id: number;
};

const NotificationButton = ({
  receiverId,
}: {
  receiverId: number;
}) => {
  const [notifications, setNotifications] = useState<
    Notification[] | []
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const unReadMessageCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        // const response = await fetch(
        //   `http://localhost:8080/api/v1/notifications/${receiverId}`
        // );
        // const res = await response.json();
        const res = await publicClient.get(
          `http://localhost:8080/api/v1/notifications/${receiverId}`
        );
        const initialNotifications = res.data;
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
        newEvent,
        ...prevNotifications,
      ]);
    };

    eventSource.onerror = function (err) {
      console.error("EventSource failed: ", err);
    };

    return () => {
      eventSource.close();
    };
  }, [receiverId]);

  const readingNotifications = async () => {
    if (unReadMessageCount > 0) {
      await publicClient.get(
        `http://localhost:8080/api/v1/notifications/${receiverId}/read`
      );
    }
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, is_read: true }))
    );
  };

  const handleOpenDropDown = () => {
    readingNotifications();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative " ref={dropdownRef}>
      <div
        className="rounded-full p-2 flex items-center justify-center hover:bg-neutral-200 transition duration-150 cursor-pointer mr-2 relative group"
        onClick={() => handleOpenDropDown()}
      >
        <IoIosNotificationsOutline size={28} />
        {unReadMessageCount > 0 && (
          <div
            className={cn(
              "bg-red-500 group-hover:animate-ping  text-neutral-200 rounded-full px-2 text-xs py-1 absolute top-0 right-0 font-semibold",
              unReadMessageCount > 9 && "px-1"
            )}
          >
            {unReadMessageCount > 9
              ? "9+"
              : unReadMessageCount}
          </div>
        )}
      </div>
      {isOpen && (
        <NotificationDropDown
          notifications={notifications}
        />
      )}
    </div>
  );
};
export default NotificationButton;
