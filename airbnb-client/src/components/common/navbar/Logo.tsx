import LogoImg from "/images/Mika_Heart.png";

export const Logo = () => {
  return (
    <img
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="50"
      width="50"
      src={LogoImg}
    />
  );
};
