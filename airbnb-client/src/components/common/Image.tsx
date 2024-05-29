export const Image = ({ path }: { path: string | undefined }) => {
  if (path === undefined)
    return (
      <img
        src="/images/property_default.jpg"
        className="object-cover size-full group-hover:scale-105 transition"
      />
    );
  return (
    <img
      src={path}
      className="object-cover size-full group-hover:scale-105 transition"
    />
  );
};
