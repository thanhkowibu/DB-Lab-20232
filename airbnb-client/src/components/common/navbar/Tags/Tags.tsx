import { TbBeach } from "react-icons/tb";
import { Container } from "../../Container";
import { FaRegKissWinkHeart, FaSwimmingPool } from "react-icons/fa";
import { LuMountainSnow, LuPalmtree } from "react-icons/lu";
import { TagItem } from "./TagItem";
import {
  MdFamilyRestroom,
  MdOutlineCottage,
  MdOutlinePets,
  MdOutlineVilla,
} from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { useLocation, useSearchParams } from "react-router-dom";

export const tagsArray = [
  {
    label: "Pools",
    icon: FaSwimmingPool,
    desc: "This property has swimming pools",
    value: "LAKEFRONT",
  },
  {
    label: "Beach",
    icon: TbBeach,
    desc: "This property is near the beach",
    value: "BEACHFRONT",
  },
  {
    label: "Pets",
    icon: MdOutlinePets,
    desc: "This property is pet-friendly",
    value: "PET_FRIENDLY",
  },
  {
    label: "Family",
    icon: MdFamilyRestroom,
    desc: "This property is family-friendly",
    value: "FAMILY_FRIENDLY",
  },
  {
    label: "Romantic",
    icon: FaRegKissWinkHeart,
    desc: "This property is for romantic getaway",
    value: "ROMANTIC_GETAWAY",
  },
  {
    label: "Mountains",
    icon: LuMountainSnow,
    desc: "This property is on mountains",
    value: "MOUNTAIN_VIEW",
  },
  {
    label: "Islands",
    icon: LuPalmtree,
    desc: "This property is on an island",
    value: "OCEAN_VIEW",
  },
  {
    label: "Cottages",
    icon: MdOutlineCottage,
    desc: "This property has a cottage",
    value: "COTTAGE",
  },
  {
    label: "Farms",
    icon: PiFarm,
    desc: "This property has a farm",
    value: "FARMS",
  },
  {
    label: "Villa",
    icon: MdOutlineVilla,
    desc: "This property has a villa",
    value: "VILLA",
  },
];

export const Tags = () => {
  const [params] = useSearchParams();
  const tag = params?.get("tag");
  const { pathname } = useLocation();

  const isMainPage = pathname === "/properties";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-2 flex items-center justify-between overflow-x-auto">
        {tagsArray.map((item) => (
          <TagItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={item.value}
            selected={tag === item.value}
          />
        ))}
      </div>
    </Container>
  );
};
