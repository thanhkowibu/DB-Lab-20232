import { getListingDetail } from "@/action/getListingDetail";
import {
  PropertyDetailProps,
  PropertyReqProps,
} from "@/types/properties.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Title } from "@/components/common/create/Title";
import { Description } from "@/components/common/create/Description";
import { Price } from "@/components/common/create/Price";
import { RoomsPlan } from "@/components/common/create/RoomsPlan";
import { TagSelector } from "@/components/common/create/TagSelector";
import { CategoriesSelector } from "@/components/common/create/CategoriesSelector";
import { PlaceLocation } from "@/components/common/create/PlaceLocation";
import { PlaceDetails } from "@/components/common/create/PlaceDetails";
import { Button } from "@/components/ui/button";
import { PhotosUpdate } from "@/components/common/create/PhotosUpdate";
import propertyApi from "@/api/modules/property.api";
import { cn } from "@/lib/utils";

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

type Props = {};

const UpdateProperty: React.FC<Props> = ({}) => {
  const [listing, setListing] = useState<PropertyDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newImgs, setNewImgs] = useState<File[]>([]);
  const [oldImgs, setOldImgs] = useState<
    { name: string; is_remove: boolean }[]
  >([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const navigate = useNavigate();

  const listingId = useLocation().pathname.split("/")[2];

  const { register, handleSubmit, getValues, setValue, watch } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      nightly_price: listing?.nightly_price || 0,
      name: listing?.name || "",
      longitude: listing?.longitude || 0,
      latitude: listing?.latitude || 0,
      max_guests: listing?.max_guests || 0,
      num_beds: listing?.num_beds || 0,
      num_bedrooms: listing?.num_bedrooms || 0,
      num_bathrooms: listing?.num_bathrooms || 0,
      description: listing?.description || "",
      address_line: listing?.address_line || "",
      categories: listing?.categories || [],
      tag: listing?.tag || "",
    },
  });

  const watchedTag = watch("tag");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getListingDetail(BigInt(listingId));
        if (data) {
          setListing(data);
          // Update form values with fetched listing data
          setValue("nightly_price", data.nightly_price);
          setValue("name", data.name);
          setValue("longitude", data.longitude);
          setValue("latitude", data.latitude);
          setValue("max_guests", data.max_guests);
          setValue("num_beds", data.num_beds);
          setValue("num_bedrooms", data.num_bedrooms);
          setValue("num_bathrooms", data.num_bathrooms);
          setValue("description", data.description);
          setValue("address_line", data.address_line);
          setValue("categories", data.categories);
          setValue("tag", data.tag);
          const imagePaths = data.images.map((image: any) => image.path);
          setImgUrls(imagePaths);
          setOldImgs(
            data.images.map((image: any) => ({
              name: image.name,
              is_remove: false,
            }))
          );
        }
      } catch (err: any) {
        if (err) toast.error(err.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [listingId, setValue]);

  const onSubmit = async (form: PropertyReqProps) => {
    if (form.categories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    const formData = new FormData();

    // Stringify the form data copy and set it under the propertyDetailDto key
    formData.append("propertyDetailDto", JSON.stringify(form));

    // Append the new images to the form data under the images key
    newImgs.forEach((img) => {
      formData.append("images", img);
    });

    // Append the instructions to the form data under the instruction key
    const instructions = oldImgs.map((img) => ({
      name: img.name,
      is_remove: img.is_remove,
    }));
    formData.append("instruction", JSON.stringify(instructions));

    // Log FormData key-value pairs
    // for (let pair of formData.entries()) {
    //   if (pair[0] === "propertyDetailDto") {
    //     console.log(
    //       `key: ${pair[0]}, value: ${JSON.stringify(
    //         JSON.parse(pair[1] as string),
    //         null,
    //         2
    //       )}`
    //     );
    //   } else if (pair[0] === "images") {
    //     console.log(
    //       `key: ${pair[0]}, value: ${pair[1]}, file name: ${
    //         (pair[1] as File).name
    //       }`
    //     );
    //   } else if (pair[0] === "instruction") {
    //     console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    //   }
    // }
    // Post data to API...
    try {
      const res = await propertyApi.update(BigInt(listingId), formData);
      // console.log(res);
      if (res.code === 200) {
        toast.success("Listing updated successfully");
        navigate(-1);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const onError = (errors: any) => console.log(errors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col justify-between gap-8 pb-16"
    >
      <Title formName={getValues("name")} register={register} />
      <Description formDesc={getValues("description")} register={register} />
      <Price formPrice={getValues("nightly_price")} setValue={setValue} />
      <RoomsPlan
        form={{
          max_guests: getValues("max_guests"),
          num_beds: getValues("num_beds"),
          num_bedrooms: getValues("num_bedrooms"),
          num_bathrooms: getValues("num_bathrooms"),
        }}
        setValue={setValue}
      />
      <TagSelector formTag={watchedTag} setValue={setValue} nofeather />
      <CategoriesSelector
        formCategories={getValues("categories")}
        setValue={setValue}
        nofeather
      />
      <PlaceLocation
        form={{
          latitude: getValues("latitude"),
          longitude: getValues("longitude"),
        }}
        setValue={setValue}
      />
      <PlaceDetails
        form={{
          latitude: getValues("latitude"),
          longitude: getValues("longitude"),
          address_line: getValues("address_line"),
        }}
        register={register}
        hidecountry
      />
      <PhotosUpdate
        oldImgs={oldImgs}
        setOldImgs={setOldImgs}
        newImgs={newImgs}
        setNewImgs={setNewImgs}
        imgUrls={imgUrls}
        setImgUrls={setImgUrls}
        nooverflow
      />
      <div className="flex justify-center">
        <Button
          disabled={isLoading}
          type="submit"
          variant="airbnb"
          className={cn("w-1/2", {
            "cursor-not-allowed opacity-50": isLoading,
          })}
        >
          Update your change
        </Button>
      </div>
    </form>
  );
};

export default UpdateProperty;
