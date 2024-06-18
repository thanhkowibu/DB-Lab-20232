import useAuth from "@/hooks/useAuth";

import { LayoutDashboard } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const user = auth.user;

  return (
    <div className="sticky top-0 w-full h-16 bg-white border-b flex justify-between items-center px-4 z-[9999]">
      <div
        className="ml-4 flex items-center justify-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <LayoutDashboard size={32} />
        <div className="font-semibold font-mono leading-[14px]">
          AIRBNB
          <br />
          DASHBOARD
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <div className="w-8 h-8 cursor-pointer">
          <img
            src={user?.avatar?.path}
            className="object-cover rounded-full"
          />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
export default Navbar;
