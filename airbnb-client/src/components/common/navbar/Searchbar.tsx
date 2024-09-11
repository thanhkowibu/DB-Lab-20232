import { useAuth } from "@/context/useAuth";
import { cn } from "@/lib/utils";
import { formatArea } from "@/utils/formatArea";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Searchbar = () => {
  const { onSearchOpen } = useAuth();

  const location = useLocation();

  const hideSearchbarPaths = ["/properties/create", "/"];

  const shouldShowSearchbar = !hideSearchbarPaths.includes(location.pathname);

  const queryParams = new URLSearchParams(location.search);

  const area = queryParams.get("area");

  const maxGuest = queryParams.get("max_guest");

  const advancedFilters =
    queryParams.has("min_nightly_price") ||
    queryParams.has("max_nightly_price") ||
    queryParams.has("category1");

  return (
    <>
      {shouldShowSearchbar && (
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={onSearchOpen}
          className="border-2 w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold px-6">
              {area ? formatArea(area) : "Anywhere"}
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-2 flex-1 text-center">
              {maxGuest
                ? maxGuest === "1"
                  ? "1 Guest"
                  : `${maxGuest} Guests`
                : "Any Guests"}
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
              <div
                className={cn("hidden sm:block", {
                  "font-semibold text-black": advancedFilters,
                })}
              >
                Advanced Filters
              </div>
              <div className="p-2 bg-rose-500 rounded-full text-white">
                <BiSearch size={18} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
