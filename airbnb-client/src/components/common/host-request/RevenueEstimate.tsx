import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const RevenueEstimate = () => {
  const [night, setNight] = useState<number>(7);
  // const [nightlyPrice] = useState<number>(47);
  const nightlyPrice = 47;

  const handleSliderChange = (value: number[]) => {
    // Since Slider returns an array of values, we take the first item
    setNight(value[0]);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <p className="text-[#FF385C] font-bold text-6xl mt-8">Airbnb it.</p>
      <p className="text-black text-4xl font-semibold mt-1">You could earn</p>
      <p className="text-6xl font-bold my-6 tracking-tighter">
        ${night * nightlyPrice}
      </p>
      <p className="text-lg">
        <span className="underline font-semibold text-xl">{night} nights</span>{" "}
        at an estimated ${nightlyPrice} a night
      </p>

      <Slider
        defaultValue={[night]}
        max={30}
        step={1}
        onValueChange={handleSliderChange}
        className="w-2/3 cursor-pointer mt-8"
      />
      <p className="text-md underline cursor-pointer text-muted-foreground mt-6">
        Learn how we estimate your earnings
      </p>
    </div>
  );
};
export default RevenueEstimate;
