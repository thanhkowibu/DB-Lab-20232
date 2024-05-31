import { CategoriesSelector } from "@/components/common/create/CategoriesSelector";
import { Confirmation } from "@/components/common/create/Confirmation";
import { Description } from "@/components/common/create/Description";
import { ListingCreated } from "@/components/common/create/ListingCreated";
import { OverView } from "@/components/common/create/OverView";
import { Photos } from "@/components/common/create/Photos";
import { PlaceDetails } from "@/components/common/create/PlaceDetails";
import { PlaceLocation } from "@/components/common/create/PlaceLocation";
import { Price } from "@/components/common/create/Price";
import { RoomsPlan } from "@/components/common/create/RoomsPlan";
import { StepOneStarter } from "@/components/common/create/StepOneStarter";
import { StepThreeStarter } from "@/components/common/create/StepThreeStarter";
import { StepTwoStarter } from "@/components/common/create/StepTwoStarter";
import { TagSelector } from "@/components/common/create/TagSelector";
import { Title } from "@/components/common/create/Title";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PropertyReqProps } from "@/types/properties.types";

const schema = yup.object().shape({
  nightly_price: yup.number().required(),
  name: yup.string().required(),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  max_guests: yup.number().required(),
  num_beds: yup.number().required(),
  num_bedrooms: yup.number().required(),
  num_bathrooms: yup.number().required(),
  description: yup.string().required(),
  address_line: yup.string().required(),
  categories: yup.array().of(yup.string().required()).required(),
  tag: yup.string().required(),
  images: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        path: yup.string().required(),
      })
    )
    .required(),
});

export const CreateProperty = () => {
  const [step, setStep] = useState(0);

  const totalSteps = 13;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const onSubmit = async (form: PropertyReqProps) => {
    console.log(form);
    // Post data to API...
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<PropertyReqProps>({
    resolver: yupResolver(schema),
  });

  const Stage = [
    () => <OverView />,
    () => <StepOneStarter />,
    () => <TagSelector form={{ tag: getValues("tag") }} setValue={setValue} />,
    () => <PlaceLocation />,
    () => <PlaceDetails />,
    () => <RoomsPlan />,
    () => <StepTwoStarter />,
    () => <CategoriesSelector />,
    () => <Photos />,
    () => <Title />,
    () => <Description />,
    () => <StepThreeStarter />,
    () => <Price />,
    () => <Confirmation />,
    () => <ListingCreated />,
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-8"
    >
      <div className="h-[65vh]">{Stage[step]()}</div>
      {/* {step <= 13 && ( */}
      <footer className="">
        <div className="h-1 rounded-full bg-gray-300 w-full">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-rose-500 transition-width duration-300"
          ></div>
        </div>
        <div
          className={cn("pt-6 flex justify-end items-center px-20", {
            "justify-between": step > 0,
          })}
        >
          {step >= 1 && (
            <button
              className="px-10 py-3 text-black underline hover:bg-gray-200 text-base font-medium rounded-md cursor-pointer"
              onClick={handlePrevious}
            >
              Back
            </button>
          )}
          {step !== 0 && step <= 12 ? (
            <button
              className="bg-rose-500 px-10 py-3 text-white text-base font-medium rounded-md cursor-pointer"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            step === 0 && (
              <button
                className="bg-rose-500 py-3 px-5 text-white text-base font-medium rounded-md cursor-pointer"
                onClick={handleNext}
              >
                Get Started
              </button>
            )
          )}
        </div>
      </footer>
    </form>
  );
};
