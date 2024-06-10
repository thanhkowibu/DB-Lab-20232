export const Avatar = ({
  path,
  size,
}: {
  path: string | undefined;
  size?: string;
}) => {
  const dimension = size ? size : "size-8";
  return (
    <div className={`aspect-ratio overflow-hidden ${dimension}`}>
      <img
        className="rounded-full object-cover size-full"
        alt="Avatar"
        src={path ? path : "/images/sensei-face.jpg"}
      />
    </div>
  );
};
