import useLogout from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <div
      className="cursor-pointer hover:bg-neutral-200 rounded-full p-2"
      onClick={() => logout()}
    >
      <LogOut size={28} />
    </div>
  );
};
export default LogoutButton;
