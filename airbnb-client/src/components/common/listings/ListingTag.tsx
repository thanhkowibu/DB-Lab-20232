import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  description: string;
};

const ListingTag: React.FC<Props> = ({ icon: Icon, label, description }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="text-lg font-semibold">{label}</div>
        <div className=" text-neutral-600">{description}</div>
      </div>
    </div>
  );
};

export default ListingTag;
