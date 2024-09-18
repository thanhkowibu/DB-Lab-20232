import { cn } from "@/lib/utils";

type DropdownItemProps = {
  onClick: () => void;
  label: string;
  isBold?: boolean;
  isRed?: boolean;
};

export const DropdownItem = ({
  onClick,
  label,
  isBold,
  isRed,
}: DropdownItemProps) => {
  const handleClick = async () => {
    await onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={cn("px-4 py-3 hover:bg-neutral-100 transition", {
        "font-semibold": isBold,
        "text-red-500": isRed,
      })}
    >
      {label}
    </div>
  );
};
