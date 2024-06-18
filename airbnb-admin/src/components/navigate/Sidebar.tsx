import { useLocation, useNavigate } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import {
  CreditCard,
  Flag,
  Gem,
  LandPlot,
  Server,
  Store,
  UserCog,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white h-[calc(100vh-64px)] w-64 m-0 fixed border top-16 left-0 flex flex-col justify-start items-start gap-1 px-2 py-1">
      <SidebarItem
        label="Tổng quan"
        onClick={() => navigate("/")}
        paramsLabel="/"
        currentLocation={location.pathname}
      >
        <Gem strokeWidth={2} />
      </SidebarItem>
      <SidebarItem
        label="Người dùng"
        onClick={() => navigate("/user")}
        paramsLabel="/user"
        currentLocation={location.pathname}
      >
        <UserCog strokeWidth={2} />
      </SidebarItem>
      <SidebarItem
        label="Hóa đơn"
        onClick={() => navigate("/booking")}
        paramsLabel="/booking"
        currentLocation={location.pathname}
      >
        <CreditCard strokeWidth={2} />
      </SidebarItem>
      <SidebarItem
        label="Host"
        onClick={() => navigate("/host")}
        paramsLabel="/host"
        currentLocation={location.pathname}
      >
        <Store strokeWidth={2} />
      </SidebarItem>
      <SidebarItem
        label="Tài sản"
        onClick={() => navigate("property")}
        paramsLabel="/property"
        currentLocation={location.pathname}
      >
        <LandPlot strokeWidth={2} />
      </SidebarItem>
      <SidebarItem
        label="Báo cáo"
        onClick={() => navigate("/report")}
        paramsLabel="/report"
        currentLocation={location.pathname}
      >
        <Flag strokeWidth={2} />
      </SidebarItem>
      <SidebarItem
        label="Hệ thống"
        onClick={() => {}}
        paramsLabel="/system"
        currentLocation={location.pathname}
      >
        <Server strokeWidth={2} />
      </SidebarItem>
    </div>
  );
};
export default Sidebar;
