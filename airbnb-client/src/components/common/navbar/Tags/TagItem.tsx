import { IconType } from "react-icons";

export const TagItem = ({
  label,
  icon: Icon,
  desc,
}: {
  label: string;
  icon: IconType;
  desc: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 border-b-2 border-transparent text-neutral-500 hover:text-neutral-900 transition cursor-pointer">
      <Icon size={24} />
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
};
