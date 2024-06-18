import { cn } from "@/lib/utils";
import React from "react";

type AvatarProps = {
  path: string | undefined;
  size?: string;
};

export const AvatarLarge: React.FC<AvatarProps> = ({
  path,
  size,
}) => {
  const dimension = size ? size : "30";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-full",
        dimension && "w-full h-full aspect-square"
      )}
      // style={{ width: dimension, height: dimension }}
    >
      <img
        className="object-cover object-center"
        alt="Avatar"
        src={path ? path : "/images/sensei-face.jpg"}
      />
    </div>
  );
};
