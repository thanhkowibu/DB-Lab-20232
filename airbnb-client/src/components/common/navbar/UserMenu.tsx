import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useCallback, useState } from "react";
import { DropdownItem } from "./DropdownItem";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative select-none">
      <div className="flex justify-end gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer"
        >
          Suck your dick
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:px-2 md:py-1 border-2 border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar path={user?.avatar?.path} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/5 bg-white overflow-hidden right-0 top-14 text-sm">
          <div className="flex flex-col cursor-pointer">
            {isLoggedIn() ? (
              <>
                <DropdownItem onClick={() => {}} label="Trips" isBold />
                <DropdownItem onClick={() => {}} label="Wishlists" isBold />
                <DropdownItem onClick={() => {}} label="Manage listings" />
                <DropdownItem onClick={() => {}} label="Account" />
                <DropdownItem onClick={() => {}} label="Help" />
                <DropdownItem onClick={logoutUser} label="Logout" />
              </>
            ) : (
              <>
                <DropdownItem
                  onClick={() => {
                    navigate("/auth", { state: { isToggled: true } });
                  }}
                  label="Register"
                  isBold
                />
                <DropdownItem
                  onClick={() => {
                    navigate("/auth", { state: { isToggled: false } });
                  }}
                  label="Login"
                />
                <DropdownItem onClick={() => {}} label="Suck your dick" />
                <DropdownItem onClick={() => {}} label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
