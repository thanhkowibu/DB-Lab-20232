import { useEffect, useState } from "react";
import { OverlaySection } from "@/components/common/auth/OverlaySection";
import { RegisterSection } from "@/components/common/auth/RegisterSection";
import { LoginSection } from "@/components/common/auth/LoginSection";
import { useLocation } from "react-router-dom";
import { ActivateTokenModal } from "@/components/common/auth/ActivateTokenModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const AuthPage = () => {
  const location = useLocation();
  const isToggledFromNav = location.state?.isToggled;

  const [isToggled, setIsToggled] = useState(isToggledFromNav || false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const handleToggle = () => {
    setIsToggled((pv: boolean) => !pv);
  };

  // for animation delay
  const [isZIndexLowered, setIsZIndexLowered] = useState(false);
  useEffect(() => {
    let timeoutId: any;
    if (!isToggled) {
      timeoutId = setTimeout(() => {
        setIsZIndexLowered(true);
      }, 100);
    } else {
      setIsZIndexLowered(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isToggled]);

  useEffect(() => {
    if (isToggled) {
      setIsInitialRender(false);
    } else {
      setTimeout(() => setIsInitialRender(false), 400);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = (account: { email: string; password: string }) => {
    setAccount(account);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [account, setAccount] = useState({ email: "", password: "" });

  return (
    <div className="bg-neutral-100 w-full h-screen flex flex-col items-center justify-center sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { ease: "easeInOut", duration: 0.5 },
        }}
        className="bg-white relative w-full max-w-xs md:max-w-2xl lg:max-w-4xl min-h-[540px] rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden"
      >
        <LoginSection
          isToggled={isToggled}
          isZIndexLowered={isZIndexLowered}
          handleOpenModal={handleOpenModal}
        />
        {!isInitialRender && (
          <RegisterSection
            isToggled={isToggled}
            handleOpenModal={handleOpenModal}
          />
        )}
        <Button
          onClick={handleToggle}
          variant="airbnbOutline"
          size="sm"
          className="block md:hidden absolute top-2 left-2 w-auto rounded-3xl text-sm flex items-center z-50"
        >
          {isToggled ? "Login" : "Register"}
        </Button>
        <OverlaySection handleToggle={handleToggle} isToggled={isToggled} />
      </motion.div>
      <ActivateTokenModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        account={account}
      />
    </div>
  );
};
