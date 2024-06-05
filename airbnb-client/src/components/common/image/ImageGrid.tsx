import { ImageProps } from "@/types/global.types";
import { Image } from "./Image";
import { CgMenuGridO } from "react-icons/cg";
type Props = {
  imageSrc: ImageProps[];
};

export const ImageGrid: React.FC<Props> = ({ imageSrc }) => {
  return (
    <div className="relative grid grid-cols-2 gap-2 w-full h-[55vh] rounded-2xl overflow-hidden">
      <div className="w-full h-[55h]">
        <Image path={imageSrc[0] ? imageSrc[0].path : undefined} />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-[55vh]">
        <Image path={imageSrc[1] ? imageSrc[1].path : undefined} />
        <Image path={imageSrc[2] ? imageSrc[2].path : undefined} />
        <Image path={imageSrc[3] ? imageSrc[3].path : undefined} />
        <Image path={imageSrc[4] ? imageSrc[4].path : undefined} />
      </div>
      {imageSrc[5] && (
        <div className="absolute bottom-5 right-6 font-semibold bg-white border-[1px] border-black rounded-lg text-sm px-4 h-8 flex justify-center items-center gap-3 hover:bg-neutral-200 transition duration-300 cursor-pointer">
          <CgMenuGridO size={20} />
          Show all photos
        </div>
      )}
    </div>
  );
};
