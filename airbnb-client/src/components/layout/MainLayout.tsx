import { Outlet } from "react-router-dom";
import { GlobalLoading } from "../common/GlobalLoading";
import { Navbar } from "../common/navbar/Navbar";
import { Footer } from "../common/Footer";

export const MainLayout = () => {
  return (
    <>
      <GlobalLoading />
      <div className="">
        <Navbar />
        <div className="pt-48">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
