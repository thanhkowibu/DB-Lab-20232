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
import toast from "react-hot-toast";
import { createListing } from "@/action/createListing";

// const schema = yup.object().shape({
//   nightly_price: yup.number().required(),
//   name: yup.string().required(),
//   longitude: yup.number().required(),
//   latitude: yup.number().required(),
//   max_guests: yup.number().required(),
//   num_beds: yup.number().required(),
//   num_bedrooms: yup.number().required(),
//   num_bathrooms: yup.number().required(),
//   description: yup.string().required(),
//   address_line: yup.string().required(),
//   categories: yup.array().of(yup.string().required()).required(),
//   tag: yup.string().required(),
// });
const schema = yup.object().shape({
  nightly_price: yup.number(),
  name: yup.string(),
  longitude: yup.number(),
  latitude: yup.number(),
  max_guests: yup.number(),
  num_beds: yup.number(),
  num_bedrooms: yup.number(),
  num_bathrooms: yup.number(),
  description: yup.string(),
  address_line: yup.string(),
  categories: yup.array().of(yup.string()),
  tag: yup.string(),
});

export const CreateProperty = () => {
  const [step, setStep] = useState(0);
  const [imgs, setImgs] = useState<File[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const totalSteps = 13;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    setStep((pv) => pv + 1);
    // setStep(14);
  };

  const handlePrevious = () => {
    setStep((pv) => pv - 1);
  };

  const handleReview = () => {
    setStep(2);
  };

  const onSubmit = async (form: PropertyReqProps) => {
    // handleNext();
    console.log(form);

    const formData = new FormData();
    // formData.append(
    //   "propertyDetailDto",
    //   JSON.stringify({
    //     tag: "BEACHFRONT",
    //     latitude: 21.001799131176725,
    //     longitude: 105.84658305929497,
    //     address_line: "test",
    //     max_guests: 2,
    //     num_beds: 1,
    //     num_bedrooms: 1,
    //     num_bathrooms: 1,
    //     categories: ["WIFI", "TV", "AIR_CONDITIONING", "POOL"],
    //     name: "Test2",
    //     description: "test",
    //     nightly_price: 12,
    //   })
    // );

    // Stringify the form data copy and set it under the propertyDetailDto key
    formData.append("propertyDetailDto", JSON.stringify(form));

    // Append the images to the form data under the images key
    imgs.forEach((img) => {
      formData.append("images", img);
    });

    // Log FormData key-value pairs
    for (let pair of formData.entries()) {
      if (pair[0] === "propertyDetailDto") {
        console.log(
          `key: ${pair[0]}, value: ${JSON.stringify(
            JSON.parse(pair[1] as string),
            null,
            2
          )}`
        );
      } else if (pair[0] === "images") {
        console.log(
          `key: ${pair[0]}, value: ${pair[1]}, file name: ${
            (pair[1] as File).name
          }`
        );
      }
    }
    // Post data to API...
    const { res, err } = await createListing(formData);
    if (res) toast.success("New listing created successfully");
    if (err) toast.error("Something went wrong");
  };

  const onError = (errors: any) => console.log(errors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    // } = useForm<PropertyReqProps>({
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const Stage = [
    () => <OverView />,
    () => <StepOneStarter />,
    () => <TagSelector formTag={getValues("tag")} setValue={setValue} />,
    () => (
      <PlaceLocation
        form={{
          latitude: getValues("latitude"),
          longitude: getValues("longitude"),
        }}
        setValue={setValue}
      />
    ),
    () => (
      <PlaceDetails
        form={{
          latitude: getValues("latitude"),
          longitude: getValues("longitude"),
          address_line: getValues("address_line"),
        }}
        register={register}
      />
    ),
    () => (
      <RoomsPlan
        form={{
          max_guests: getValues("max_guests"),
          num_beds: getValues("num_beds"),
          num_bedrooms: getValues("num_bedrooms"),
          num_bathrooms: getValues("num_bathrooms"),
        }}
        setValue={setValue}
      />
    ),
    () => <StepTwoStarter />,
    () => (
      <CategoriesSelector
        formCategories={getValues("categories")}
        setValue={setValue}
      />
    ),
    () => (
      <Photos
        imgs={imgs}
        setImgs={setImgs}
        imgUrls={imgUrls}
        setImgUrls={setImgUrls}
      />
    ),
    () => <Title formName={getValues("name")} register={register} />,
    () => (
      <Description formDesc={getValues("description")} register={register} />
    ),
    () => <StepThreeStarter />,
    () => <Price formPrice={getValues("nightly_price")} setValue={setValue} />,
    () => <Confirmation handleReview={handleReview} />,
    () => <ListingCreated />,
  ];

  const showNextStep = () => {
    switch (step) {
      case 2:
        return getValues("tag") !== undefined && getValues("tag") !== "";
      case 3:
        return (
          getValues("latitude") !== undefined &&
          getValues("longitude") !== undefined
        );
      case 4:
        return (
          getValues("address_line") !== undefined &&
          getValues("address_line") !== ""
        );
      case 5:
        return (
          getValues("max_guests") !== undefined &&
          getValues("num_beds") !== undefined &&
          getValues("num_bedrooms") !== undefined &&
          getValues("num_bathrooms") !== undefined
        );
      case 7: {
        const categories = getValues("categories");
        return categories && categories.length > 0;
      }
      case 8:
        return imgs && imgs.length > 0;
      case 9:
        const nameValue = getValues("name");
        return (
          nameValue !== undefined && nameValue !== "" && nameValue.length <= 32
        );
      case 10:
        const descValue = getValues("description");
        return (
          descValue !== undefined && descValue !== "" && descValue.length <= 500
        );
      case 12:
        return (
          getValues("nightly_price") !== undefined &&
          getValues("nightly_price") >= 10 &&
          getValues("nightly_price") <= 500000
        );
      default:
        return true;
    }
  };

  // Watch all form values
  watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col justify-between gap-8"
    >
      <div className="h-[65vh]">{Stage[step]()}</div>
      {/* {step <= 13 && ( */}
      {step <= totalSteps && (
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
                type="button"
                className="px-10 py-3 text-black underline hover:bg-gray-200 text-base font-medium rounded-md cursor-pointer"
                onClick={handlePrevious}
              >
                Back
              </button>
            )}
            {step !== 0 && step <= 12 ? (
              <button
                type="button"
                className={cn(
                  "bg-rose-500 px-10 py-3 text-white text-base font-medium rounded-md cursor-pointer transition duration-300",
                  {
                    "bg-neutral-300 cursor-not-allowed": !showNextStep(),
                  }
                )}
                onClick={handleNext}
                disabled={!showNextStep()}
              >
                Next
              </button>
            ) : (
              step === 0 && (
                <button
                  type="button"
                  className="bg-rose-500 py-3 px-5 text-white text-base font-medium rounded-md cursor-pointer"
                  onClick={handleNext}
                >
                  Get Started
                </button>
              )
            )}
          </div>
        </footer>
      )}
    </form>
  );
};
