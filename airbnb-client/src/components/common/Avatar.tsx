import apiConfigs from "@/api/configs/api.configs";

export const Avatar = ({ path }: { path: string | undefined }) => {
  return (
    <img
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={path ? apiConfigs.imgPath(path) : "/images/sensei-face.jpg"}
    />
  );
};
