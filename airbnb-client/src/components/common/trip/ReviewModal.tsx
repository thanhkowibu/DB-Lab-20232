import bookingApi from "@/api/modules/booking.api";
import { Modal } from "../navbar/modals/Modal";
import toast from "react-hot-toast";

type Props = {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancelSuccess: () => void;
};

const ReviewModal: React.FC<Props> = ({
  id,
  isOpen,
  setIsOpen,
  onCancelSuccess,
}) => {
  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async () => {
    try {
      const res = await bookingApi.cancel(id);
      if (res.code === 200) {
        toast.success("Canceled booking successfully");
        onCancelSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const bodyContent = (
    <div className="text-2xl font-semibold text-center h-[10vh] flex items-center justify-center">
      Are you sure to cancel this booking request?
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Confirmation"
      actionLabel="Confirm"
      secondaryLabel="Go back"
      secondaryAction={onClose}
      body={bodyContent}
      sm
    />
  );
};

export default ReviewModal;
