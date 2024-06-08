import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { categoriesArray } from "@/data/categoriesArray";

type Props = {
  title: string;
  subtitle: string;
  cate1: string;
  cate2: string;
  onChangeCate1: (value: string) => void;
  onChangeCate2: (value: string) => void;
};

const CategoriesSelect: React.FC<Props> = ({
  title,
  subtitle,
  cate1,
  cate2,
  onChangeCate1,
  onChangeCate2,
}) => {
  const initialSelected = [cate1, cate2].filter(Boolean);
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelected((prev) => {
        const updated = [...prev, value];
        if (updated.length === 1) {
          onChangeCate1(value);
        } else if (updated.length === 2) {
          onChangeCate2(value);
        }
        return updated;
      });
    } else {
      setSelected((prev) => {
        const updated = prev.filter((item) => item !== value);
        if (updated.length === 0) {
          onChangeCate1("");
          onChangeCate2("");
        } else if (updated.length === 1) {
          onChangeCate1(updated[0]);
          onChangeCate2("");
        }
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col gap-1 justify-between">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-gray-600">{subtitle}</div>
      <div className="my-6 grid grid-cols-2 gap-8">
        {categoriesArray.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.value}
              className="flex items-center h-5 cursor-pointer"
            >
              <Checkbox
                id={item.value}
                className="h-full w-auto aspect-square hover:border-2 disabled:hover:border-[1px]"
                checked={selected.includes(item.value)}
                disabled={
                  selected.length >= 2 && !selected.includes(item.value)
                }
                onCheckedChange={(checked) =>
                  handleCheckboxChange(item.value, checked as boolean)
                }
              />
              <label
                htmlFor={item.value}
                className="w-full flex gap-4 pl-4 text-neutral-800 text-lg leading-none cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
                <Icon size={20} />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSelect;
