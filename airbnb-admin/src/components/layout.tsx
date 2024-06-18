import { Outlet } from "react-router-dom";
import Navbar from "./navigate/Navbar";
import Sidebar from "./navigate/Sidebar";

const Layout = () => {
  return (
    <main className="min-h-screen bg-slate-100 relative">
      <Navbar />
      <Sidebar />

      <div className="h-full pl-64  w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
