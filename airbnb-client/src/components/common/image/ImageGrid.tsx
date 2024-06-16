import { ImageProps } from "@/types/global.types";
import { Image } from "./Image";
import { CgMenuGridO } from "react-icons/cg";
import ImageCarousel from "./ImageCarousel";
import { useState } from "react";
import React from "react";

type Props = {
  imageSrc: ImageProps[];
};

export const ImageGrid: React.FC<Props> = ({ imageSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0); // State to store initial index

  const onOpen = (index: number) => {
    setInitialIndex(index); // Set the initial index based on the clicked image
    setIsOpen(true);
  };

  return (
    <div className="relative grid grid-cols-2 gap-2 w-full h-[55vh] rounded-2xl overflow-hidden">
      <div onClick={() => onOpen(0)} className="w-full h-[55vh]">
        <Image path={imageSrc[0] ? imageSrc[0].path : undefined} />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-[55vh]">
        {imageSrc.slice(1, 5).map((image, index) => (
          <div
            key={index}
            onClick={() => onOpen(index + 1)}
            className="w-full h-full"
          >
            <Image path={image ? image.path : undefined} />
          </div>
        ))}
      </div>
      {imageSrc.length > 5 && (
        <div
          onClick={() => onOpen(0)}
          className="absolute bottom-5 right-6 font-semibold bg-white border-[1px] border-black rounded-lg text-sm px-4 h-8 flex justify-center items-center gap-3 hover:bg-neutral-200 transition duration-300 cursor-pointer"
        >
          <CgMenuGridO size={20} />
          Show all photos
        </div>
      )}
      <ImageCarousel
        imageSrc={imageSrc}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIndex={initialIndex} // Pass initial index to ImageCarousel
      />
    </div>
  );
};
