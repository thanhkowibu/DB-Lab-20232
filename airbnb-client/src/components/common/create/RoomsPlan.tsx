import { cn } from "@/lib/utils";
import { PropertyReqProps } from "@/types/properties.types";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type PlaceSpaceProps = {
  max_guests: number;
  num_beds: number;
  num_bedrooms: number;
  num_bathrooms: number;
};

type PlaceSpaceKey = keyof PlaceSpaceProps;

type RoomsPlanProps = {
  form: PlaceSpaceProps;
  setValue: UseFormSetValue<PropertyReqProps>;
};

const labels: Record<PlaceSpaceKey, string> = {
  max_guests: "Max guests",
  num_beds: "Beds",
  num_bedrooms: "Bedrooms",
  num_bathrooms: "Bathrooms",
};

export const RoomsPlan = ({ form, setValue }: RoomsPlanProps) => {
  const [placeSpace, setPlaceSpace] = useState<PlaceSpaceProps>({
    max_guests: form.max_guests ? form.max_guests : 1,
    num_beds: form.num_beds ? form.num_beds : 1,
    num_bedrooms: form.num_bedrooms ? form.num_bedrooms : 1,
    num_bathrooms: form.num_bathrooms ? form.num_bathrooms : 1,
  });

  const handleIncrement = (type: PlaceSpaceKey) => {
    if (placeSpace[type] < 50) {
      setPlaceSpace({ ...placeSpace, [type]: placeSpace[type] + 1 });
    }
  };

  const handleDecrement = (type: PlaceSpaceKey) => {
    if (placeSpace[type] > 1) {
      setPlaceSpace({ ...placeSpace, [type]: placeSpace[type] - 1 });
    }
  };

  useEffect(() => {
    setValue("max_guests", placeSpace.max_guests);
    setValue("num_beds", placeSpace.num_beds);
    setValue("num_bedrooms", placeSpace.num_bedrooms);
    setValue("num_bathrooms", placeSpace.num_bathrooms);
  }, [placeSpace, setValue]);

  return (
    <div className="flex items-center justify-center h-full flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl">
          Share some basics about your place
        </h2>
        <p>You'll add more details later, such as bed types.</p>
      </div>
      <div className="flex flex-col w-[40%] gap-5">
        {Object.keys(placeSpace).map((place) => (
          <div
            className="flex justify-between w-full text-lg items-center"
            key={place}
          >
            <span className="capitalize ">
              {labels[place as PlaceSpaceKey]}
            </span>
            <div className="flex gap-10 items-center justify-between w-48">
              <button
                type="button"
                disabled={placeSpace[place as PlaceSpaceKey] <= 1}
                className={cn(
                  "border border-gray-500 rounded-full text-xl size-10 flex items-center justify-center hover:border-black",
                  {
                    "opacity-50 border-gray-400 hover:border-gray-400 cursor-not-allowed":
                      placeSpace[place as PlaceSpaceKey] <= 1,
                  }
                )}
                onClick={() => handleDecrement(place as PlaceSpaceKey)}
              >
                –
              </button>
              <span className="min-w-[20px]">
                {placeSpace[place as PlaceSpaceKey]}
              </span>
              <button
                type="button"
                disabled={placeSpace[place as PlaceSpaceKey] >= 30}
                className={cn(
                  "border border-gray-500 rounded-full text-xl size-10 flex items-center justify-center hover:border-black",
                  {
                    "opacity-50 border-gray-400 hover:border-gray-400 cursor-not-allowed":
                      placeSpace[place as PlaceSpaceKey] >= 30,
                  }
                )}
                onClick={() => handleIncrement(place as PlaceSpaceKey)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
