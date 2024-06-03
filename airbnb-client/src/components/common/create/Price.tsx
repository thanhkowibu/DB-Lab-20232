import { PropertyReqProps } from "@/types/properties.types";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type PriceProps = {
  formPrice: number;
  setValue: UseFormSetValue<PropertyReqProps>;
};
export const Price = ({ formPrice, setValue }: PriceProps) => {
  const [price, setPrice] = useState(formPrice ? formPrice : 10.0);
  return (
    <div className="flex  items-center justify-center h-full text-airbnb-light-black">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Now, set your price</h2>
          <p>You can change it anytime.</p>
        </div>
        <div className="flex flex-col gap-4 relative px-4">
          <span className="absolute left-7 top-10 transform -translate-y-1/2 text-2xl text-black">
            $
          </span>
          <input
            id="price"
            className="border border-gray-400 h-20 w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-3xl items-center flex justify-center pl-7"
            value={price}
            onChange={(e) => {
              const newPrice =
                e.target.value === "" ? 0.0 : parseFloat(e.target.value);
              setPrice(newPrice);
              setValue("nightly_price", newPrice);
            }}
          />
          <p>The price value needs to be between $10 and $500000.</p>
        </div>
      </div>
    </div>
  );
};
