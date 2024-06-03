import {
  FaLaptop,
  FaParking,
  FaSwimmingPool,
  FaTv,
  FaWifi,
} from "react-icons/fa";
import {
  MdOutlineBathroom,
  MdOutlineKitchen,
  MdOutlineLocalFireDepartment,
  MdOutlineLocalLaundryService,
} from "react-icons/md";
import {
  TbAirConditioning,
  TbBread,
  TbFireExtinguisher,
  TbFirstAidKit,
  TbHanger,
  TbIroningSteam,
} from "react-icons/tb";
import { GiGrandPiano } from "react-icons/gi";
import { PiHairDryer, PiWashingMachine } from "react-icons/pi";
import { WiSmoke } from "react-icons/wi";
import { CgSmartHomeWashMachine } from "react-icons/cg";

export const categoriesArray = [
  {
    label: "Wifi",
    icon: FaWifi,
    desc: "This property provides wifi",
    value: "WIFI",
  },
  {
    label: "TV",
    icon: FaTv,
    desc: "This property has a TV",
    value: "TV",
  },
  {
    label: "Kitchen",
    icon: MdOutlineKitchen,
    desc: "This property has a kitchen",
    value: "KITCHEN",
  },
  {
    label: "Air-conditioning",
    icon: TbAirConditioning,
    desc: "This property has air-conditioning system",
    value: "AIR_CONDITIONING",
  },
  {
    label: "Pool",
    icon: FaSwimmingPool,
    desc: "This property has a pool",
    value: "POOL",
  },
  {
    label: "Shampoo",
    icon: MdOutlineBathroom,
    desc: "This property provides shampoo",
    value: "SHAMPOO",
  },
  {
    label: "Hangers",
    icon: TbHanger,
    desc: "This property provides hangers",
    value: "HANGERS",
  },
  {
    label: "Piano",
    icon: GiGrandPiano,
    desc: "This property has a piano",
    value: "PIANO",
  },
  {
    label: "Free parking",
    icon: FaParking,
    desc: "This property has free parking",
    value: "FREE_PARKING",
  },
  {
    label: "Free breakfast",
    icon: TbBread,
    desc: "This property provides free breakfast",
    value: "BREAKFAST",
  },
  {
    label: "Washing machine",
    icon: PiWashingMachine,
    desc: "This property has a washing machine",
    value: "WASHER",
  },
  {
    label: "Clothes dryer",
    icon: MdOutlineLocalLaundryService,
    desc: "This property has a clothes dryer",
    value: "DRYER",
  },
  {
    label: "Heater",
    icon: MdOutlineLocalFireDepartment,
    desc: "This property has a heater",
    value: "HEATING",
  },
  {
    label: "Laptop-friendly workspace",
    icon: FaLaptop,
    desc: "This property has a laptop-friendly workspace",
    value: "LAPTOP_FRIENDLY_WORKSPACE",
  },
  {
    label: "Ironing",
    icon: TbIroningSteam,
    desc: "This property provides an iron",
    value: "IRON",
  },
  {
    label: "Hair dryer",
    icon: PiHairDryer,
    desc: "This property provides a hair dryer",
    value: "HAIR_DRYER",
  },
  {
    label: "Smoke alarm",
    icon: WiSmoke,
    desc: "This property has a smoke alarm",
    value: "SMOKE_DETECTOR",
  },
  {
    label: "Carbon-monoxide detector",
    icon: CgSmartHomeWashMachine,
    desc: "This property has a carbon-monoxide detector",
    value: "CARBON_MONOXIDE_DETECTOR",
  },
  {
    label: "Fire extinguisher",
    icon: TbFireExtinguisher,
    desc: "This property has a fire extinguisher",
    value: "FIRE_EXTINGUISHER",
  },
  {
    label: "First-aid kit",
    icon: TbFirstAidKit,
    desc: "This property provides a first-aid kit",
    value: "FIRST_AID_KIT",
  },
];
