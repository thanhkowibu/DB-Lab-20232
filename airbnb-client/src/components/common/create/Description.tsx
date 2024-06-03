import { cn } from "@/lib/utils";
import { PropertyReqProps } from "@/types/properties.types";

import { UseFormRegister } from "react-hook-form";
type DescriptionProps = {
  formDesc: string;
  register: UseFormRegister<PropertyReqProps>;
};

export const Description = ({ formDesc, register }: DescriptionProps) => {
  return (
    <div className="flex  items-center justify-center h-full text-airbnb-light-black">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Write your description</h2>
          <p>Share what makes your place special.</p>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="border border-gray-400 h-56 w-[550px] rounded-lg active:border-gray-950 px-6 py-4 no-scrollbar text-lg "
            placeholder="Write the description of your place..."
            {...register("description")}
          />
          <span
            className={cn({
              "text-red-500 font-semibold": (formDesc?.length || 0) > 500,
            })}
          >
            {formDesc?.length || 0}/500
          </span>
        </div>
      </div>
    </div>
  );
};
