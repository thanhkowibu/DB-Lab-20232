import { IconType } from "react-icons";

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
    <div className="grid grid-cols-2 gap-y-6 text-lg text-neutral-800">
      {categories.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.value} className="flex items-center gap-4 px-2">
            <Icon size={28} />
            <div>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListingCategories;
