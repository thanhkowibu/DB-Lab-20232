import { useEffect, useState } from "react";
import { OverlaySection } from "@/components/common/auth/OverlaySection";
import { RegisterSection } from "@/components/common/auth/RegisterSection";
import { LoginSection } from "@/components/common/auth/LoginSection";
import { useLocation } from "react-router-dom";
import { ActivateTokenModal } from "@/components/common/auth/ActivateTokenModal";

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

  return (
    <div className="bg-neutral-100 w-full h-screen flex flex-col items-center justify-center sm:p-4">
      <div className="bg-white relative w-full max-w-xs md:max-w-2xl lg:max-w-4xl min-h-[540px] rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden">
        <LoginSection isToggled={isToggled} isZIndexLowered={isZIndexLowered} />
        {!isInitialRender && <RegisterSection isToggled={isToggled} />}
        <OverlaySection handleToggle={handleToggle} isToggled={isToggled} />
      </div>
      {<ActivateTokenModal />}
    </div>
  );
};
