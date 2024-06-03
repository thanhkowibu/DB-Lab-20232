import { cn } from "@/lib/utils";
import { PropertyReqProps } from "@/types/properties.types";

import { UseFormRegister } from "react-hook-form";
type TitleProps = {
  formName: string;
  register: UseFormRegister<PropertyReqProps>;
};
export const Title = ({ formName, register }: TitleProps) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full text-airbnb-light-black">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-4xl">
          Now, let's give your house a title
        </h2>
        <p>
          Short titles work best. Have fun with it - you can always change it
          later.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <textarea
          id="title"
          autoComplete="title"
          placeholder="Title"
          className="border border-gray-400 h-40 w-[550px] rounded-xl active:border-gray-950 p-6 no-scrollbar text-4xl font-semibold"
          {...register("name")}
          // onChange={(e) => {
          //   setTitle(e.target.value);
          // }}
        />
        <span
          className={cn({
            "text-red-500 font-semibold": (formName?.length || 0) > 32,
          })}
        >
          {formName?.length || 0}/32
        </span>
      </div>
    </div>
  );
};
