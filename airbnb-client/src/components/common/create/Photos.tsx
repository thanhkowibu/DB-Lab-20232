import { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

type PhotosProps = {
  imgs: File[];
  setImgs: React.Dispatch<React.SetStateAction<File[]>>;
  imgUrls: string[];
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Photos = ({ imgs, setImgs, imgUrls, setImgUrls }: PhotosProps) => {
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
      setImgs([...imgs, ...newPhotos]);
      setImgUrls([...imgUrls, ...newPhotoUrls]);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newImgs = [...imgs];
    const newImgUrls = [...imgUrls];

    newImgs.splice(index, 1);
    newImgUrls.splice(index, 1);

    setImgs(newImgs);
    setImgUrls(newImgUrls);
  };

  return (
    <div className="flex gap-5 items-center justify-center flex-col h-full">
      <h2 className="font-semibold text-4xl">Add some photos of your house</h2>
      <p>
        You'll need at least 1 photo to get started. You can add more or make
        changes later.
      </p>
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
          className="bg-rose-500 py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer"
        >
          Upload
        </button>
      )}
      <div className="grid grid-cols-3 gap-4 h-[55vh] overflow-auto pb-10 no-scrollbar">
        {imgUrls.map((url, index) => (
          <div
            className="relative size-36 md:size-60 rounded-xl overflow-hidden select-none"
            key={index}
          >
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 size-8 rounded-full bg-black opacity-30 hover:opacity-100 hover:scale-110 transition duration-300 flex flex-col items-center justify-center"
            >
              <FaTrashAlt size={14} fill="white" />
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
