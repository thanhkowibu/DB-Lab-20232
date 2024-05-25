import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const OverlaySection = ({
  isToggled,
  handleToggle,
}: {
  isToggled: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-1/2 w-1/2 h-full z-50 overflow-hidden transition-transform duration-1000 ease-in-out",
        { "-translate-x-full": isToggled }
      )}
    >
      <div
        className={cn(
          "bg-custom bg-no-repeat bg-cover relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-1000 ease-in-out",
          { "translate-x-1/2": isToggled },
          "darken-background"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-1/2 px-10 flex flex-col justify-around items-center text-center -translate-x-[20%] transition-transform duration-1000 ease-in-out",
            { "translate-x-0": isToggled }
          )}
        >
          <div className="flex flex-col justify-center items-center mt-6">
            <h1 className="text-white text-4xl font-bold">One of us?</h1>
            <p className="text-xl text-white font-light leading-snug my-5">
              If you already had an account,
              <br />
              just sign in. We've missed you!
            </p>
          </div>
          <Button
            onClick={handleToggle}
            variant="airbnb"
            className="uppercase tracking-wider rounded-full w-1/3 bg-transparent border-2 border-white hover:bg-white hover:text-black"
          >
            Sign In
          </Button>
        </div>
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-1/2 px-10 flex flex-col justify-around items-center text-center translate-x-0 transition-transform duration-1000 ease-in-out",
            { "translate-x-[20%]": isToggled }
          )}
        >
          <div className="flex flex-col justify-center items-center mt-6">
            <h1 className="text-white text-4xl font-bold">New here?</h1>
            <p className="text-xl text-white font-light leading-snug my-5">
              Sign up today and discover a<br />
              great amount of new opportunities!
            </p>
          </div>
          <Button
            onClick={handleToggle}
            variant="airbnb"
            className="uppercase tracking-wider rounded-full w-1/3 bg-transparent border-2 border-white hover:bg-white hover:text-black"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
