import { ImageProps } from "@/types/global.types";
import { Image } from "./Image";

type Props = {
  imageSrc: ImageProps[];
};

export const ImageGrid: React.FC<Props> = ({ imageSrc }) => {
  return (
    <div className=" bg-blue-600 grid grid-cols-2 gap-2 w-full h-[50vh] rounded-2xl overflow-hidden">
      <Image path={imageSrc[0].path} />
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {imageSrc.map((item) => (
          <Image path={item.path} />
        ))}
      </div>
    </div>
  );
};
