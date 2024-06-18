import { useState } from "react";
import { cn } from "@/lib/utils";
import ReportTable from "../table/ReportTable";

const ReportPage = () => {
  const [selected, setSelected] = useState<
    "RESOLVED" | "PENDING"
  >("PENDING");

  return (
    <div>
      <div className="bg-white shadow-sm border flex items-center ">
        <p
          className={cn(
            "px-4 py-2 cursor-pointer hover:bg-neutral-50 transition duration-300",
            selected === "PENDING" &&
              "bg-neutral-50 text-blue-500 font-semibold"
          )}
          onClick={() => setSelected("PENDING")}
        >
          Pending
        </p>
        <p
          className={cn(
            "px-4 py-2 cursor-pointer hover:bg-neutral-50 transition duration-300",
            selected === "RESOLVED" &&
              "bg-neutral-50 text-blue-500 font-semibold"
          )}
          onClick={() => setSelected("RESOLVED")}
        >
          Resolved
        </p>
      </div>
      <ReportTable type={selected} />
    </div>
  );
};
export default ReportPage;
