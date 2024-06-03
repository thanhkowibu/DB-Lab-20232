import { useCountry } from "@/hooks/useGeocoding";
import { cn } from "@/lib/utils";
import { PropertyReqProps } from "@/types/properties.types";
import { UseFormRegister } from "react-hook-form";

type Props = {
  form: {
    latitude: number;
    longitude: number;
    address_line: string;
  };
  register: UseFormRegister<PropertyReqProps>;
};

export const PlaceDetails = ({ form, register }: Props) => {
  const country =
    form.latitude && form.longitude
      ? useCountry(form.latitude, form.longitude)
      : "Unknown country";

  return (
    <div className="flex justify-center items-center h-full flex-col gap-2 w-full">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl">Confirm your address</h2>
        <p>
          Your address is only shared with guests after they've made a
          reservation.
        </p>
      </div>
      <div className="flex flex-col w-full items-center overflow-auto no-scrollbar pb-20 pt-5">
        <div className="flex flex-col gap-6 w-[40%]">
          <input
            id="country"
            value={country}
            placeholder="Country"
            type="text"
            autoComplete="country-name"
            disabled
            className={cn(
              "border border-gray-300 p-4 rounded-lg w-full text-lg cursor-not-allowed",
              {
                "italic font-light": country === "Unknown country",
              }
            )}
          />
          <input
            id="address"
            placeholder="House, street, town, province, etc."
            type="text"
            autoComplete="street-address"
            className="border border-gray-300 p-4 rounded-lg w-full text-lg"
            {...register("address_line")}
          />
        </div>
      </div>
    </div>
  );
};
