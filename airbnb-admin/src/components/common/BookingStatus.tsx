import { cn } from "@/lib/utils";

const BookingStatus = ({ status }: { status: string }) => {
  return (
    <div
      className={cn(
        "px-1 py-2 font-bold flex items-center justify-start",
        status === "PENDING" && "text-yellow-300",
        status === "CHECK_OUT" && "text-green-500",
        status === "CANCEL" && "text-red-500"
      )}
    >
      {status}
    </div>
  );
};
export default BookingStatus;
