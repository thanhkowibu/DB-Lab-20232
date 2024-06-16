import { tagsArray } from "@/data/tagsArray";
import { PropertyDetailProps } from "@/types/properties.types";
import { Container } from "../Container";
import { ListingHead } from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categoriesArray } from "@/data/categoriesArray";
import { useEffect, useRef, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { usePlacename } from "@/hooks/useGeocoding";
import ListingMap from "./ListingMap";
import ListingReviews from "./ListingReviews";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  listing: PropertyDetailProps;
};

export const ListingClient = ({ listing }: Props) => {
  const [totalPrice, setTotalPrice] = useState(listing.nightly_price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const tag = tagsArray.find((item) => item.value === listing.tag.toString());
  const location = usePlacename(listing.latitude, listing.longitude);
  const longTitle = `${listing.name} in ${location}`;

  const navigate = useNavigate();

  const categories = categoriesArray.filter((category) =>
    listing.categories.toString().includes(category.value)
  );

  const handleBooking = () => {
    navigate(`/booking/${listing.id}`, {
      state: {
        totalPrice: totalPrice,
        nightlyPrice: listing.nightly_price,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
        maxGuests: listing.max_guests,
        longTitle: longTitle,
        address: listing.address_line,
        listingImg: listing.images[0].path,
        rating: listing.average_rating,
        reviewCount: listing.total_rating,
      },
    });
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.nightly_price) {
        setTotalPrice(dayCount * listing.nightly_price);
      } else {
        setTotalPrice(listing.nightly_price);
      }
    }
  }, [dateRange, listing.nightly_price]);

  const reviewsRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <div className="max-w-[1150px] mx-auto pb-48">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={longTitle}
            imageSrc={listing.images}
            id={listing.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              host={listing.host}
              tag={tag}
              categories={categories}
              desc={listing.description}
              num_beds={listing.num_beds}
              num_bedrooms={listing.num_bedrooms}
              num_bathrooms={listing.num_bathrooms}
              max_guests={listing.max_guests}
              latitude={listing.latitude}
              longitude={listing.longitude}
              address_line={listing.address_line}
              average_rating={listing.average_rating}
              total_rating={listing.total_rating}
              reviewsRef={reviewsRef}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.nightly_price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleBooking}
                disabledDates={listing.booking_date}
              />
            </div>
          </div>
          <div className="w-full " ref={reviewsRef}>
            <ListingReviews id={listing.id} />
          </div>
          <hr />
          <div className="h-[450px] w-full">
            <ListingMap lat={listing.latitude} long={listing.longitude} />
          </div>
        </div>
      </div>
    </Container>
  );
};
