import { useNavigate } from "react-router-dom";
import LogoImg from "/images/favicon.ico";
import { motion } from "framer-motion";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <motion.img
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        navigate("/properties");
        window.scrollTo({ top: 0 });
      }}
      alt="Logo"
      className="cursor-pointer size-10 md:size-12"
      src={LogoImg}
    />
  );
};
