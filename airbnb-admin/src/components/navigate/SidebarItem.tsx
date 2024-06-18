import { cn } from "@/lib/utils";

interface SidebarItemProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  paramsLabel: string;
  currentLocation: string | null;
}

export const SidebarItem = ({
  children,
  label,
  onClick,
  currentLocation,
  paramsLabel,
}: SidebarItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2 hover:bg-slate-100 w-full rounded-xl cursor-pointer transition-all duration-300",
        currentLocation === paramsLabel && "bg-slate-100"
      )}
      onClick={onClick}
    >
      <div>{children}</div>
      <p className="font-medium text-md">{label}</p>
    </div>
  );
};
