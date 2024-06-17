import { cn } from "@/lib/utils";

export const Confirmation = ({
  handleReview,
  isLoading,
}: {
  handleReview: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="font-semibold text-5xl">Ready to post your listing?</h2>
        <p className="text-lg">
          You can post your listing now or review your settings again.
        </p>
      </div>
      <div className="flex flex-col gap-5 w-[20%]">
        <button
          type="submit"
          className="bg-rose-500 py-3 mt-5 px-10 text-white text-base hover:bg-rose-600 font-medium rounded-lg cursor-pointer"
          disabled={isLoading}
        >
          Airbnb my listing !
        </button>
        <button
          type="button"
          className={cn(
            "bg-white py-3 mt-5 px-5 text-black border-2 border-black hover:bg-neutral-100 text-base font-medium rounded-lg cursor-pointer",
            {
              "opacity-50 hover:opacity-50 cursor-not-allowed": isLoading,
            }
          )}
          onClick={handleReview}
        >
          Review the settings again
        </button>
      </div>
      {/* Confetti */}
    </div>
  );
};
