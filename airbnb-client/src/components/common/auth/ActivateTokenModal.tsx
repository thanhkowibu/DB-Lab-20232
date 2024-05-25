import { Button } from "@/components/ui/button";

export const ActivateTokenModal = () => {
  return (
    <div className="fixed inset-0 z-10 bg-black/30 backdrop-blur-[1px] grid place-items-center">
      <div className="bg-white rounded-2xl flex flex-col items-center justify-center">
        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* HEADER */}
          <div className="relative p-4 rounded-t border-b-2 flex justify-center items-center">
            <div className="text-lg font-semibold">Account activation</div>
          </div>
          {/* BODY */}
          <div className="relative p-6 flex-auto flex flex-col items-center">
            <div>We've sent you the token via your email</div>
            <input />
            <div>Please enter your token here.</div>
            <div>
              Didn't received your mail? Click{" "}
              <span className="text-blue-500 underline cursor-pointer">
                here
              </span>{" "}
              to resend
            </div>
          </div>
          {/* FOOTER */}
          <div className="flex flex-col gap-2 p-6">
            <div className="w-full gap-4 flex flex-col items-center">
              <Button variant="airbnb">Activate</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
