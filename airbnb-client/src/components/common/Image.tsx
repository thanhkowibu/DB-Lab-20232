import apiConfigs from "@/api/configs/api.configs";

export const Image = ({ path }: { path: string | undefined }) => {
  if (path === undefined) return <img src="/images/sensei-face.jpg" />;
  return <img src={apiConfigs.imgPath(path)} />;
};
