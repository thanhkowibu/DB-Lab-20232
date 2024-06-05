export const Avatar = ({
  path,
  size,
}: {
  path: string | undefined;
  size?: string;
}) => {
  return (
    <img
      className="rounded-full"
      height={size ? size : "30"}
      width={size ? size : "30"}
      alt="Avatar"
      src={path ? path : "/images/sensei-face.jpg"}
    />
  );
};
