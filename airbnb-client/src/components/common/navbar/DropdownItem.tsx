import { cn } from "@/lib/utils";

type DropdownItemProps = {
  onClick: () => void;
  label: string;
  isBold?: boolean;
};

export const DropdownItem = ({ onClick, label, isBold }: DropdownItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn("px-4 py-3 hover:bg-neutral-100 transition", {
        "font-semibold": isBold,
      })}
    >
      {label}
    </div>
  );
};
