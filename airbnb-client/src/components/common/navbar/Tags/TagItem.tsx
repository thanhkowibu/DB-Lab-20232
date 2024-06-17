import { cn } from "@/lib/utils";
import queryString from "query-string";
import { IconType } from "react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TagItem = ({
  label,
  icon: Icon,
  value,
  desc,
  selected,
}: {
  label: string;
  icon: IconType;
  value: string;
  desc: string;
  selected?: boolean;
}) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      tag: value,
    };
    if (params?.get("tag") === value) {
      delete updateQuery.tag;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/properties",
        query: updateQuery,
      },
      { skipNull: true }
    );
    navigate(url);
    window.scrollTo({ top: 0 });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={handleClick}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-3 border-b-2 border-transparent text-neutral-500 hover:text-neutral-900 transition cursor-pointer select-none",
              { "border-b-neutral-800 border-b-[3px] text-slate-900": selected }
            )}
          >
            <Icon size={24} />
            <div className="text-xs font-medium">{label}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={-10}>
          <p className="font-semibold">{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
