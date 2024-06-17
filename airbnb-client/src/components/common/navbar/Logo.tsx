import { useNavigate } from "react-router-dom";
import LogoImg from "/images/favicon.ico";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        navigate("/properties");
        window.scrollTo({ top: 0 });
      }}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="50"
      width="50"
      src={LogoImg}
    />
  );
};
