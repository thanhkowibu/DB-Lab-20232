import { AiOutlineLoading } from "react-icons/ai";

export const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-10 bg-black/20 grid place-items-center">
      <div className="bg-black/30 rounded-2xl size-32 flex flex-col items-center justify-center px-5 pt-5 pb-1">
        <AiOutlineLoading className="text-white size-full animate-spin duration-400" />
        <h1 className="text-xl font-bold tracking-wide text-white animate-pulse">
          Loading
        </h1>
      </div>
    </div>
  );
};
