import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Modal } from "../navbar/modals/Modal";
import userApi from "@/api/modules/user.api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/useAuth";

type Props = { userId: number };

const UpdateAvatar: React.FC<Props> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const { user, updateUser } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const img = event.target.files[0];
      setImg(img);
      setImgUrl(URL.createObjectURL(img));
      setIsOpen(true);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setImg(null);
    setImgUrl(null);
  };

  const onSubmit = async () => {
    if (img) {
      const formData = new FormData();
      formData.append("images", img);

      try {
        const res = await userApi.updateAvatar(userId, formData);
        if (res) {
          toast.success("Avatar updated");
          const updatedUser: any = {
            ...user,
            avatar: {
              name: res.data.name,
              path: res.data.path,
            },
          };
          updateUser(updatedUser);
        }

        onClose();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const bodyContent = (
    <div className="flex justify-center items-center size-full">
      <div className="h-96 aspect-square">
        <div
          onClick={handleUploadButtonClick}
          className="absolute size-96 rounded-full bg-black/50 opacity-0 hover:opacity-70 transition duration-300 flex justify-center items-center cursor-pointer"
        >
          <FaCamera size={80} fill="white" />
        </div>
        <img
          src={imgUrl ? imgUrl : ""}
          className="object-cover size-full rounded-full"
        />
      </div>
    </div>
  );

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <div
        onClick={handleUploadButtonClick}
        className="absolute size-full rounded-full bg-black/50 opacity-0 hover:opacity-70 transition duration-300 flex justify-center items-center cursor-pointer"
      >
        <FaCamera size={80} fill="white" />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title="Update avatar"
        actionLabel="Update"
        secondaryLabel="Cancel"
        secondaryAction={onClose}
        body={bodyContent}
        sm
      />
    </>
  );
};

export default UpdateAvatar;
