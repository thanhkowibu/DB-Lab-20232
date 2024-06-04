import { categoriesArray } from "@/data/categoriesArray";
import { tagsArray } from "@/data/tagsArray";
import {
  BookingProps,
  PropertyDetailProps,
  Tag,
} from "@/types/properties.types";
import { Container } from "../Container";
import { ListingHead } from "./ListingHead";

type Props = {
  booking: BookingProps[];
  listing: PropertyDetailProps;
};

export const ListingClient = ({ booking, listing }: Props) => {
  const tag = tagsArray.find((item) => item.value === Tag[listing.tag]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.name}
            imageSrc={listing.images}
            latitude={listing.latitude}
            longitude={listing.longitude}
            id={listing.id}
          />
        </div>
      </div>
    </Container>
  );
};
