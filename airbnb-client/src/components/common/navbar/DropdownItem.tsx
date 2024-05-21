type DropdownItemProps = {
  onClick: () => void;
  label: string;
};

export const DropdownItem = ({ onClick, label }: DropdownItemProps) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};
