import { Modal } from "../navbar/modals/Modal";
import toast from "react-hot-toast";
import propertyApi from "@/api/modules/property.api";

type Props = {
  id: bigint;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

const DeletePropertyModal: React.FC<Props> = ({
  id,
  isOpen,
  setIsOpen,
  onDeleteSuccess,
}) => {
  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async () => {
    try {
      const res = await propertyApi.delete(id);
      if (res.code === 200) {
        toast.success("Deleted property successfully");
        onDeleteSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const bodyContent = (
    <div className="text-2xl font-semibold text-center h-[10vh] flex items-center justify-center">
      Are you sure to delete this property?
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Delete property"
      actionLabel="Delete"
      secondaryLabel="Cancel"
      secondaryAction={onClose}
      body={bodyContent}
      sm
    />
  );
};

export default DeletePropertyModal;
