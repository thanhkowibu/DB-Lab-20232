import { categoriesArray } from "@/data/categoriesArray";
import { cn } from "@/lib/utils";
import { PropertyReqProps } from "@/types/properties.types";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
type CategoriesSelectorProps = {
  formCategories: string[];
  setValue: UseFormSetValue<PropertyReqProps>;
};

export const CategoriesSelector = ({
  formCategories,
  setValue,
}: CategoriesSelectorProps) => {
  const [categories, setCategories] = useState<string[]>(
    formCategories ? formCategories : []
  );

  const addCategory = (name: string) => {
    setCategories([...categories, name]);
  };

  const removeCategory = (name: string) => {
    const index = categories.findIndex((category) => category === name);
    if (index !== -1) {
      const clonedCategories = [...categories];
      clonedCategories.splice(index, 1);
      setCategories(clonedCategories);
    }
  };

  useEffect(() => {
    setValue("categories", categories);
  }, [categories]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl">
          Tell guests what your place can offer
        </h2>
        <p>You can choose as many amenities as you like.</p>
        <div className="relative grid grid-cols-3 gap-5 overflow-auto scroll no-scrollbar pb-5 max-h-[55vh] w-full">
          {categoriesArray.map((cate) => {
            const Icon = cate.icon;
            return (
              <button
                key={cate.value}
                type="button"
                className={cn(
                  "flex flex-col gap-3 font-semibold border-2 border-gray-300 rounded-xl p-4 hover:border-gray-950 transition-all duration-300 overflow-hidden",
                  {
                    "border-gray-950 bg-gray-100": categories?.find(
                      (category) => category === cate.value
                    ),
                  }
                )}
                onClick={() => {
                  categories?.includes(cate.value)
                    ? removeCategory(cate.value)
                    : addCategory(cate.value);
                }}
              >
                <Icon size={24} />
                <span className="text-airbnb-light-black font-medium">
                  {cate.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="sticky w-full bottom-32 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent blur-sm"></div>
      </div>
    </div>
  );
};
