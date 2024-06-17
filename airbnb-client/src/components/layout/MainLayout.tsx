import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../common/navbar/Navbar";
import { Footer } from "../common/Footer";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { cn } from "@/lib/utils";

import SearchModal from "../common/navbar/modals/SearchModal";

export const MainLayout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/auth", "/booking"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <ToasterProvider />
      <div className="">
        {shouldShowNavbar && <Navbar />}
        <SearchModal />
        <div className={cn("px-8", { "pt-24": shouldShowNavbar })}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
