import useEmblaCarousel from "embla-carousel-react";
import { ListingCard } from "./ListingCard";
import { PropertyOverviewProps } from "@/types/properties.types";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../carousel/UserTopListingsBtn";
import { useDotButton } from "../carousel/CarouselDot";
import { EmblaOptionsType } from "embla-carousel";

type Props = {
  topProperties: PropertyOverviewProps[] | null;
  options?: EmblaOptionsType;
};

const UserTopListings: React.FC<Props> = ({ topProperties, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (!topProperties?.length)
    return <div>This user hasn't uploaded any properties.</div>;

  return (
    <section className="h-96 w-full utl flex flex-col gap-6">
      <div className="flex utl__viewport" ref={emblaRef}>
        <div className="size-full utl__container">
          {topProperties?.map((listing: PropertyOverviewProps) => (
            <div className="utl__slide" key={listing.id}>
              <ListingCard key={listing.id} data={listing} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="flex gap-12">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            slideIndex={selectedIndex}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            slideIndex={selectedIndex}
            totalSlides={
              topProperties ? Math.floor(topProperties.length / 3) : 0
            }
          />
        </div>
      </div>
    </section>
  );
};

export default UserTopListings;
