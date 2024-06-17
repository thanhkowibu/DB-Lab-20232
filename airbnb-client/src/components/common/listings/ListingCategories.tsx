import { IconType } from "react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  categories: {
    label: string;
    icon: IconType;
    desc: string;
    value: string;
  }[];
};

const ListingCategories: React.FC<Props> = ({ categories }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-2 gap-y-6 text-lg text-neutral-800">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip key={item.value}>
              <div className="flex items-center gap-4 px-2">
                <TooltipTrigger>
                  <Icon size={28} />
                </TooltipTrigger>
                <div>{item.label}</div>
              </div>
              <TooltipContent side="top" sideOffset={5}>
                <p className="font-semibold">{item.desc}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default ListingCategories;
