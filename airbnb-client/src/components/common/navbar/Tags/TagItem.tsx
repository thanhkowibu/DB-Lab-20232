import { cn } from "@/lib/utils";
import queryString from "query-string";
import { IconType } from "react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export const TagItem = ({
  label,
  icon: Icon,
  selected,
}: {
  label: string;
  icon: IconType;
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
      tag: label,
    };
    if (params?.get("tag") === label) {
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
  };

  return (
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
  );
};
