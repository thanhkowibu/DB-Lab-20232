import toast from "react-hot-toast";
import { Modal } from "./Modal";
import { useAuth } from "@/context/useAuth";
import userApi from "@/api/modules/user.api";
import { useEffect, useState } from "react";

type NotificationPreferences = {
  notifyOnHostedPropertyRating: boolean;
  notifyOnHostedPropertyLike: boolean;
  notifyOnHostedPropertyBooked: boolean;
  notifyOnBookingStatusChange: boolean;
  notifyOnSpecialOffers: boolean;
};

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingNotiModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [preferences, setPreferences] =
    useState<NotificationPreferences | null>(null);

  const { user } = useAuth();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleToggleChange = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev!,
      [key]: !prev![key],
    }));
  };

  useEffect(() => {
    if (isOpen && user) {
      const fetchData = async () => {
        try {
          const res = await userApi.getNotiPref(user.id);
          if (res.code === 200) {
            setPreferences(res.data);
          } else {
            toast.error("Failed to fetch notification settings");
          }
        } catch (err: any) {
          toast.error(err.message);
        }
      };

      fetchData();
    }
  }, [isOpen, user]);

  const onSubmit = async () => {
    if (user && preferences) {
      try {
        const res = await userApi.updateNotiPref(user?.id, preferences);
        if (res.code === 200) {
          toast.success("Settings saved");
          onClose();
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const bodyContent = preferences ? (
    <div className="text-2xl font-semibold text-center flex flex-col items-center justify-center cursor-default">
      {Object.keys(preferences).map((key) => (
        <label
          key={key}
          className="inline-flex items-center cursor-pointer my-2"
        >
          <input
            type="checkbox"
            className="sr-only peer"
            checked={preferences[key as keyof NotificationPreferences]}
            onChange={() =>
              handleToggleChange(key as keyof NotificationPreferences)
            }
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </span>
        </label>
      ))}
    </div>
  ) : (
    <div></div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Notification settings"
      actionLabel="Save"
      secondaryLabel="Cancel"
      secondaryAction={onClose}
      body={bodyContent}
      sm
    />
  );
};

export default SettingNotiModal;
