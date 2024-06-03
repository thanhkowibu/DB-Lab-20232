import { tagsArray } from "@/data/tagsArray";
import { cn } from "@/lib/utils";
import { PropertyReqProps } from "@/types/properties.types";

import { UseFormSetValue } from "react-hook-form";
type TagSelectorProps = {
  formTag: string;
  setValue: UseFormSetValue<PropertyReqProps>;
};

export const TagSelector = ({ formTag, setValue }: TagSelectorProps) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="font-semibold text-4xl">
          Which one best describes your place?
        </h2>
        <div className="relative grid grid-cols-3 gap-5 overflow-auto scroll no-scrollbar my-10 pb-5 max-h-[55vh] w-full">
          {tagsArray.map((tag) => {
            const Icon = tag.icon;
            return (
              <button
                type="button"
                key={tag.value}
                className={cn(
                  "flex flex-col gap-2 font-semibold border-2 border-gray-300 rounded-lg p-4 hover:border-gray-950 transition-all duration-300 overflow-hidden",
                  {
                    "border-neutral-950 bg-gray-100": tag.value === formTag,
                  }
                )}
                onClick={() => setValue("tag", tag.value)}
              >
                <Icon size={24} />
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
        <div className="sticky w-full bottom-32 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent blur-sm"></div>
      </div>
    </div>
  );
};
