import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDot";
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselBtn";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="size-full">
      <div className="size-full flex" ref={emblaRef}>
        <div className="size-full flex">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div
          className={cn("embla__buttons", {
            "flex-row-reverse": selectedIndex === 0,
          })}
        >
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            slideIndex={selectedIndex}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            slideIndex={selectedIndex}
            totalSlides={slides.length - 1}
          />
        </div>

        <div className="embla__dots absolute bottom-2 w-full">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={(e: any) => {
                e.stopPropagation();
                onDotButtonClick(index);
              }}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
