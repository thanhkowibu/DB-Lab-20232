import { Outlet, useLocation } from "react-router-dom";
import { GlobalLoading } from "../common/GlobalLoading";
import { Navbar } from "../common/navbar/Navbar";
import { Footer } from "../common/Footer";

export const MainLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/auth", "/booking"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <GlobalLoading />
      <div className="">
        {shouldShowNavbar && <Navbar />}
        <div className={shouldShowNavbar ? "pt-48" : ""}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
