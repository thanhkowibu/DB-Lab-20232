import React from "react";

type AvatarProps = {
  path: string | undefined;
  size?: string;
};

export const AvatarLarge: React.FC<AvatarProps> = ({ path, size }) => {
  const dimension = size ? size : "30";

  return (
    <div
      className="rounded-full overflow-hidden"
      style={{ width: dimension, height: dimension }}
    >
      <img
        className="rounded-full object-cover w-full h-full"
        alt="Avatar"
        src={path ? path : "/images/sensei-face.jpg"}
      />
    </div>
  );
};
