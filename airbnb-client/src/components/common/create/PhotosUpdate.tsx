import { useRef } from "react";
import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { cn } from "@/lib/utils";

type PhotosProps = {
  oldImgs: { name: string; is_remove: boolean }[];
  setOldImgs: React.Dispatch<
    React.SetStateAction<{ name: string; is_remove: boolean }[]>
  >;
  newImgs: File[];
  setNewImgs: React.Dispatch<React.SetStateAction<File[]>>;
  imgUrls: string[];
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  nooverflow?: boolean;
};

export const PhotosUpdate = ({
  oldImgs,
  setOldImgs,
  newImgs,
  setNewImgs,
  imgUrls,
  setImgUrls,
  nooverflow,
}: PhotosProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos: File[] = [];
      const newPhotoUrls: string[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const img = event.target.files[i];
        newPhotos.push(img);
        newPhotoUrls.push(URL.createObjectURL(img));
      }
      setNewImgs([...newImgs, ...newPhotos]);
      setImgUrls([...imgUrls, ...newPhotoUrls]);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleRemove = (index: number, isOld: boolean) => {
    if (isOld) {
      const updatedOldImgs = [...oldImgs];
      updatedOldImgs[index].is_remove = !updatedOldImgs[index].is_remove;
      setOldImgs(updatedOldImgs);
    } else {
      const newImages = [...newImgs];
      const newImageUrls = [...imgUrls];

      newImages.splice(index - oldImgs.length, 1);
      newImageUrls.splice(index, 1);

      setNewImgs(newImages);
      setImgUrls(newImageUrls);
    }
  };

  return (
    <div className="flex gap-5 items-center justify-center flex-col h-full">
      <h2 className="font-semibold text-4xl">
        Update the photos of your house
      </h2>
      <p>You can remove old images or add even more images.</p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        ref={fileInputRef}
        className="hidden"
      />
      {imgUrls.length === 0 && (
        <button
          type="button"
          onClick={handleUploadButtonClick}
          className="bg-rose-500 py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer"
        >
          Upload
        </button>
      )}
      <div
        className={cn(
          "grid grid-cols-3 gap-4 overflow-auto pb-10 no-scrollbar",
          {
            "h-[55vh]": !nooverflow,
          }
        )}
      >
        {imgUrls.map((url, index) => (
          <div
            className={cn(
              "relative size-36 md:size-60 rounded-xl overflow-hidden select-none",
              {
                "opacity-30":
                  index < oldImgs.length && oldImgs[index].is_remove,
              }
            )}
            key={index}
          >
            <button
              type="button"
              onClick={() => handleRemove(index, index < oldImgs.length)}
              className="absolute top-1 right-1 size-8 rounded-full bg-black opacity-30 hover:opacity-100 hover:scale-110 transition duration-300 flex flex-col items-center justify-center"
            >
              {index < oldImgs.length && oldImgs[index].is_remove ? (
                <FaUndo size={14} fill="white" />
              ) : (
                <FaTrashAlt size={14} fill="white" />
              )}
            </button>
            <img src={url} alt="upload" className="size-full object-cover" />
          </div>
        ))}

        {imgUrls.length !== 0 && (
          <div
            onClick={handleUploadButtonClick}
            className="relative size-36 md:size-60 rounded-xl bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition duration-300 overflow-hidden cursor-pointer select-none"
          >
            <CiCirclePlus fill="white" className="size-24 object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};
